import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, wallets, totalBalance, error }) {

    // --- 1. LOGIC & SAFETY CHECK ---
    // Kita pastikan 'wallets' adalah array. Jika null/error, kita ganti jadi array kosong []
    // Ini mencegah error "map is not a function" yang bikin layar putih.
    const safeWallets = Array.isArray(wallets) ? wallets : [];

    // Fungsi untuk memformat angka menjadi format Rupiah (Contoh: 15000 -> Rp 15.000)
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    };

    // --- 2. TAMPILAN (JSX) ---
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">

                    {/* A. ERROR MESSAGE (Hanya muncul jika ada error dari backend) */}
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
                            <p className="font-bold">Gagal Memuat Data</p>
                            <p>{error}</p>
                        </div>
                    )}

                    {/* B. TOTAL SALDO CARD */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6 text-gray-900">
                            <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Kekayaan Bersih</h3>
                            <div className="flex items-center mt-2">
                                <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                                    {formatRupiah(totalBalance || 0)}
                                </span>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">Akumulasi dari semua dompet aktif</p>
                        </div>
                    </div>

                    {/* C. LIST DOMPET (GRID) */}
                    <div className="flex justify-between items-center mb-6 px-2">
                        <h3 className="text-lg font-semibold text-gray-700">Dompet Saya</h3>
                        {/* Tombol tambah (Nanti kita fungsikan) */}
                        <button className="text-sm bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition">
                            + Tambah Dompet
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {/* Cek: Jika dompet kosong, tampilkan pesan */}
                        {safeWallets.length === 0 ? (
                            <div className="col-span-full p-8 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                                <p className="text-gray-500 mb-2">Belum ada dompet yang dibuat.</p>
                                <p className="text-sm text-gray-400">Jalankan Seeder database atau buat manual.</p>
                            </div>
                        ) : (
                            // Loop data dompet
                            safeWallets.map((wallet) => (
                                <div
                                    key={wallet.id}
                                    className="relative overflow-hidden rounded-2xl shadow-lg p-6 text-white transition-all transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                                    style={{
                                        backgroundColor: wallet.color_hex || '#1F2937', // Default warna gelap jika null
                                        background: `linear-gradient(135deg, ${wallet.color_hex || '#333'}, #000000)` // Efek gradasi
                                    }}
                                >
                                    {/* Hiasan Latar Belakang (Lingkaran Transparan) */}
                                    <div className="absolute -top-6 -right-6 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                                    <div className="absolute top-1/2 -left-6 w-24 h-24 bg-white opacity-5 rounded-full blur-xl"></div>

                                    {/* Konten Kartu */}
                                    <div className="relative z-10 flex flex-col h-full justify-between min-h-[140px]">

                                        {/* Header Kartu */}
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-xs font-medium opacity-80 uppercase tracking-widest mb-1">
                                                    {wallet.type}
                                                </p>
                                                <h4 className="text-xl font-bold tracking-wide truncate pr-2">
                                                    {wallet.name}
                                                </h4>
                                            </div>
                                            {/* Icon Sederhana berdasarkan tipe */}
                                            <div className="bg-white bg-opacity-20 p-2 rounded-lg backdrop-blur-sm">
                                                <span className="text-xl">
                                                    {wallet.type === 'cash' ? '💵' :
                                                        wallet.type === 'bank' ? '🏦' :
                                                            wallet.type === 'ewallet' ? '📱' : '💳'}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Saldo Kartu */}
                                        <div className="mt-4">
                                            <p className="text-xs opacity-60 mb-1">Saldo Saat Ini</p>
                                            <p className="text-2xl font-bold font-mono tracking-tight">
                                                {formatRupiah(wallet.balance)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}