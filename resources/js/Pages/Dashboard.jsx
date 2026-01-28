import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import CreateWalletModal from '@/Pages/Wallets/Partials/CreateWalletModal';
import CreateTransactionModal from '@/Pages/Transactions/Partials/CreateTransactionModal';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ auth, wallets, categories, totalBalance }) {

    // --- 1. STATE MANAGEMENT ---
    // Mengatur buka-tutup modal
    const [showCreateWallet, setShowCreateWallet] = useState(false);
    const [showCreateTransaction, setShowCreateTransaction] = useState(false);

    // --- 2. DATA PROCESSING ---
    // Pastikan data array aman (mencegah error jika null)
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

    // Helper: Ucapan Selamat (Pagi/Siang/Malam)
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Selamat Pagi' : hour < 18 ? 'Selamat Sore' : 'Selamat Malam';

    return (
        <AuthenticatedLayout
            user={auth.user}
            // Kosongkan header default agar tidak merusak estetika dark mode
            header={null}
        >
            <Head title="Dashboard" />

            {/* --- MAIN CONTAINER (DARK MODE & ANIMATED BG) --- */}
            <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">

                {/* Background Blobs Animation */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    {/* --- HEADER SECTION --- */}
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                        <div>
                            <p className="text-gray-400 text-sm font-medium tracking-wider uppercase mb-1">Overview</p>
                            <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                                {greeting}, {auth.user.name.split(' ')[0]}! 👋
                            </h1>
                        </div>

                        {/* TOMBOL TRANSAKSI BARU */}
                        <button
                            onClick={() => setShowCreateTransaction(true)}
                            className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold shadow-lg shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                        >
                            <span>📝</span> Transaksi Baru
                        </button>
                    </div>

                    {/* --- TOTAL BALANCE CARD (HERO) --- */}
                    <div className="w-full p-8 mb-10 rounded-3xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 shadow-2xl relative overflow-hidden group">
                        {/* Shimmer Effect on Hover */}
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
                                {/* Icon Dekorasi Besar */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* --- WALLETS SECTION --- */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Dompet Saya</h2>
                        <button className="text-sm text-blue-400 hover:text-blue-300 hover:underline">Lihat Semua</button>
                    </div>

                    {/* Grid Layout Dompet */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* KARTU TAMBAH DOMPET (DASHED) */}
                        <div
                            onClick={() => setShowCreateWallet(true)}
                            className="group border-2 border-dashed border-gray-700 rounded-2xl flex flex-col items-center justify-center p-6 cursor-pointer hover:border-blue-500 hover:bg-gray-800/30 transition-all duration-300 min-h-[200px]"
                        >
                            <div className="w-12 h-12 rounded-full bg-gray-800 group-hover:bg-blue-600 flex items-center justify-center transition-colors duration-300 mb-3">
                                <span className="text-2xl text-gray-400 group-hover:text-white">+</span>
                            </div>
                            <p className="text-gray-500 group-hover:text-white font-medium">Tambah Dompet</p>
                        </div>

                        {/* MAPPING DATA DOMPET */}
                        {safeWallets.map((wallet) => (
                            <div
                                key={wallet.id}
                                className="relative group p-6 rounded-2xl bg-gray-800/40 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden transform hover:-translate-y-2"
                            >
                                {/* Gradient Background based on Wallet Color */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                                    style={{ background: `linear-gradient(135deg, ${wallet.color_hex || '#3B82F6'}, transparent)` }}
                                ></div>

                                <div className="relative z-10 flex flex-col h-full justify-between min-h-[160px]">
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 rounded-xl bg-gray-900/50 border border-white/10 shadow-inner">
                                            <span className="text-2xl">
                                                {wallet.type === 'cash' ? '💵' : wallet.type === 'bank' ? '🏦' : wallet.type === 'ewallet' ? '📱' : '💳'}
                                            </span>
                                        </div>
                                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-900/50 rounded-full border border-white/5">
                                            {wallet.type}
                                        </span>
                                    </div>

                                    <div>
                                        <h4 className="text-lg font-semibold text-gray-200 mb-1 group-hover:text-white transition-colors">{wallet.name}</h4>
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

            {/* --- MODAL SECTION (Diletakkan di luar kontainer utama agar overlay benar) --- */}

            {/* Modal Tambah Dompet */}
            <CreateWalletModal
                show={showCreateWallet}
                onClose={() => setShowCreateWallet(false)}
            />

            {/* Modal Tambah Transaksi */}
            <CreateTransactionModal
                show={showCreateTransaction}
                onClose={() => setShowCreateTransaction(false)}
                wallets={safeWallets}
                categories={safeCategories}
            />

            {/* CSS Animation */}
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animate-blob.animation-delay-2000 { animation-delay: 2s; }
                .animate-blob.animation-delay-4000 { animation-delay: 4s; }
                .animate-shimmer { animation: shimmer 2s infinite; }
            `}</style>
        </AuthenticatedLayout>
    );
}