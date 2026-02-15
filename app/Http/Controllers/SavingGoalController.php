<?php

namespace App\Http\Controllers;

use App\Models\SavingGoal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SavingGoalController extends Controller
{
    public function index()
    {
        $goals = SavingGoal::where('user_id', Auth::id())->latest()->get();
        
        return Inertia::render('SavingGoals/Index', [
            'goals' => $goals
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:1',
            'deadline' => 'nullable|date',
            'color_hex' => 'required|string|max:7',
            'description' => 'nullable|string',
        ]);

        SavingGoal::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'target_amount' => $request->target_amount,
            'deadline' => $request->deadline,
            'color_hex' => $request->color_hex,
            'description' => $request->description,
        ]);

        return redirect()->back()->with('message', 'Target tabungan berhasil dibuat!');
    }

    public function update(Request $request, SavingGoal $savingGoal)
    {
        if ($savingGoal->user_id !== Auth::id()) abort(403);

        $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);

        $savingGoal->increment('current_amount', $request->amount);

        return redirect()->back()->with('message', 'Tabungan berhasil ditambahkan!');
    }

    public function destroy(SavingGoal $savingGoal)
    {
        if ($savingGoal->user_id !== Auth::id()) abort(403);
        $savingGoal->delete();
        return redirect()->back()->with('message', 'Target tabungan dihapus!');
    }
}
