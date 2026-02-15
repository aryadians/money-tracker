import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BudgetCard from '@/Components/BudgetCard';
import ExpenseChart from '@/Components/ExpenseChart';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

import CreateWalletModal from '@/Pages/Wallets/Partials/CreateWalletModal';
import CreateTransactionModal from '@/Pages/Transactions/Partials/CreateTransactionModal';
import CreateCategoryModal from '@/Pages/Categories/Partials/CreateCategoryModal';
import CreateTransferModal from '@/Pages/Transfers/Partials/CreateTransferModal';
import CreateBudgetModal from '@/Pages/Budgets/Partials/CreateBudgetModal';
import EditBudgetModal from '@/Pages/Budgets/Partials/EditBudgetModal';

import AchievementPopup from '@/Components/AchievementPopup';
import OnboardingTour from '@/Components/OnboardingTour';

export default function Dashboard({ auth, wallets, categories, transactions, totalBalance, monthlyIncome, monthlyExpense, chartLabels, chartData, budgetProgress, healthScore, newAchievements, insights }) {

    // --- STATE ---
    const [showCreateWallet, setShowCreateWallet] = useState(false);
    const [showCreateTransaction, setShowCreateTransaction] = useState(false);
    const [showCreateCategory, setShowCreateCategory] = useState(false);
    const [showCreateTransfer, setShowCreateTransfer] = useState(false);
    const [showCreateBudget, setShowCreateBudget] = useState(false);

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

    return (
        <AuthenticatedLayout header={null}>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-[#0B0F19] text-white relative overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
                
                <OnboardingTour />
                <AchievementPopup achievements={newAchievements} />

                {/* --- AMBIENT BACKGROUND --- */}
                <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow"></div>
                    <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-pulse-slow delay-1000"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-pink-600/10 rounded-full mix-blend-screen filter blur-[120px] animate-pulse-slow delay-2000"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
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
                            <button onClick={() => setShowCreateCategory(true)} className="px-4 py-3 bg-gray-800/40 hover:bg-gray-700/60 text-gray-300 rounded-2xl font-bold border border-white/10 backdrop-blur-md transition-all hover:scale-105 active:scale-95">
                                📂
                            </button>
                            <button onClick={() => setShowCreateTransfer(true)} className="px-6 py-3 bg-gray-800/40 hover:bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-2xl font-bold backdrop-blur-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2 group">
                                <span className="group-hover:rotate-180 transition-transform duration-500">🔄</span> Transfer
                            </button>
                            <button onClick={() => setShowCreateTransaction(true)} className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                                <span>📝</span> Transaksi Baru
                            </button>
                        </div>
                    </div>

                    {/* --- SMART INSIGHTS --- */}
                    {insights && insights.length > 0 && (
                        <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {insights.map((insight, idx) => (
                                <div key={idx} className={`p-4 rounded-2xl border flex items-start gap-3 shadow-lg backdrop-blur-md ${
                                    insight.type === 'warning' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200' :
                                    insight.type === 'danger' ? 'bg-red-500/10 border-red-500/30 text-red-200' :
                                    'bg-green-500/10 border-green-500/30 text-green-200'
                                }`}>
                                    <span className="text-xl mt-0.5">
                                        {insight.type === 'warning' ? '⚠️' : insight.type === 'danger' ? '🚨' : '💡'}
                                    </span>
                                    <div>
                                        <h4 className="font-bold text-sm uppercase tracking-wide opacity-70 mb-1">Smart Insight</h4>
                                        <p className="text-sm font-medium leading-relaxed">{insight.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* --- HEALTH SCORE & CALENDAR LINK --- */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        {/* Health Score Card */}
                        <div className="bg-gray-800/80 p-6 rounded-3xl border border-white/5 flex items-center justify-between relative overflow-hidden group backdrop-blur-md">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-2xl"></div>
                            <div>
                                <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-1">Skor Kesehatan Keuangan</h3>
                                <div className="text-4xl font-black text-white flex items-baseline gap-1">
                                    {healthScore || 0}<span className="text-lg text-gray-500 font-medium">/100</span>
                                </div>
                                <p className="text-[10px] text-gray-500 mt-2 max-w-[200px]">
                                    {healthScore >= 80 ? 'Luar Biasa! Pertahankan kebiasaan baikmu. 🌟' : 
                                     healthScore >= 50 ? 'Cukup Baik. Kurangi pengeluaran boros ya. 👍' : 
                                     'Perlu Perhatian. Ayo mulai menabung & lunasi hutang! ⚠️'}
                                </p>
                            </div>
                            <div className="relative w-20 h-20 flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center justify-center text-2xl animate-pulse-slow">🩺</div>
                                <svg className="transform -rotate-90 w-20 h-20">
                                    <circle cx="40" cy="40" r="36" stroke="#374151" strokeWidth="8" fill="transparent" />
                                    <circle cx="40" cy="40" r="36" stroke={healthScore >= 80 ? '#22c55e' : healthScore >= 50 ? '#eab308' : '#ef4444'} 
                                        strokeWidth="8" 
                                        fill="transparent" 
                                        strokeDasharray={226} 
                                        strokeDashoffset={226 - (226 * (healthScore || 0)) / 100} 
                                        strokeLinecap="round" 
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Calendar Link Card */}
                        <Link href={route('calendar.index')} className="bg-gray-800/80 p-6 rounded-3xl border border-white/5 flex items-center justify-between hover:border-blue-500/50 transition-all group cursor-pointer relative overflow-hidden backdrop-blur-md">
                            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors"></div>
                            <div>
                                <h3 className="text-blue-400 font-bold text-xs uppercase tracking-widest mb-1">Kalender Keuangan</h3>
                                <div className="text-2xl font-bold text-white mb-1">Lihat Pola Cashflow</div>
                                <p className="text-xs text-gray-500">Analisis pengeluaran harianmu dalam tampilan kalender.</p>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-lg border border-white/5">
                                📅
                            </div>
                        </Link>
                    </div>

                    {/* --- SECTION 1: STATS GRID --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                        {/* LEFT: Balance & Chart */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Card: Total Balance */}
                            <div className="group relative flex flex-col justify-between p-8 rounded-[2rem] bg-[#131926]/80 border border-white/5 overflow-hidden min-h-[280px] transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-bl-[100px] pointer-events-none opacity-50"></div>
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
                            <div className="group p-6 rounded-[2rem] bg-[#131926]/80 border border-white/5 flex flex-col min-h-[280px] transition-all duration-500 hover:-translate-y-2 hover:border-purple-500/30">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">Pengeluaran</h3>
                                    <span className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-1 rounded-lg border border-white/5">Bulan Ini</span>
                                </div>
                                <div className="flex-1 w-full flex items-center justify-center relative scale-95 group-hover:scale-105 transition-transform duration-500">
                                    <ExpenseChart labels={chartLabels} data={chartData} />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Monthly Summary & Budget */}
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-5 rounded-[1.5rem] bg-[#131926]/80 border border-white/5 flex flex-col justify-center gap-1 group hover:bg-emerald-500/5 transition-all duration-300">
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Pemasukan</p>
                                    <p className="text-lg font-bold text-white">{formatRupiah(monthlyIncome || 0)}</p>
                                </div>
                                <div className="p-5 rounded-[1.5rem] bg-[#131926]/80 border border-white/5 flex flex-col justify-center gap-1 group hover:bg-rose-500/5 transition-all duration-300">
                                    <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Pengeluaran</p>
                                    <p className="text-lg font-bold text-white">{formatRupiah(monthlyExpense || 0)}</p>
                                </div>
                            </div>

                            <div className="flex-1 p-5 rounded-[2rem] bg-[#131926]/80 border border-white/5 overflow-hidden flex flex-col transition-all duration-500 hover:border-yellow-500/30">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-gray-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2">🛡️ Budget</h3>
                                    <button onClick={() => setShowCreateBudget(true)} className="text-[10px] bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 font-bold px-3 py-1 rounded-full border border-yellow-500/20 transition">+ Atur</button>
                                </div>
                                <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-3">
                                    {safeBudgets.length > 0 ? safeBudgets.map((budget, index) => (
                                        <div key={index} className="transform transition-all hover:scale-[1.02] hover:translate-x-1">
                                            <BudgetCard budget={budget} onEdit={(b) => { setEditingBudget(b); setShowEditBudget(true); }} onDelete={(b) => { if (confirm('Hapus anggaran?')) router.delete(route('budgets.destroy', b.id)); }} />
                                        </div>
                                    )) : (
                                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-4 text-xs text-gray-400">Belum ada anggaran.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Wallets */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Dompet Saya</h2>
                        <button className="text-xs font-bold text-gray-500 hover:text-white uppercase tracking-wider transition-colors hover:underline">Kelola Dompet</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                        <div onClick={() => { setEditingWallet(null); setShowCreateWallet(true); }} className="group relative border-2 border-dashed border-white/10 hover:border-blue-500/50 bg-white/[0.02] hover:bg-blue-500/[0.05] rounded-[24px] flex flex-col items-center justify-center p-6 cursor-pointer transition-all duration-300 min-h-[160px]">
                            <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-blue-600 flex items-center justify-center transition-all duration-300 mb-4 text-2xl text-gray-400 group-hover:text-white">+</div>
                            <p className="text-gray-400 group-hover:text-white font-bold text-sm">Tambah Dompet</p>
                        </div>
                        {safeWallets.map((wallet) => (
                            <div key={wallet.id} onClick={() => { setEditingWallet(wallet); setShowCreateWallet(true); }} className="relative group p-6 rounded-[24px] bg-[#181E29] border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 cursor-pointer min-h-[160px] flex flex-col justify-between overflow-hidden">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none" style={{ background: `linear-gradient(135deg, ${wallet.color_hex || '#3B82F6'}, transparent)` }}></div>
                                <div className="flex justify-between items-start z-10 relative">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-[#1A202F] flex items-center justify-center text-2xl shadow-inner border border-white/5">
                                            {wallet.type === 'cash' ? '💵' : wallet.type === 'bank' ? '🏦' : wallet.type === 'ewallet' ? '📱' : '💳'}
                                        </div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white leading-tight truncate max-w-[140px]">{wallet.name}</h4>
                                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">{wallet.type}</p>
                                        </div>
                                    </div>
                                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 opacity-0 group-hover:opacity-100 transition-all">✏️</button>
                                </div>
                                <div className="z-10 relative">
                                    <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">Saldo Aktif</p>
                                    <p className="text-2xl font-bold text-white tracking-tight">{formatRupiah(wallet.balance)}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Transactions */}
                    <div className="mt-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-white">Transaksi Terakhir</h2>
                            <Link href={route('transactions.index')} className="text-sm font-medium text-gray-500 hover:text-white transition-colors">Lihat Semua</Link>
                        </div>
                        <div className="bg-[#131926]/80 backdrop-blur-md rounded-[24px] border border-white/5 overflow-hidden shadow-2xl">
                            {safeTransactions.length > 0 ? (
                                <div className="divide-y divide-white/5">
                                    {safeTransactions.map((trx) => (
                                        <div key={trx.id} className="p-5 flex items-center justify-between hover:bg-white/[0.03] transition-colors group cursor-pointer">
                                            <div className="flex items-center gap-5">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border border-white/5 shadow-lg ${trx.type === 'expense' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                                    {trx.category?.icon_name || (trx.type === 'expense' ? '💸' : '💰')}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white text-base mb-0.5">{trx.category?.name || 'Tanpa Kategori'}</h4>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <span className="font-mono text-gray-400">{formatDate(trx.transaction_date)}</span>
                                                        <span className="w-1 h-1 bg-gray-600 rounded-full"></span>
                                                        <span>{trx.wallet?.name}</span>
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
                                <div className="p-12 text-center flex flex-col items-center opacity-60 text-gray-400 text-sm">Belum ada transaksi.</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <CreateWalletModal show={showCreateWallet} onClose={() => { setShowCreateWallet(false); setTimeout(() => setEditingWallet(null), 300); }} walletToEdit={editingWallet} />
            <CreateCategoryModal show={showCreateCategory} onClose={() => setShowCreateCategory(false)} />
            <CreateTransactionModal show={showCreateTransaction} onClose={() => setShowCreateTransaction(false)} wallets={safeWallets} categories={safeCategories} onCreateCategory={() => { setShowCreateTransaction(false); setTimeout(() => setShowCreateCategory(true), 200); }} />
            <CreateTransferModal show={showCreateTransfer} onClose={() => setShowCreateTransfer(false)} wallets={safeWallets} />
            <CreateBudgetModal show={showCreateBudget} onClose={() => setShowCreateBudget(false)} categories={safeCategories} />
            <EditBudgetModal show={showEditBudget} onClose={() => { setShowEditBudget(false); setEditingBudget(null); }} budget={editingBudget} />

            <style>{`
                .animate-pulse-slow { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #374151; border-radius: 10px; }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-track { background: #0B0F19; }
                ::-webkit-scrollbar-thumb { background: #1F2937; border-radius: 10px; }
                ::selection { background: #8B5CF6; color: white; }
            `}</style>
        </AuthenticatedLayout>
    );
}
