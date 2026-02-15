<?php

namespace App\Http\Controllers;

use App\Models\Debt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DebtController extends Controller
{
    public function index()
    {
        $debts = Debt::where('user_id', Auth::id())->latest()->get();
        
        return Inertia::render('Debts/Index', [
            'debts' => $debts
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'person_name' => 'required|string|max:255',
            'type' => 'required|in:payable,receivable',
            'amount' => 'required|numeric|min:1',
            'due_date' => 'nullable|date',
            'description' => 'nullable|string',
        ]);

        Debt::create([
            'user_id' => Auth::id(),
            'person_name' => $request->person_name,
            'type' => $request->type,
            'amount' => $request->amount,
            'due_date' => $request->due_date,
            'description' => $request->description,
        ]);

        return redirect()->back()->with('message', 'Catatan hutang berhasil disimpan!');
    }

    public function update(Request $request, Debt $debt)
    {
        if ($debt->user_id !== Auth::id()) abort(403);

        $request->validate([
            'paid_amount' => 'required|numeric|min:0',
        ]);

        $newPaidAmount = $debt->paid_amount + $request->paid_amount;
        $isPaid = $newPaidAmount >= $debt->amount;

        $debt->update([
            'paid_amount' => $newPaidAmount,
            'is_paid' => $isPaid
        ]);

        return redirect()->back()->with('message', 'Pembayaran berhasil dicatat!');
    }

    public function destroy(Debt $debt)
    {
        if ($debt->user_id !== Auth::id()) abort(403);
        $debt->delete();
        return redirect()->back()->with('message', 'Catatan hutang dihapus!');
    }
}
