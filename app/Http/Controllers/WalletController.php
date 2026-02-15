<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Services\HealthScoreService;
use App\Services\AchievementService;
use App\Services\InsightService;

class WalletController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $currentMonth = date('m');
        $currentYear = date('Y');

        // --- SKOR KESEHATAN & ACHIEVEMENT ---
        $healthScore = HealthScoreService::calculate($user);
        $achievements = AchievementService::checkAndUnlock($user); // Cek lencana baru
        $insights = InsightService::generate($user); // Buat insight personal

        // 1. Ambil Data Dompet
        $wallets = Wallet::where('user_id', $user->id)->get();

        // 2. Ambil Data Kategori
        $categories = Category::where('user_id', $user->id)
            ->orWhereNull('user_id')
            ->get();

        // 3. Ambil 5 Transaksi Terakhir
        $transactions = Transaction::where('user_id', $user->id)
            ->with(['category', 'wallet'])
            ->latest('transaction_date')
            ->take(5)
            ->get();

        // 4. Hitung Pemasukan Bulan Ini
        $monthlyIncome = Transaction::where('user_id', $user->id)
            ->whereMonth('transaction_date', $currentMonth)
            ->whereYear('transaction_date', $currentYear)
            ->where('type', 'income')
            ->sum('amount');

        // 5. Hitung Pengeluaran Bulan Ini
        $monthlyExpense = Transaction::where('user_id', $user->id)
            ->whereMonth('transaction_date', $currentMonth)
            ->whereYear('transaction_date', $currentYear)
            ->where('type', 'expense')
            ->sum('amount');

        // 6. DATA UNTUK CHART (Pengeluaran per Kategori)
        $expenseChart = Transaction::where('transactions.user_id', $user->id) // Prefix transactions.
            ->whereMonth('transaction_date', $currentMonth)
            ->whereYear('transaction_date', $currentYear)
            ->where('transactions.type', 'expense') // <--- FIX DISINI (tambahkan prefix transactions.)
            ->join('categories', 'transactions.category_id', '=', 'categories.id')
            ->selectRaw('categories.name as category_name, sum(transactions.amount) as total')
            ->groupBy('categories.name')
            ->orderByDesc('total')
            ->get();

        // Siapkan Array untuk ChartJS
        $chartLabels = $expenseChart->pluck('category_name');
        $chartData = $expenseChart->pluck('total');

        // ... kode chart sebelumnya ...

        // 7. HITUNG PROGRESS BUDGET (Optimized)
        $budgets = \App\Models\Budget::where('user_id', $user->id)->with('category')->get();
        
        // Fetch all spent amounts for this month for all relevant categories in one query
        $categoryIds = $budgets->pluck('category_id');
        $spentAmounts = Transaction::where('user_id', $user->id)
            ->whereIn('category_id', $categoryIds)
            ->where('type', 'expense')
            ->whereMonth('transaction_date', $currentMonth)
            ->whereYear('transaction_date', $currentYear)
            ->groupBy('category_id')
            ->selectRaw('category_id, sum(amount) as total')
            ->pluck('total', 'category_id');

        $budgetProgress = $budgets->map(function ($budget) use ($spentAmounts) {
            $spent = $spentAmounts[$budget->category_id] ?? 0;
            $percentage = $budget->amount > 0 ? ($spent / $budget->amount) * 100 : 0;

            return [
                'id' => $budget->id,
                'category_name' => $budget->category->name,
                'category_icon' => $budget->category->icon_name,
                'limit' => $budget->amount,
                'spent' => (float)$spent,
                'percentage' => $percentage,
                'is_over' => $spent > $budget->amount
            ];
        });

        return Inertia::render('Dashboard', [
            'wallets' => $wallets,
            'categories' => $categories,
            'transactions' => $transactions,
            'totalBalance' => $wallets->sum('balance'),
            'monthlyIncome' => $monthlyIncome,
            'monthlyExpense' => $monthlyExpense,
            'chartLabels' => $chartLabels,
            'chartData' => $chartData,
            'budgetProgress' => $budgetProgress,
            'healthScore' => $healthScore,
            'newAchievements' => $achievements,
            'insights' => $insights,
        ]);
    }

    /**
     * Menyimpan dompet baru.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:cash,bank,ewallet,investment,credit_card',
            'balance' => 'required|numeric|min:0',
            'color_hex' => 'required|string|max:7',
        ]);

        Wallet::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'type' => $request->type,
            'balance' => $request->balance,
            'color_hex' => $request->color_hex,
            'currency' => 'IDR'
        ]);

        return redirect()->back()->with('message', 'Dompet berhasil dibuat!');
    }

    /**
     * Mengupdate dompet.
     */
    public function update(Request $request, Wallet $wallet)
    {
        if ($wallet->user_id !== Auth::id()) abort(403);

        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:cash,bank,ewallet,investment,credit_card',
            'balance' => 'required|numeric|min:0',
            'color_hex' => 'required|string|max:7',
        ]);

        $wallet->update([
            'name' => $request->name,
            'type' => $request->type,
            'balance' => $request->balance,
            'color_hex' => $request->color_hex,
        ]);

        return redirect()->back()->with('message', 'Dompet berhasil diperbarui!');
    }

    /**
     * Menghapus dompet.
     */
    public function destroy(Wallet $wallet)
    {
        if ($wallet->user_id !== Auth::id()) abort(403);
        $wallet->delete();
        return redirect()->back()->with('message', 'Dompet berhasil dihapus!');
    }
}