<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Transaction;
use App\Models\Wallet;
use App\Models\Category; // <--- INI YANG TADI KURANG
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use App\Exports\TransactionsExport;
use Maatwebsite\Excel\Facades\Excel;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TransactionController extends Controller
{
    /**
     * Menampilkan daftar riwayat transaksi.
     */
    public function index(Request $request)
    {
        $user = Auth::user();

        // Ambil Filter dari request
        $month = $request->input('month', date('m'));
        $year = $request->input('year', date('Y'));
        $search = $request->input('search');

        // 1. Ambil Data Transaksi (Filter, Search & Pagination)
        $transactions = Transaction::where('user_id', $user->id)
            ->with(['category', 'wallet'])
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('description', 'like', "%{$search}%")
                      ->orWhereHas('category', function ($cat) use ($search) {
                          $cat->where('name', 'like', "%{$search}%");
                      });
                });
            })
            ->when(!$search, function ($query) use ($month, $year) {
                $query->whereMonth('transaction_date', $month)
                      ->whereYear('transaction_date', $year);
            })
            ->latest('transaction_date')
            ->paginate(15)
            ->withQueryString();

        // 2. Ambil Data Dompet (Untuk Modal Edit di halaman Index)
        $wallets = Wallet::where('user_id', $user->id)->get();

        // 3. Ambil Data Kategori (Untuk Modal Edit di halaman Index)
        $categories = Category::where('user_id', $user->id)
            ->orWhereNull('user_id')
            ->get();

        return Inertia::render('Transactions/Index', [
            'transactions' => $transactions,
            'filters' => [
                'month' => $month,
                'year' => $year,
                'search' => $search,
            ],
            'wallets' => $wallets,
            'categories' => $categories,
        ]);
    }

    /**
     * Menyimpan transaksi baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'wallet_id' => 'required|exists:wallets,id',
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:1',
            'date' => 'required|date',
            'type' => 'required|in:income,expense',
            'receipt' => 'nullable|image|max:2048', // Max 2MB
            'notes' => 'nullable|string',
        ]);

        DB::transaction(function () use ($request) {
            // 1. Upload & Kompres Gambar
            $path = null;
            if ($request->hasFile('receipt')) {
                $file = $request->file('receipt');
                $filename = time() . '_' . $file->getClientOriginalName();
                $path = 'receipts/' . $filename;

                // Inisialisasi Image Manager dengan Driver GD
                $manager = new ImageManager(new Driver());
                $image = $manager->read($file);

                // Resize jika terlalu lebar (maks 1200px) & Kompres Kualitas ke 70%
                $image->scale(width: 1200);
                
                // Simpan ke storage public
                Storage::disk('public')->put($path, (string) $image->encodeByMediaType('image/jpeg', quality: 70));
            }

            // 2. Simpan Transaksi
            Transaction::create([
                'user_id' => Auth::id(),
                'wallet_id' => $request->wallet_id,
                'category_id' => $request->category_id,
                'amount' => $request->amount,
                'type' => $request->type,
                'transaction_date' => $request->date,
                'description' => $request->notes,
                'receipt_image' => $path,
            ]);

            // 3. Update Saldo Dompet
            $wallet = Wallet::find($request->wallet_id);
            if ($wallet->user_id !== Auth::id()) abort(403);

            if ($request->type === 'expense') {
                $wallet->decrement('balance', $request->amount);
            } else {
                $wallet->increment('balance', $request->amount);
            }
        });

        return redirect()->back()->with('message', 'Transaksi berhasil disimpan!');
    }

    /**
     * Mengupdate transaksi.
     */
    public function update(Request $request, Transaction $transaction)
    {
        if ($transaction->user_id !== Auth::id()) abort(403);

        $request->validate([
            'wallet_id' => 'required|exists:wallets,id',
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:1',
            'date' => 'required|date',
            'type' => 'required|in:income,expense',
            'notes' => 'nullable|string',
        ]);

        DB::transaction(function () use ($request, $transaction) {
            // 1. Revert Saldo Lama
            $oldWallet = Wallet::find($transaction->wallet_id);
            if ($transaction->type === 'expense') {
                $oldWallet->increment('balance', $transaction->amount);
            } else {
                $oldWallet->decrement('balance', $transaction->amount);
            }

            // 2. Update Data
            $transaction->update([
                'wallet_id' => $request->wallet_id,
                'category_id' => $request->category_id,
                'amount' => $request->amount,
                'type' => $request->type,
                'transaction_date' => $request->date,
                'description' => $request->notes,
            ]);

            // 3. Apply Saldo Baru
            $newWallet = Wallet::find($request->wallet_id);
            if ($request->type === 'expense') {
                $newWallet->decrement('balance', $request->amount);
            } else {
                $newWallet->increment('balance', $request->amount);
            }
        });

        return redirect()->back()->with('message', 'Transaksi berhasil diperbarui!');
    }

    /**
     * Menghapus transaksi.
     */
    public function destroy(Transaction $transaction)
    {
        if ($transaction->user_id !== Auth::id()) abort(403);

        DB::transaction(function () use ($transaction) {
            // 1. Kembalikan Saldo
            $wallet = Wallet::find($transaction->wallet_id);
            if ($wallet) {
                if ($transaction->type === 'expense') {
                    $wallet->increment('balance', $transaction->amount);
                } else {
                    $wallet->decrement('balance', $transaction->amount);
                }
            }

            // 2. Hapus File Foto
            if ($transaction->receipt_image) {
                Storage::disk('public')->delete($transaction->receipt_image);
            }

            // 3. Hapus Data
            $transaction->delete();
        });

        return redirect()->back()->with('message', 'Transaksi berhasil dihapus!');
    }
    public function export(Request $request)
    {
        $month = $request->input('month', date('m'));
        $year = $request->input('year', date('Y'));

        return Excel::download(new TransactionsExport($month, $year), 'Laporan-Keuangan-' . $month . '-' . $year . '.xlsx');
    }
}
