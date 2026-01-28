import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateWalletModal from '@/Pages/Wallets/Partials/CreateWalletModal';
import CreateTransactionModal from '@/Pages/Transactions/Partials/CreateTransactionModal';
import CreateCategoryModal from '@/Pages/Categories/Partials/CreateCategoryModal';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, wallets, categories, totalBalance }) {

    // --- 1. STATE MANAGEMENT ---
    const [showCreateWallet, setShowCreateWallet] = useState(false);
    const [showCreateTransaction, setShowCreateTransaction] = useState(false);
    const [showCreateCategory, setShowCreateCategory] = useState(false);

    // State Baru: Menyimpan data dompet yang sedang diedit
    const [editingWallet, setEditingWallet] = useState(null);

    // --- 2. DATA PROCESSING ---
    const safeWallets = Array.isArray(wallets) ? wallets : [];
    const safeCategories = Array.isArray(categories) ? categories : [];

    // Helper: Format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    };

    // Helper: Ucapan Selamat
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Selamat Pagi' : hour < 18 ? 'Selamat Sore' : 'Selamat Malam';

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={null}
        >
            <Head title="Dashboard" />

            {/* --- MAIN CONTAINER (DARK MODE) --- */}
            <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">

                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    {/* --- HEADER --- */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                        <div>
                            <p className="text-gray-400 text-sm font-medium tracking-wider uppercase mb-1">Overview</p>
                            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                {greeting}, {auth.user.name.split(' ')[0]}! 👋
                            </h1>
                        </div>

                        <div className="flex gap-3 mt-4 md:mt-0">
                            {/* Tombol Kategori */}
                            <button
                                onClick={() => setShowCreateCategory(true)}
                                className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 border border-gray-700"
                            >
                                <span>📂</span> Kategori
                            </button>

                            {/* Tombol Transaksi */}
                            <button
                                onClick={() => setShowCreateTransaction(true)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                            >
                                <span>📝</span> Transaksi Baru
                            </button>
                        </div>
                    </div>

                    {/* --- TOTAL BALANCE CARD --- */}
                    <div className="w-full p-8 mb-10 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center">
                            <div>
                                <h3 className="text-gray-400 font-medium mb-2">Total Kekayaan Bersih</h3>
                                <div className="text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
                                    {formatRupiah(totalBalance || 0)}
                                </div>
                                <div className="flex items-center mt-4 text-green-400 text-sm font-medium bg-green-400/10 px-3 py-1 rounded-full w-fit">
                                    <span>↗ Data Real-time</span>
                                </div>
                            </div>
                            <div className="hidden md:block opacity-20">
                                <span className="text-8xl">💰</span>
                            </div>
                        </div>
                    </div>

                    {/* --- WALLETS SECTION --- */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Dompet Saya</h2>
                        <button className="text-sm text-blue-400 hover:text-blue-300 hover:underline">Lihat Semua</button>
                    </div>

                    {/* GRID DOMPET */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* KARTU TAMBAH DOMPET (Mode Create) */}
                        <div
                            onClick={() => {
                                setEditingWallet(null); // Reset mode ke Create
                                setShowCreateWallet(true);
                            }}
                            className="group border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-blue-500 hover:bg-gray-800/30 transition-all duration-300 min-h-[200px]"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-300 mb-3">
                                <span className="text-2xl text-gray-400 group-hover:text-white">+</span>
                            </div>
                            <p className="text-gray-500 group-hover:text-white font-medium">Tambah Dompet</p>
                        </div>

                        {/* LOOPING DOMPET (Mode Edit saat diklik/hover) */}
                        {safeWallets.map((wallet) => (
                            <div
                                key={wallet.id}
                                className="relative group p-6 rounded-2xl bg-gray-800/40 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden transform hover:-translate-y-2 cursor-pointer"
                                onClick={() => {
                                    setEditingWallet(wallet); // Set data dompet yg mau diedit
                                    setShowCreateWallet(true); // Buka modal
                                }}
                            >
                                {/* Background Gradient */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                    style={{ background: `linear-gradient(135deg, ${wallet.color_hex || '#3B82F6'}, transparent)` }}
                                ></div>

                                {/* TOMBOL EDIT (PENCIL) - PINDAH KE POJOK KANAN BAWAH */}
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

                                {/* Konten Kartu */}
                                <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px]">
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 rounded-xl bg-gray-900/50 border border-white/10 shadow-inner backdrop-blur-sm">
                                            <span className="text-2xl">
                                                {wallet.type === 'cash' ? '💵' : wallet.type === 'bank' ? '🏦' : wallet.type === 'ewallet' ? '📱' : '💳'}
                                            </span>
                                        </div>
                                        {/* Badge Tipe di Kanan Atas */}
                                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-gray-300 bg-black/20 rounded-full border border-white/5">
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

                    {/* --- RECENT TRANSACTIONS (Placeholder) --- */}
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-white mb-6">Transaksi Terakhir</h2>
                        <div className="bg-gray-800/40 backdrop-blur-md rounded-2xl border border-white/5 p-8 text-center">
                            <p className="text-gray-500">Belum ada transaksi bulan ini.</p>
                            <p className="text-sm text-gray-600 mt-2">Mulai catat pengeluaranmu sekarang!</p>
                        </div>
                    </div>

                </div>
            </div>

            {/* --- MODAL SECTION --- */}

            {/* 1. Modal Tambah/Edit Dompet */}
            <CreateWalletModal
                show={showCreateWallet}
                onClose={() => {
                    setShowCreateWallet(false);
                    setTimeout(() => setEditingWallet(null), 300); // Reset data edit setelah tutup
                }}
                walletToEdit={editingWallet} // <--- Kirim data edit ke modal
            />

            {/* 2. Modal Tambah Kategori */}
            <CreateCategoryModal
                show={showCreateCategory}
                onClose={() => setShowCreateCategory(false)}
            />

            {/* 3. Modal Tambah Transaksi */}
            <CreateTransactionModal
                show={showCreateTransaction}
                onClose={() => setShowCreateTransaction(false)}
                wallets={safeWallets}
                categories={safeCategories}
                // Fitur Spesial: Buka Modal Kategori dari dalam Modal Transaksi
                onCreateCategory={() => {
                    setShowCreateTransaction(false);
                    setTimeout(() => setShowCreateCategory(true), 200);
                }}
            />

            {/* Global CSS */}
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                @keyframes shimmer { 100% { transform: translateX(100%); } }
                .animate-blob { animation: blob 7s infinite; }
                .animate-shimmer { animation: shimmer 2s infinite; }
            `}</style>
        </AuthenticatedLayout>
    );
}