<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BudgetController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Ambil budget user beserta nama kategorinya
        $budgets = Budget::where('user_id', $user->id)
            ->with('category')
            ->get();

        // Ambil kategori yang BELUM punya budget (untuk dropdown 'Tambah Budget')
        $existingCategoryIds = $budgets->pluck('category_id');
        $categories = Category::where('user_id', $user->id)
            ->orWhereNull('user_id')
            ->whereNotIn('id', $existingCategoryIds)
            ->get();

        return Inertia::render('Budgets/Index', [
            'budgets' => $budgets,
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'amount' => 'required|numeric|min:1',
        ]);

        Budget::create([
            'user_id' => Auth::id(),
            'category_id' => $request->category_id,
            'amount' => $request->amount,
        ]);

        return redirect()->back()->with('message', 'Anggaran berhasil dibuat!');
    }

    public function update(Request $request, Budget $budget)
    {
        if ($budget->user_id !== Auth::id()) abort(403);

        $request->validate([
            'amount' => 'required|numeric|min:1',
        ]);

        $budget->update(['amount' => $request->amount]);

        return redirect()->back()->with('message', 'Anggaran diperbarui!');
    }

    public function destroy(Budget $budget)
    {
        if ($budget->user_id !== Auth::id()) abort(403);
        $budget->delete();
        return redirect()->back()->with('message', 'Anggaran dihapus!');
    }
}
