import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateWalletModal from '@/Pages/Wallets/Partials/CreateWalletModal';
import CreateTransactionModal from '@/Pages/Transactions/Partials/CreateTransactionModal';
import CreateCategoryModal from '@/Pages/Categories/Partials/CreateCategoryModal';
import ExpenseChart from '@/Components/ExpenseChart'; // Import the Chart Component
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

// Receive props including chartLabels and chartData
export default function Dashboard({ auth, wallets, categories, transactions, totalBalance, monthlyIncome, monthlyExpense, chartLabels, chartData }) {

    // --- 1. STATE MANAGEMENT ---
    const [showCreateWallet, setShowCreateWallet] = useState(false);
    const [showCreateTransaction, setShowCreateTransaction] = useState(false);
    const [showCreateCategory, setShowCreateCategory] = useState(false);

    // State for Editing Wallet
    const [editingWallet, setEditingWallet] = useState(null);

    // --- 2. DATA PROCESSING ---
    const safeWallets = Array.isArray(wallets) ? wallets : [];
    const safeCategories = Array.isArray(categories) ? categories : [];
    const safeTransactions = Array.isArray(transactions) ? transactions : [];

    // Helper: Format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    };

    // Helper: Format Date
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Selamat Pagi' : hour < 18 ? 'Selamat Sore' : 'Selamat Malam';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={null}
        >
            <Head title="Dashboard" />

            {/* --- MAIN CONTAINER --- */}
            <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">

                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    {/* --- HEADER --- */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-8">
                        <div>
                            <p className="text-gray-400 text-sm font-medium tracking-wider uppercase mb-1">Overview</p>
                            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                {greeting}, {auth.user.name.split(' ')[0]}! 👋
                            </h1>
                        </div>

                        <div className="flex gap-3 mt-4 md:mt-0">
                            <button
                                onClick={() => setShowCreateCategory(true)}
                                className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 border border-gray-700"
                            >
                                <span>📂</span> Kategori
                            </button>

                            <button
                                onClick={() => setShowCreateTransaction(true)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                            >
                                <span>📝</span> Transaksi Baru
                            </button>
                        </div>
                    </div>

                    {/* --- SECTION 1: STATS & CHARTS --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

                        {/* LEFT COLUMN (2/3 width): Total Balance & Chart */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Card 1: Total Balance */}
                            <div className="flex flex-col justify-between p-8 rounded-3xl bg-gradient-to-br from-blue-900/40 to-gray-900/50 backdrop-blur-xl border border-blue-500/20 shadow-2xl relative overflow-hidden h-full min-h-[280px]">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent pointer-events-none"></div>

                                <div className="relative z-10">
                                    <h3 className="text-blue-200 font-medium mb-2">Total Kekayaan Bersih</h3>
                                    <div className="text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-lg">
                                        {formatRupiah(totalBalance || 0)}
                                    </div>
                                </div>

                                <div className="relative z-10 mt-6 flex items-center gap-2 text-blue-400 text-xs font-bold bg-blue-500/10 w-fit px-3 py-1.5 rounded-full border border-blue-500/20">
                                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
                                    DATA REAL-TIME
                                </div>
                                <div className="absolute right-[-20px] bottom-[-20px] text-9xl opacity-10 pointer-events-none">
                                    💰
                                </div>
                            </div>

                            {/* Card 2: Expense Chart */}
                            <div className="flex flex-col p-6 rounded-3xl bg-gray-800/40 backdrop-blur-xl border border-white/5 shadow-xl h-full min-h-[280px]">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">Pengeluaran</h3>
                                    <span className="text-[10px] text-gray-500 bg-gray-900 px-2 py-1 rounded-md border border-white/5">
                                        Bulan Ini
                                    </span>
                                </div>

                                {/* Chart Container - Centered */}
                                <div className="flex-1 w-full flex items-center justify-center relative">
                                    <ExpenseChart labels={chartLabels} data={chartData} />
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN (1/3 width): Monthly Summary (Stacked) */}
                        <div className="flex flex-col gap-4 h-full">

                            {/* Income Card */}
                            <div className="flex-1 p-6 rounded-3xl bg-emerald-900/10 border border-emerald-500/20 backdrop-blur-sm flex flex-col justify-center gap-1 transition hover:bg-emerald-900/20">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-lg shadow-inner border border-emerald-500/30">
                                        ⬇️
                                    </div>
                                    <span className="text-emerald-500/50 text-[10px] font-bold tracking-widest uppercase">Income</span>
                                </div>
                                <p className="text-emerald-400 text-xs uppercase font-bold tracking-wider">Pemasukan</p>
                                <p className="text-2xl font-bold text-white truncate">{formatRupiah(monthlyIncome || 0)}</p>
                            </div>

                            {/* Expense Card */}
                            <div className="flex-1 p-6 rounded-3xl bg-rose-900/10 border border-rose-500/20 backdrop-blur-sm flex flex-col justify-center gap-1 transition hover:bg-rose-900/20">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center text-lg shadow-inner border border-rose-500/30">
                                        ⬆️
                                    </div>
                                    <span className="text-rose-500/50 text-[10px] font-bold tracking-widest uppercase">Expense</span>
                                </div>
                                <p className="text-rose-400 text-xs uppercase font-bold tracking-wider">Pengeluaran</p>
                                <p className="text-2xl font-bold text-white truncate">{formatRupiah(monthlyExpense || 0)}</p>
                            </div>
                        </div>
                    </div>

                    {/* --- SECTION 2: WALLETS --- */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Dompet Saya</h2>
                        <button className="text-sm text-blue-400 hover:text-blue-300 hover:underline">Lihat Semua</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

                        {/* Add Wallet Card */}
                        <div
                            onClick={() => {
                                setEditingWallet(null);
                                setShowCreateWallet(true);
                            }}
                            className="group border border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-blue-500 hover:bg-gray-800/30 transition-all duration-300 min-h-[160px]"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-300 mb-3">
                                <span className="text-2xl text-gray-400 group-hover:text-white">+</span>
                            </div>
                            <p className="text-gray-500 group-hover:text-white font-medium">Tambah Dompet</p>
                        </div>

                        {/* Wallet List */}
                        {safeWallets.map((wallet) => (
                            <div
                                key={wallet.id}
                                className="relative group p-6 rounded-2xl bg-gray-800/40 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden transform hover:-translate-y-2 cursor-pointer min-h-[160px]"
                                onClick={() => {
                                    setEditingWallet(wallet);
                                    setShowCreateWallet(true);
                                }}
                            >
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                    style={{ background: `linear-gradient(135deg, ${wallet.color_hex || '#3B82F6'}, transparent)` }}
                                ></div>

                                {/* Edit Button (Bottom Right) */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingWallet(wallet);
                                        setShowCreateWallet(true);
                                    }}
                                    className="absolute bottom-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hover:scale-110 border border-white/10 shadow-lg"
                                    title="Edit Dompet"
                                >
                                    <span className="text-xs">✏️</span>
                                </button>

                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="p-2 rounded-xl bg-gray-900/50 border border-white/10 shadow-inner backdrop-blur-sm">
                                            <span className="text-xl">
                                                {wallet.type === 'cash' ? '💵' : wallet.type === 'bank' ? '🏦' : wallet.type === 'ewallet' ? '📱' : '💳'}
                                            </span>
                                        </div>
                                        <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-300 bg-black/20 rounded-full border border-white/5">
                                            {wallet.type}
                                        </span>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-200 mb-1 group-hover:text-white transition-colors truncate pr-8">{wallet.name}</h4>
                                        <p className="text-2xl font-bold text-white tracking-wide">
                                            {formatRupiah(wallet.balance)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- SECTION 3: RECENT TRANSACTIONS --- */}
                    <div className="mt-12">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white">Transaksi Terakhir</h2>
                            <Link href={route('transactions.index')} className="text-sm text-blue-400 hover:text-blue-300 hover:underline">
                                Lihat Semua
                            </Link>
                        </div>

                        <div className="bg-gray-800/40 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden">
                            {safeTransactions.length > 0 ? (
                                <div className="divide-y divide-gray-700/50">
                                    {safeTransactions.map((trx) => (
                                        <div key={trx.id} className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors group cursor-pointer">

                                            {/* Left: Icon & Info */}
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border border-white/5 shadow-inner ${trx.type === 'expense' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                                                    }`}>
                                                    {trx.category ? trx.category.icon_name : (trx.type === 'expense' ? '💸' : '💰')}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-white text-base">
                                                        {trx.category ? trx.category.name : 'Tanpa Kategori'}
                                                    </h4>
                                                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                                        <span>{formatDate(trx.transaction_date)}</span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1">
                                                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: trx.wallet?.color_hex || '#ccc' }}></span>
                                                            {trx.wallet?.name || 'Dompet Dihapus'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right: Amount */}
                                            <div className="text-right">
                                                <p className={`text-lg font-bold tracking-wide ${trx.type === 'expense' ? 'text-red-400' : 'text-green-400'
                                                    }`}>
                                                    {trx.type === 'expense' ? '-' : '+'} {formatRupiah(trx.amount)}
                                                </p>
                                                {trx.description && (
                                                    <p className="text-xs text-gray-500 max-w-[150px] truncate ml-auto">
                                                        {trx.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                /* Empty State */
                                <div className="p-10 text-center">
                                    <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                                        📝
                                    </div>
                                    <p className="text-gray-400 font-medium">Belum ada transaksi bulan ini.</p>
                                    <p className="text-sm text-gray-600 mt-2">Yuk mulai catat pengeluaranmu!</p>
                                    <button
                                        onClick={() => setShowCreateTransaction(true)}
                                        className="mt-4 text-blue-400 hover:text-blue-300 text-sm font-bold"
                                    >
                                        + Tambah Transaksi
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            {/* --- MODALS --- */}
            <CreateWalletModal
                show={showCreateWallet}
                onClose={() => { setShowCreateWallet(false); setTimeout(() => setEditingWallet(null), 300); }}
                walletToEdit={editingWallet}
            />
            <CreateCategoryModal
                show={showCreateCategory}
                onClose={() => setShowCreateCategory(false)}
            />
            <CreateTransactionModal
                show={showCreateTransaction}
                onClose={() => setShowCreateTransaction(false)}
                wallets={safeWallets}
                categories={safeCategories}
                onCreateCategory={() => { setShowCreateTransaction(false); setTimeout(() => setShowCreateCategory(true), 200); }}
            />

            {/* Style Animation */}
            <style>{`
                @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } }
                @keyframes shimmer { 100% { transform: translateX(100%); } }
                .animate-blob { animation: blob 7s infinite; }
                .animate-shimmer { animation: shimmer 2s infinite; }
            `}</style>
        </AuthenticatedLayout>
    );
}