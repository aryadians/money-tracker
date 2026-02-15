<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:income,expense',
            'icon' => 'required|string', // Menyimpan emoji sebagai string
        ]);

        Category::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'type' => $request->type,
            'icon_name' => $request->icon, // Simpan emoji di kolom icon_name
            'color_hex' => '#cccccc', // Default
        ]);

        return redirect()->back()->with('message', 'Kategori baru berhasil ditambahkan!');
    }
}
