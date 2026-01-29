import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateWalletModal from '@/Pages/Wallets/Partials/CreateWalletModal';
import CreateTransactionModal from '@/Pages/Transactions/Partials/CreateTransactionModal';
import CreateCategoryModal from '@/Pages/Categories/Partials/CreateCategoryModal';
import CreateTransferModal from '@/Pages/Transfers/Partials/CreateTransferModal';
import CreateBudgetModal from '@/Pages/Budgets/Partials/CreateBudgetModal';
import EditBudgetModal from '@/Pages/Budgets/Partials/EditBudgetModal'; // Import EditBudgetModal
import BudgetCard from '@/Components/BudgetCard';
import ExpenseChart from '@/Components/ExpenseChart';
import { Head, Link, router } from '@inertiajs/react'; // Import router for delete
import { useState } from 'react';

export default function Dashboard({ auth, wallets, categories, transactions, totalBalance, monthlyIncome, monthlyExpense, chartLabels, chartData, budgetProgress }) {

    // --- STATE ---
    const [showCreateWallet, setShowCreateWallet] = useState(false);
    const [showCreateTransaction, setShowCreateTransaction] = useState(false);
    const [showCreateCategory, setShowCreateCategory] = useState(false);
    const [showCreateTransfer, setShowCreateTransfer] = useState(false);
    const [showCreateBudget, setShowCreateBudget] = useState(false);

    // State for Edit Budget
    const [showEditBudget, setShowEditBudget] = useState(false);
    const [editingBudget, setEditingBudget] = useState(null);

    const [editingWallet, setEditingWallet] = useState(null);

    // --- DATA HANDLING ---
    const safeWallets = Array.isArray(wallets) ? wallets : [];
    const safeCategories = Array.isArray(categories) ? categories : [];
    const safeTransactions = Array.isArray(transactions) ? transactions : [];
    const safeBudgets = Array.isArray(budgetProgress) ? budgetProgress : [];

    const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const greeting = new Date().getHours() < 12 ? 'Selamat Pagi' : new Date().getHours() < 18 ? 'Selamat Sore' : 'Selamat Malam';

    // --- ACTIONS ---
    const handleEditBudget = (budget) => {
        setEditingBudget(budget);
        setShowEditBudget(true);
    };

    const handleDeleteBudget = (budget) => {
        if (confirm(`Hapus anggaran untuk ${budget.category_name}?`)) {
            router.delete(route('budgets.destroy', budget.id));
        }
    };

    return (
        <AuthenticatedLayout user={auth.user} header={null}>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-[#0B0F19] text-white relative overflow-hidden font-sans selection:bg-purple-500 selection:text-white">

                {/* --- AMBIENT BACKGROUND --- */}
                <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow"></div>
                    <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow delay-1000"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-600/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-slow delay-2000"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    {/* --- HEADER --- */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                            <div className="relative">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_10px_#4ade80]"></span>
                                    <p className="text-gray-400 text-xs font-bold tracking-widest uppercase">Financial Overview</p>
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-tight">
                                    {greeting}, {auth.user.name.split(' ')[0]}! 👋
                                </h1>
                            </div>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            <button onClick={() => setShowCreateCategory(true)} className="px-4 py-3 bg-gray-800/40 hover:bg-gray-700/60 text-gray-300 rounded-2xl font-bold border border-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                                📂
                            </button>
                            <button onClick={() => setShowCreateTransfer(true)} className="px-6 py-3 bg-gray-800/40 hover:bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-2xl font-bold backdrop-blur-md transition-all hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] flex items-center gap-2 group">
                                <span className="group-hover:rotate-180 transition-transform duration-500">🔄</span> Transfer
                            </button>
                            <button onClick={() => setShowCreateTransaction(true)} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 hover:shadow-indigo-500/40 flex items-center gap-2">
                                <span>📝</span> Transaksi Baru
                            </button>
                        </div>
                    </div>

                    {/* --- SECTION 1: STATS GRID --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

                        {/* LEFT: Balance & Chart */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Card: Total Balance (3D Effect) */}
                            <div className="group relative flex flex-col justify-between p-8 rounded-[2rem] bg-[#131926]/80 border border-white/5 overflow-hidden min-h-[280px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.3)]">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-[100px] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute -bottom-10 -right-10 text-[10rem] opacity-5 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 select-none">💰</div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-400 border border-blue-500/20 backdrop-blur-sm">🏦</div>
                                        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest">Total Kekayaan</h3>
                                    </div>
                                    <div className="text-4xl lg:text-[2.7rem] font-bold text-white tracking-tight leading-none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                        {formatRupiah(totalBalance || 0)}
                                    </div>
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.1)]">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        LIVE UPDATE
                                    </div>
                                </div>
                            </div>

                            {/* Card: Chart (Glassmorphism) */}
                            <div className="group p-6 rounded-[2rem] bg-[#131926]/80 border border-white/5 flex flex-col min-h-[280px] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_-12px_rgba(168,85,247,0.2)] hover:border-purple-500/30">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                        Pengeluaran
                                    </h3>
                                    <span className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-lg border border-white/5">Bulan Ini</span>
                                </div>
                                <div className="flex-1 w-full flex items-center justify-center relative scale-95 group-hover:scale-105 transition-transform duration-500">
                                    <ExpenseChart labels={chartLabels} data={chartData} />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Monthly Summary & Budget */}
                        <div className="flex flex-col gap-4 h-full">

                            {/* Summary Cards Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Income */}
                                <div className="p-5 rounded-[1.5rem] bg-[#131926]/80 border border-white/5 flex flex-col justify-center gap-1 group hover:bg-emerald-500/5 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform">⬇️</div>
                                        <span className="text-gray-600 text-[10px] font-black uppercase group-hover:text-emerald-500/50 transition-colors">IN</span>
                                    </div>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Pemasukan</p>
                                    <p className="text-lg font-bold text-white truncate">{formatRupiah(monthlyIncome || 0)}</p>
                                </div>

                                {/* Expense */}
                                <div className="p-5 rounded-[1.5rem] bg-[#131926]/80 border border-white/5 flex flex-col justify-center gap-1 group hover:bg-rose-500/5 hover:border-rose-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-sm border border-rose-500/20 text-rose-400 group-hover:scale-110 transition-transform">⬆️</div>
                                        <span className="text-gray-600 text-[10px] font-black uppercase group-hover:text-rose-500/50 transition-colors">OUT</span>
                                    </div>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Pengeluaran</p>
                                    <p className="text-lg font-bold text-white truncate">{formatRupiah(monthlyExpense || 0)}</p>
                                </div>
                            </div>

                            {/* --- BUDGET SECTION (MODERN 3D) --- */}
                            <div className="flex-1 p-5 rounded-[2rem] bg-[#131926]/80 border border-white/5 overflow-hidden flex flex-col transition-all duration-500 hover:border-yellow-500/30 hover:shadow-[0_0_30px_rgba(234,179,8,0.1)]">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-gray-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                                        <span className="text-lg">🛡️</span> Kontrol Anggaran
                                    </h3>
                                    <button onClick={() => setShowCreateBudget(true)} className="text-[10px] bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 font-bold px-3 py-1 rounded-full border border-yellow-500/20 transition hover:scale-105">+ Atur</button>
                                </div>

                                <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-3">
                                    {safeBudgets.length > 0 ? (
                                        safeBudgets.map((budget, index) => (
                                            <div key={index} className="transform transition-all hover:scale-[1.02] hover:translate-x-1">
                                                <BudgetCard
                                                    budget={budget}
                                                    onEdit={handleEditBudget}
                                                    onDelete={handleDeleteBudget}
                                                />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-4">
                                            <span className="text-3xl mb-2 grayscale">🎯</span>
                                            <p className="text-xs text-gray-400">Belum ada anggaran.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* --- SECTION 2: WALLETS (PREMIUM CARDS) --- */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-white">Dompet Saya</h2>
                            <span className="flex items-center justify-center h-5 px-2 bg-white/10 text-gray-300 text-[10px] font-bold rounded-md border border-white/5">{safeWallets.length}</span>
                        </div>
                        <button className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-wider transition-colors hover:underline">Kelola Dompet</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">

                        {/* 1. Add Wallet Card */}
                        <div
                            onClick={() => { setEditingWallet(null); setShowCreateWallet(true); }}
                            className="group relative border-2 border-dashed border-white/10 hover:border-blue-500/50 bg-white/[0.02] hover:bg-blue-500/[0.05] rounded-[24px] flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 min-h-[160px] hover:-translate-y-1"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300 mb-4 shadow-xl group-hover:shadow-blue-500/40 group-hover:scale-110">
                                <span className="text-3xl text-gray-400 group-hover:text-white pb-1 font-light">+</span>
                            </div>
                            <p className="text-gray-400 group-hover:text-white font-bold text-sm transition-colors">Tambah Dompet</p>
                        </div>

                        {/* 2. Wallet Cards */}
                        {safeWallets.map((wallet) => (
                            <div
                                key={wallet.id}
                                onClick={() => { setEditingWallet(wallet); setShowCreateWallet(true); }}
                                className="relative group p-6 rounded-[24px] bg-[#181E29] border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] hover:-translate-y-2 cursor-pointer min-h-[160px] flex flex-col justify-between overflow-hidden"
                            >
                                {/* Gradient Glow */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(135deg, ${wallet.color_hex || '#3B82F6'}, transparent)` }}></div>
                                <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-500"></div>

                                {/* Top Content */}
                                <div className="flex justify-between items-start z-10 relative">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#1A202F] flex items-center justify-center text-2xl shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-300">
                                            {wallet.type === 'cash' ? '💵' : wallet.type === 'bank' ? '🏦' : wallet.type === 'ewallet' ? '📱' : '💳'}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white leading-tight truncate max-w-[140px] group-hover:text-blue-100 transition-colors">{wallet.name}</h4>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: wallet.color_hex || '#ccc' }}></span>
                                                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{wallet.type}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Edit Icon Slide-in */}
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setEditingWallet(wallet); setShowCreateWallet(true); }}
                                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:bg-white/20 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0"
                                    >
                                        ✏️
                                    </button>
                                </div>

                                {/* Bottom Content */}
                                <div className="z-10 relative">
                                    <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">Saldo Aktif</p>
                                    <p className="text-2xl font-bold text-white tracking-tight group-hover:tracking-normal transition-all">{formatRupiah(wallet.balance)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- SECTION 3: TRANSAKSI (CLEAN LIST) --- */}
                    <div className="mt-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Transaksi Terakhir</h2>
                            <Link href={route('transactions.index')} className="text-sm font-medium text-gray-500 hover:text-white transition-colors">Lihat Semua</Link>
                        </div>

                        <div className="bg-[#131926]/80 backdrop-blur-md rounded-[24px] border border-white/5 overflow-hidden shadow-2xl">
                            {safeTransactions.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {safeTransactions.map((trx) => (
                                        <div key={trx.id} className="p-5 flex items-center justify-between hover:bg-white/[0.03] transition-colors group cursor-pointer duration-200">
                                            <div className="flex items-center gap-5">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border border-white/5 shadow-lg group-hover:scale-110 transition-transform ${trx.type === 'expense' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                                    {trx.category ? trx.category.icon_name : (trx.type === 'expense' ? '💸' : '💰')}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white text-base mb-0.5">{trx.category ? trx.category.name : 'Tanpa Kategori'}</h4>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <span className="font-mono text-gray-400">{formatDate(trx.transaction_date)}</span>
                                                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                                        <span className="flex items-center gap-1.5">
                                                            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: trx.wallet?.color_hex || '#ccc' }}></span>
                                                            {trx.wallet?.name || 'Dihapus'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-lg font-bold tracking-tight ${trx.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
                                                    {trx.type === 'expense' ? '-' : '+'} {formatRupiah(trx.amount)}
                                                </p>
                                                {trx.description && <p className="text-xs text-gray-600 italic max-w-[150px] truncate ml-auto">"{trx.description}"</p>}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center flex flex-col items-center opacity-60">
                                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-4xl shadow-inner grayscale">📝</div>
                                    <p className="text-gray-300 font-bold text-lg">Belum ada transaksi</p>
                                    <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">Mulai catat pengeluaran dan pemasukanmu untuk melihat analisis keuangan.</p>
                                    <button onClick={() => setShowCreateTransaction(true)} className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-white transition-all shadow-lg shadow-blue-500/20">+ Buat Transaksi</button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* --- MODALS --- */}
            <CreateWalletModal show={showCreateWallet} onClose={() => { setShowCreateWallet(false); setTimeout(() => setEditingWallet(null), 300); }} walletToEdit={editingWallet} />
            <CreateCategoryModal show={showCreateCategory} onClose={() => setShowCreateCategory(false)} />
            <CreateTransactionModal show={showCreateTransaction} onClose={() => setShowCreateTransaction(false)} wallets={safeWallets} categories={safeCategories} onCreateCategory={() => { setShowCreateTransaction(false); setTimeout(() => setShowCreateCategory(true), 200); }} />
            <CreateTransferModal show={showCreateTransfer} onClose={() => setShowCreateTransfer(false)} wallets={safeWallets} />
            <CreateBudgetModal show={showCreateBudget} onClose={() => setShowCreateBudget(false)} categories={safeCategories} />
            <EditBudgetModal show={showEditBudget} onClose={() => { setShowEditBudget(false); setEditingBudget(null); }} budget={editingBudget} />

            <style>{` .animate-pulse-slow { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; } .custom-scrollbar::-webkit-scrollbar { width: 3px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; } `}</style>
        </AuthenticatedLayout>
    );
}