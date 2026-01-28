import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, transactions, filters }) {

    // Helper: Format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(number);
    };

    // Helper: Format Tanggal
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    // Helper: Handle Ganti Bulan
    const handleMonthChange = (e) => {
        router.get(route('transactions.index'), {
            month: e.target.value,
            year: filters.year
        }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout user={auth.user} header={null}>
            <Head title="Riwayat Transaksi" />

            <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden pb-20">

                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                    {/* Header & Filter */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Riwayat Transaksi
                        </h1>

                        <div className="flex items-center gap-3">
                            {/* Filter Bulan */}
                            <select
                                value={filters.month}
                                onChange={handleMonthChange}
                                className="bg-gray-800 border border-gray-700 text-white text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-2.5 cursor-pointer"
                            >
                                <option value="01">Januari</option>
                                <option value="02">Februari</option>
                                <option value="03">Maret</option>
                                <option value="04">April</option>
                                <option value="05">Mei</option>
                                <option value="06">Juni</option>
                                <option value="07">Juli</option>
                                <option value="08">Agustus</option>
                                <option value="09">September</option>
                                <option value="10">Oktober</option>
                                <option value="11">November</option>
                                <option value="12">Desember</option>
                            </select>

                            {/* Tombol Kembali ke Dashboard */}
                            <Link
                                href={route('dashboard')}
                                className="px-4 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl text-sm font-medium transition border border-gray-700 text-gray-300"
                            >
                                ← Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Transaction List Container */}
                    <div className="bg-gray-800/40 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                        {transactions.data.length > 0 ? (
                            <div className="divide-y divide-gray-700/50">
                                {transactions.data.map((trx) => (
                                    <div
                                        key={trx.id}
                                        className="p-5 flex items-center justify-between hover:bg-white/5 transition-colors group cursor-pointer"
                                    >
                                        {/* Kiri: Icon & Info */}
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border border-white/5 shadow-inner ${trx.type === 'expense' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'
                                                }`}>
                                                {/* Icon Kategori atau Default */}
                                                {trx.category ? trx.category.icon_name : (trx.type === 'expense' ? '💸' : '💰')}
                                            </div>

                                            <div>
                                                <h4 className="font-bold text-white text-base">
                                                    {trx.category ? trx.category.name : 'Tanpa Kategori'}
                                                </h4>

                                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                                    <span className="font-mono">{formatDate(trx.transaction_date)}</span>
                                                    <span>•</span>
                                                    <span className="flex items-center gap-1">
                                                        <div
                                                            className="w-2 h-2 rounded-full"
                                                            style={{ backgroundColor: trx.wallet?.color_hex || '#ccc' }}
                                                        ></div>
                                                        {trx.wallet?.name || 'Dompet Dihapus'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Kanan: Nominal & Notes */}
                                        <div className="text-right">
                                            <p className={`text-lg font-bold tracking-wide ${trx.type === 'expense' ? 'text-red-400' : 'text-green-400'
                                                }`}>
                                                {trx.type === 'expense' ? '-' : '+'} {formatRupiah(trx.amount)}
                                            </p>

                                            {trx.description && (
                                                <p className="text-xs text-gray-500 max-w-[200px] truncate ml-auto italic mt-1">
                                                    "{trx.description}"
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Empty State */
                            <div className="p-20 text-center flex flex-col items-center justify-center">
                                <div className="text-6xl mb-4 bg-gray-800 rounded-full p-6 w-24 h-24 flex items-center justify-center">
                                    📭
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Belum ada transaksi</h3>
                                <p className="text-gray-400 text-sm">
                                    Tidak ada riwayat transaksi pada bulan {filters.month}/{filters.year}.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {transactions.data.length > 0 && (
                        <div className="mt-8 flex justify-center flex-wrap gap-2">
                            {transactions.links.map((link, key) => (
                                link.url ? (
                                    <Link
                                        key={key}
                                        href={link.url}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-4 py-2 text-sm rounded-lg border transition-colors ${link.active
                                                ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-lg shadow-blue-500/30'
                                                : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700 hover:text-white'
                                            }`}
                                    />
                                ) : (
                                    <span
                                        key={key}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className="px-4 py-2 text-sm rounded-lg border border-gray-800 text-gray-600 bg-gray-900/50 cursor-not-allowed opacity-50"
                                    />
                                )
                            ))}
                        </div>
                    )}

                </div>
            </div>

            {/* Global Style for Animations */}
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite; }
            `}</style>
        </AuthenticatedLayout>
    );
}