import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateWalletModal from '@/Pages/Wallets/Partials/CreateWalletModal';
import CreateTransactionModal from '@/Pages/Transactions/Partials/CreateTransactionModal';
import CreateCategoryModal from '@/Pages/Categories/Partials/CreateCategoryModal';
import CreateTransferModal from '@/Pages/Transfers/Partials/CreateTransferModal';
import CreateBudgetModal from '@/Pages/Budgets/Partials/CreateBudgetModal';
import BudgetCard from '@/Components/BudgetCard';
import ExpenseChart from '@/Components/ExpenseChart';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, wallets, categories, transactions, totalBalance, monthlyIncome, monthlyExpense, chartLabels, chartData, budgetProgress }) {

    // --- STATE ---
    const [showCreateWallet, setShowCreateWallet] = useState(false);
    const [showCreateTransaction, setShowCreateTransaction] = useState(false);
    const [showCreateCategory, setShowCreateCategory] = useState(false);
    const [showCreateTransfer, setShowCreateTransfer] = useState(false);
    const [showCreateBudget, setShowCreateBudget] = useState(false);
    const [editingWallet, setEditingWallet] = useState(null);

    // --- DATA HANDLING ---
    const safeWallets = Array.isArray(wallets) ? wallets : [];
    const safeCategories = Array.isArray(categories) ? categories : [];
    const safeTransactions = Array.isArray(transactions) ? transactions : [];
    const safeBudgets = Array.isArray(budgetProgress) ? budgetProgress : [];

    const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const greeting = new Date().getHours() < 12 ? 'Selamat Pagi' : new Date().getHours() < 18 ? 'Selamat Sore' : 'Selamat Malam';

    return (
        <AuthenticatedLayout user={auth.user} header={null}>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-[#0B0F19] text-white relative overflow-hidden font-sans selection:bg-purple-500 selection:text-white">

                {/* --- AMBIENT BACKGROUND --- */}
                <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full mix-blend-screen filter blur-[120px]"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full mix-blend-screen filter blur-[120px]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    {/* --- HEADER --- */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div>
                            <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-2 pl-1">Financial Overview</p>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 tracking-tight">
                                {greeting}, {auth.user.name.split(' ')[0]}! 👋
                            </h1>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            <button onClick={() => setShowCreateCategory(true)} className="px-4 py-3 bg-gray-800/60 hover:bg-gray-700 hover:text-white text-gray-400 rounded-2xl font-bold border border-white/5 backdrop-blur-md transition-all hover:scale-105 active:scale-95">
                                📂
                            </button>
                            <button onClick={() => setShowCreateTransfer(true)} className="px-6 py-3 bg-gray-800/60 hover:bg-orange-500/20 text-orange-400 border border-orange-500/20 rounded-2xl font-bold backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group">
                                <span className="group-hover:rotate-180 transition-transform duration-500">🔄</span> Transfer
                            </button>
                            <button onClick={() => setShowCreateTransaction(true)} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                                <span>📝</span> Transaksi Baru
                            </button>
                        </div>
                    </div>

                    {/* --- SECTION 1: MAIN STATS --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

                        {/* LEFT: Balance & Chart */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Card: Total Balance */}
                            <div className="group relative flex flex-col justify-between p-8 rounded-[2rem] bg-[#131926] border border-white/5 overflow-hidden min-h-[280px] transition-all hover:border-white/10">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-[100px] pointer-events-none"></div>

                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400">💰</div>
                                        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest">Total Kekayaan</h3>
                                    </div>
                                    <div className="text-4xl lg:text-[2.5rem] font-bold text-white tracking-tight leading-none">
                                        {formatRupiah(totalBalance || 0)}
                                    </div>
                                </div>

                                <div className="relative z-10 mt-auto">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 text-xs font-bold border border-green-500/20">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        LIVE UPDATE
                                    </div>
                                </div>
                            </div>

                            {/* Card: Chart */}
                            <div className="p-6 rounded-[2rem] bg-[#131926] border border-white/5 flex flex-col min-h-[280px]">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                                        Pengeluaran
                                    </h3>
                                    <span className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-lg border border-white/5">Bulan Ini</span>
                                </div>
                                <div className="flex-1 w-full flex items-center justify-center relative">
                                    <ExpenseChart labels={chartLabels} data={chartData} />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Monthly Summary & Budget */}
                        <div className="flex flex-col gap-4 h-full">

                            {/* Summary Cards Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                {/* Income */}
                                <div className="p-5 rounded-[1.5rem] bg-[#131926] border border-white/5 flex flex-col justify-center gap-1 group hover:bg-white/[0.02] transition">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-sm border border-emerald-500/20 text-emerald-400">⬇️</div>
                                        <span className="text-gray-600 text-[10px] font-black uppercase">IN</span>
                                    </div>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Pemasukan</p>
                                    <p className="text-lg font-bold text-white truncate">{formatRupiah(monthlyIncome || 0)}</p>
                                </div>

                                {/* Expense */}
                                <div className="p-5 rounded-[1.5rem] bg-[#131926] border border-white/5 flex flex-col justify-center gap-1 group hover:bg-white/[0.02] transition">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="w-8 h-8 rounded-lg bg-rose-500/10 flex items-center justify-center text-sm border border-rose-500/20 text-rose-400">⬆️</div>
                                        <span className="text-gray-600 text-[10px] font-black uppercase">OUT</span>
                                    </div>
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Pengeluaran</p>
                                    <p className="text-lg font-bold text-white truncate">{formatRupiah(monthlyExpense || 0)}</p>
                                </div>
                            </div>

                            {/* --- BUDGET SECTION --- */}
                            <div className="flex-1 p-5 rounded-[2rem] bg-[#131926] border border-white/5 overflow-hidden flex flex-col">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-gray-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2">
                                        🛡️ Budgeting
                                    </h3>
                                    <button onClick={() => setShowCreateBudget(true)} className="text-[10px] bg-purple-500/10 hover:bg-purple-500/20 text-purple-400 font-bold px-3 py-1 rounded-lg border border-purple-500/20 transition">+ Atur</button>
                                </div>

                                <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-3">
                                    {safeBudgets.length > 0 ? (
                                        safeBudgets.map((budget, index) => (
                                            <BudgetCard key={index} budget={budget} />
                                        ))
                                    ) : (
                                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-4">
                                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-2">🎯</div>
                                            <p className="text-xs text-gray-400">Belum ada anggaran.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* --- SECTION 2: WALLETS (REDESIGNED) --- */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-3">
                            <h2 className="text-xl font-bold text-white">Dompet Saya</h2>
                            <span className="flex items-center justify-center h-5 px-2 bg-white/10 text-gray-300 text-[10px] font-bold rounded-md border border-white/5">{safeWallets.length}</span>
                        </div>
                        <button className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-wider transition-colors">Kelola Dompet</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">

                        {/* 1. Add Wallet Card */}
                        <div
                            onClick={() => { setEditingWallet(null); setShowCreateWallet(true); }}
                            className="group relative border border-dashed border-white/10 hover:border-blue-500/50 bg-white/[0.02] hover:bg-blue-500/[0.05] rounded-[24px] flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 min-h-[160px]"
                        >
                            <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300 mb-3 group-hover:shadow-lg group-hover:shadow-blue-500/40">
                                <span className="text-2xl text-gray-400 group-hover:text-white pb-1">+</span>
                            </div>
                            <p className="text-gray-400 group-hover:text-white font-bold text-sm transition-colors">Tambah Dompet</p>
                        </div>

                        {/* 2. Wallet Cards */}
                        {safeWallets.map((wallet) => (
                            <div
                                key={wallet.id}
                                onClick={() => { setEditingWallet(wallet); setShowCreateWallet(true); }}
                                className="relative group p-6 rounded-[24px] bg-[#181E29] border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer min-h-[160px] flex flex-col justify-between overflow-hidden"
                            >
                                {/* Top: Icon & Type */}
                                <div className="flex justify-between items-start z-10 relative">
                                    <div className="w-12 h-12 rounded-2xl bg-[#232936] flex items-center justify-center text-2xl shadow-inner border border-white/5 group-hover:scale-105 transition-transform">
                                        {wallet.type === 'cash' ? '💵' : wallet.type === 'bank' ? '🏦' : wallet.type === 'ewallet' ? '📱' : '💳'}
                                    </div>
                                    <span className="text-[10px] font-bold text-gray-500 bg-black/20 px-2 py-1 rounded-md uppercase tracking-wider border border-white/5">
                                        {wallet.type}
                                    </span>
                                </div>

                                {/* Bottom: Name & Balance */}
                                <div className="z-10 relative">
                                    <h4 className="text-sm font-medium text-gray-400 mb-1 truncate">{wallet.name}</h4>
                                    <p className="text-2xl font-bold text-white tracking-tight group-hover:text-blue-200 transition-colors">
                                        {formatRupiah(wallet.balance)}
                                    </p>
                                </div>

                                {/* Edit Icon on Hover */}
                                <div className="absolute top-4 right-14 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setEditingWallet(wallet); setShowCreateWallet(true); }}
                                        className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-md"
                                    >
                                        Edit
                                    </button>
                                </div>

                                {/* Decorative Gradient Blob */}
                                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tl from-white/5 to-transparent rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500"></div>
                            </div>
                        ))}
                    </div>

                    {/* --- SECTION 3: TRANSAKSI (SIMPLE LIST) --- */}
                    <div className="mt-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Transaksi Terakhir</h2>
                            <Link href={route('transactions.index')} className="text-sm font-medium text-gray-500 hover:text-white transition-colors">Lihat Semua</Link>
                        </div>

                        <div className="bg-[#131926] border border-white/5 rounded-[24px] overflow-hidden">
                            {safeTransactions.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {safeTransactions.map((trx) => (
                                        <div key={trx.id} className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors group cursor-pointer">
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${trx.type === 'expense' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                                    {trx.category ? trx.category.icon_name : (trx.type === 'expense' ? '💸' : '💰')}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-200 text-sm">{trx.category ? trx.category.name : 'Tanpa Kategori'}</h4>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                                        <span>{formatDate(trx.transaction_date)}</span>
                                                        <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
                                                        <span>{trx.wallet?.name || 'Dompet Dihapus'}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-base font-bold tracking-tight ${trx.type === 'expense' ? 'text-rose-400' : 'text-emerald-400'}`}>
                                                    {trx.type === 'expense' ? '-' : '+'} {formatRupiah(trx.amount)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-10 text-center text-gray-500 text-sm">Belum ada transaksi.</div>
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

            <style>{` .animate-pulse-slow { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; } .custom-scrollbar::-webkit-scrollbar { width: 3px; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #4B5563; border-radius: 10px; } `}</style>
        </AuthenticatedLayout>
    );
}