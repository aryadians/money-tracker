<?php

namespace App\Http\Controllers;

use App\Models\RecurringTransaction;
use App\Models\Wallet;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RecurringTransactionController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $recurring = RecurringTransaction::where('user_id', $user->id)
            ->with(['wallet', 'category'])
            ->get();
            
        $wallets = Wallet::where('user_id', $user->id)->get();
        $categories = Category::where('user_id', $user->id)
            ->orWhereNull('user_id')
            ->get();

        return Inertia::render('Recurring/Index', [
            'recurring' => $recurring,
            'wallets' => $wallets,
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'wallet_id' => 'required|exists:wallets,id',
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:1',
            'type' => 'required|in:income,expense',
            'frequency' => 'required|in:daily,weekly,monthly,yearly',
            'start_date' => 'required|date',
            'description' => 'nullable|string',
        ]);

        RecurringTransaction::create([
            'user_id' => Auth::id(),
            'wallet_id' => $request->wallet_id,
            'category_id' => $request->category_id,
            'amount' => $request->amount,
            'type' => $request->type,
            'frequency' => $request->frequency,
            'start_date' => $request->start_date,
            'next_run_date' => $request->start_date,
            'description' => $request->description,
        ]);

        return redirect()->back()->with('message', 'Transaksi berulang berhasil diatur!');
    }

    public function update(Request $request, RecurringTransaction $recurringTransaction)
    {
        if ($recurringTransaction->user_id !== Auth::id()) abort(403);
        
        $recurringTransaction->update([
            'is_active' => !$recurringTransaction->is_active
        ]);

        return redirect()->back()->with('message', 'Status transaksi berulang diperbarui!');
    }

    public function destroy(RecurringTransaction $recurringTransaction)
    {
        if ($recurringTransaction->user_id !== Auth::id()) abort(403);
        $recurringTransaction->delete();
        return redirect()->back()->with('message', 'Transaksi berulang dihapus!');
    }
}
