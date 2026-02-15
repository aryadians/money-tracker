import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';

function Index({ auth, recurring, wallets, categories }) {
    const [showModal, setShowModal] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        wallet_id: '',
        category_id: '',
        amount: '',
        type: 'expense',
        frequency: 'monthly',
        start_date: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('recurring.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    const toggleStatus = (id) => {
        router.patch(route('recurring.update', id));
    };

    const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

    return (
        <>
            <Head title="Transaksi Berulang" />
            <div className="py-12 bg-gray-900 min-h-screen text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold">Transaksi Berulang</h2>
                            <p className="text-gray-400 mt-1">Otomatisasi tagihan & langganan rutinmu 🔄</p>
                        </div>
                        <PrimaryButton onClick={() => setShowModal(true)}>+ Atur Otomatis</PrimaryButton>
                    </div>

                    <div className="bg-gray-800 rounded-3xl border border-white/5 overflow-hidden shadow-2xl">
                        {recurring.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-white/5 bg-white/[0.02]">
                                            <th className="p-5 text-xs font-bold uppercase tracking-widest text-gray-500">Nama / Catatan</th>
                                            <th className="p-5 text-xs font-bold uppercase tracking-widest text-gray-500">Jumlah</th>
                                            <th className="p-5 text-xs font-bold uppercase tracking-widest text-gray-500">Frekuensi</th>
                                            <th className="p-5 text-xs font-bold uppercase tracking-widest text-gray-500">Jadwal Berikutnya</th>
                                            <th className="p-5 text-xs font-bold uppercase tracking-widest text-gray-500">Status</th>
                                            <th className="p-5 text-xs font-bold uppercase tracking-widest text-gray-500 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {recurring.map((item) => (
                                            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="p-5">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-xl">
                                                            {item.category?.icon_name || '🔄'}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold">{item.description || item.category?.name}</p>
                                                            <p className="text-[10px] text-gray-500 font-bold uppercase">{item.wallet?.name}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-5">
                                                    <p className={`font-bold ${item.type === 'expense' ? 'text-red-400' : 'text-green-400'}`}>
                                                        {item.type === 'expense' ? '-' : '+'} {formatRupiah(item.amount)}
                                                    </p>
                                                </td>
                                                <td className="p-5">
                                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase rounded-full border border-blue-500/20">
                                                        {item.frequency}
                                                    </span>
                                                </td>
                                                <td className="p-5 text-sm text-gray-400 font-mono">
                                                    {item.next_run_date || 'N/A'}
                                                </td>
                                                <td className="p-5">
                                                    <button 
                                                        onClick={() => toggleStatus(item.id)}
                                                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-all ${item.is_active ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-700 text-gray-500 border border-white/5'}`}
                                                    >
                                                        {item.is_active ? 'Aktif' : 'Berhenti'}
                                                    </button>
                                                </td>
                                                <td className="p-5 text-right">
                                                    <button 
                                                        onClick={() => router.delete(route('recurring.destroy', item.id))}
                                                        className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-red-600 text-white flex items-center justify-center transition ml-auto"
                                                    >
                                                        🗑️
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="p-20 text-center flex flex-col items-center opacity-40">
                                <span className="text-6xl mb-4 grayscale">🔄</span>
                                <p className="text-xl font-bold">Belum ada transaksi berulang</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Create */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <form onSubmit={submit} className="p-8 bg-gray-800 text-white rounded-3xl">
                    <h2 className="text-2xl font-bold mb-6">Atur Transaksi Berulang</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <InputLabel value="Jumlah Uang" className="text-gray-400 mb-2" />
                            <TextInput 
                                type="number"
                                className="w-full bg-gray-900 border-gray-700 rounded-xl text-xl font-bold" 
                                value={data.amount}
                                onChange={e => setData('amount', e.target.value)}
                            />
                            <InputError message={errors.amount} />
                        </div>

                        <div>
                            <InputLabel value="Dompet Asal" className="text-gray-400 mb-2" />
                            <select 
                                className="w-full bg-gray-900 border-gray-700 rounded-xl text-white"
                                value={data.wallet_id}
                                onChange={e => setData('wallet_id', e.target.value)}
                            >
                                <option value="">Pilih Dompet</option>
                                {wallets.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
                            </select>
                            <InputError message={errors.wallet_id} />
                        </div>

                        <div>
                            <InputLabel value="Kategori" className="text-gray-400 mb-2" />
                            <select 
                                className="w-full bg-gray-900 border-gray-700 rounded-xl text-white"
                                value={data.category_id}
                                onChange={e => setData('category_id', e.target.value)}
                            >
                                <option value="">Pilih Kategori</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                            <InputError message={errors.category_id} />
                        </div>

                        <div>
                            <InputLabel value="Frekuensi" className="text-gray-400 mb-2" />
                            <select 
                                className="w-full bg-gray-900 border-gray-700 rounded-xl text-white"
                                value={data.frequency}
                                onChange={e => setData('frequency', e.target.value)}
                            >
                                <option value="daily">Harian</option>
                                <option value="weekly">Mingguan</option>
                                <option value="monthly">Bulanan</option>
                                <option value="yearly">Tahunan</option>
                            </select>
                        </div>

                        <div>
                            <InputLabel value="Mulai Tanggal" className="text-gray-400 mb-2" />
                            <TextInput 
                                type="date"
                                className="w-full bg-gray-900 border-gray-700 rounded-xl" 
                                value={data.start_date}
                                onChange={e => setData('start_date', e.target.value)}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <InputLabel value="Keterangan (Misal: Tagihan Netflix)" className="text-gray-400 mb-2" />
                            <TextInput 
                                className="w-full bg-gray-900 border-gray-700 rounded-xl" 
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setShowModal(false)} className="rounded-xl">Batal</SecondaryButton>
                        <PrimaryButton disabled={processing} className="rounded-xl px-8">Simpan Jadwal</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

Index.layout = page => <AuthenticatedLayout header={null}>{page}</AuthenticatedLayout>;

export default Index;
