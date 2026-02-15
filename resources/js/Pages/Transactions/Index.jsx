import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import CreateTransactionModal from '@/Pages/Transactions/Partials/CreateTransactionModal';

export default function Index({ auth, transactions, filters, wallets, categories }) {

    const [showModal, setShowModal] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState(null);

    const importForm = useForm({ wallet_id: '', file: null });

    const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

    const handleSearch = (e) => {
        router.get(route('transactions.index'), { search: e.target.value }, { preserveState: true, replace: true });
    };

    const handleMonthChange = (e) => {
        router.get(route('transactions.index'), { month: e.target.value, year: filters.year }, { preserveState: true });
    };

    return (
        <AuthenticatedLayout header={null}>
            <Head title="Riwayat Transaksi" />
            <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden pb-20">
                
                {/* --- BACKGROUND DECORATION --- */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none opacity-20">
                    <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse delay-700"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                        <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">Riwayat Transaksi</h1>
                        
                        <div className="flex items-center gap-3 flex-wrap justify-center">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-xs">🔍</span>
                                <input type="text" placeholder="Cari..." defaultValue={filters.search} onBlur={handleSearch} className="bg-gray-800 border-gray-700 rounded-xl pl-8 text-sm focus:ring-blue-500" />
                            </div>

                            <select value={filters.month} onChange={handleMonthChange} className="bg-gray-800 border-gray-700 text-white text-sm rounded-xl">
                                <option value="01">Januari</option><option value="02">Februari</option><option value="03">Maret</option><option value="04">April</option>
                                <option value="05">Mei</option><option value="06">Juni</option><option value="07">Juli</option><option value="08">Agustus</option>
                                <option value="09">September</option><option value="10">Oktober</option><option value="11">November</option><option value="12">Desember</option>
                            </select>

                            <a href={route('transactions.export', { month: filters.month, year: filters.year })} className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded-xl text-xs font-bold transition">📊 Excel</a>
                            <a href={route('transactions.pdf', { month: filters.month, year: filters.year })} className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-xl text-xs font-bold transition">📄 PDF</a>
                            <button onClick={() => setShowImportModal(true)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-xs font-bold transition">📥 Impor</button>
                        </div>
                    </div>

                    <div className="bg-gray-800/40 backdrop-blur-md rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
                        {transactions.data.length > 0 ? (
                            <div className="divide-y divide-white/5">
                                {transactions.data.map((trx) => (
                                    <div key={trx.id} className="p-5 flex flex-col sm:flex-row items-center justify-between hover:bg-white/5 transition-colors group gap-4">
                                        <div className="flex items-center gap-4 w-full sm:w-auto">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border border-white/5 ${trx.type === 'expense' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                                                {trx.category?.icon_name || (trx.type === 'expense' ? '💸' : '💰')}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">{trx.category?.name || 'Tanpa Kategori'}</h4>
                                                <p className="text-xs text-gray-500">{formatDate(trx.transaction_date)} • {trx.wallet?.name}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                            <div className="text-right">
                                                <p className={`text-lg font-bold ${trx.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
                                                    {trx.type === 'expense' ? '-' : '+'} {formatRupiah(trx.amount)}
                                                </p>
                                                {trx.description && <p className="text-[10px] text-gray-600 italic">"{trx.description}"</p>}
                                            </div>
                                            <div className="flex gap-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => { setEditingTransaction(trx); setShowModal(true); }} className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-blue-600 flex items-center justify-center transition">✏️</button>
                                                <button onClick={() => { if(confirm('Hapus?')) router.delete(route('transactions.destroy', trx.id)); }} className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-red-600 flex items-center justify-center transition">🗑️</button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="p-20 text-center flex flex-col items-center opacity-40">
                                <span className="text-6xl mb-4">📭</span>
                                <p className="text-xl font-bold">Tidak ada transaksi bulan ini</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 flex justify-center gap-2">
                        {transactions.links.map((link, key) => (
                            link.url ? (
                                <Link key={key} href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} className={`px-4 py-2 text-xs rounded-lg border transition ${link.active ? 'bg-blue-600 border-blue-600 text-white' : 'bg-gray-800 border-gray-700 text-gray-400 hover:bg-gray-700'}`} />
                            ) : (
                                <span key={key} dangerouslySetInnerHTML={{ __html: link.label }} className="px-4 py-2 text-xs rounded-lg border border-gray-800 text-gray-600 bg-gray-900/50" />
                            )
                        ))}
                    </div>
                </div>
            </div>

            <CreateTransactionModal show={showModal} onClose={() => { setShowModal(false); setEditingTransaction(null); }} wallets={wallets} categories={categories} transactionToEdit={editingTransaction} />
            
            <Modal show={showImportModal} onClose={() => setShowImportModal(false)}>
                <form className="p-8 bg-gray-800 text-white rounded-3xl" onSubmit={(e) => { e.preventDefault(); importForm.post(route('transactions.import'), { onSuccess: () => setShowImportModal(false) }); }}>
                    <h2 className="text-2xl font-bold mb-2">Impor Transaksi</h2>
                    <p className="text-xs text-gray-400 mb-6">Unggah file CSV mutasi bank Anda.</p>
                    <InputLabel value="Dompet Tujuan" className="mb-2" />
                    <select className="w-full bg-gray-900 border-gray-700 rounded-xl mb-4 text-white" value={importForm.data.wallet_id} onChange={e => importForm.setData('wallet_id', e.target.value)} required>
                        <option value="">Pilih Dompet...</option>
                        {wallets.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                    </select>
                    <input type="file" accept=".csv" onChange={e => importForm.setData('file', e.target.files[0])} className="block w-full text-sm mb-8" required />
                    <div className="flex justify-end gap-3">
                        <SecondaryButton onClick={() => setShowImportModal(false)}>Batal</SecondaryButton>
                        <PrimaryButton disabled={importForm.processing}>Mulai Impor</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}
