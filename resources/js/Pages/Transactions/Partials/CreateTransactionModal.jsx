import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useState } from 'react';

export default function CreateTransactionModal({ show, onClose, wallets, categories }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        wallet_id: '',
        category_id: '',
        amount: '',
        date: new Date().toISOString().split('T')[0], // Hari ini
        type: 'expense', // Default pengeluaran
        notes: '',
        receipt: null,
    });

    const [previewImage, setPreviewImage] = useState(null);

    // Filter kategori berdasarkan tipe (Income/Expense)
    const filteredCategories = categories.filter(c => c.type === data.type);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('receipt', file);
        if (file) {
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('transactions.store'), {
            onSuccess: () => {
                reset();
                setPreviewImage(null);
                onClose();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6 bg-gray-900 text-white border border-white/10 max-h-[90vh] overflow-y-auto custom-scrollbar">

                {/* Header Switch (Expense vs Income) */}
                <div className="flex bg-gray-800 p-1 rounded-xl mb-6">
                    <button
                        type="button"
                        onClick={() => setData('type', 'expense')}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${data.type === 'expense' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Pengeluaran 💸
                    </button>
                    <button
                        type="button"
                        onClick={() => setData('type', 'income')}
                        className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${data.type === 'income' ? 'bg-green-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                            }`}
                    >
                        Pemasukan 💰
                    </button>
                </div>

                <form onSubmit={submit} className="space-y-5">

                    {/* Input Nominal */}
                    <div>
                        <InputLabel value="Nominal (Rp)" />
                        <TextInput
                            type="number"
                            value={data.amount}
                            onChange={(e) => setData('amount', e.target.value)}
                            className="mt-1 block w-full text-2xl font-bold text-center bg-gray-800 border-gray-600 focus:ring-blue-500"
                            placeholder="0"
                            autoFocus
                        />
                    </div>

                    {/* Pilih Dompet */}
                    <div>
                        <InputLabel value="Pakai Dompet Mana?" />
                        <div className="grid grid-cols-2 gap-2 mt-1">
                            {wallets.map((wallet) => (
                                <div
                                    key={wallet.id}
                                    onClick={() => setData('wallet_id', wallet.id)}
                                    className={`cursor-pointer p-3 rounded-xl border flex items-center justify-between transition-all ${data.wallet_id === wallet.id
                                            ? 'border-blue-500 bg-blue-500/20'
                                            : 'border-gray-700 bg-gray-800 opacity-60 hover:opacity-100'
                                        }`}
                                >
                                    <span className="font-medium truncate">{wallet.name}</span>
                                    {data.wallet_id === wallet.id && <span className="text-blue-400">✓</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pilih Kategori (Grid Icon) */}
                    <div>
                        <InputLabel value="Untuk Apa?" />
                        <div className="grid grid-cols-4 gap-3 mt-1 max-h-40 overflow-y-auto pr-1">
                            {filteredCategories.length > 0 ? filteredCategories.map((cat) => (
                                <div
                                    key={cat.id}
                                    onClick={() => setData('category_id', cat.id)}
                                    className={`flex flex-col items-center justify-center p-2 rounded-xl border cursor-pointer transition-all ${data.category_id === cat.id
                                            ? 'border-yellow-500 bg-yellow-500/20 scale-105'
                                            : 'border-gray-700 bg-gray-800 hover:bg-gray-700'
                                        }`}
                                >
                                    <span className="text-2xl">{cat.icon_name || '📁'}</span>
                                    <span className="text-[10px] text-center mt-1 truncate w-full">{cat.name}</span>
                                </div>
                            )) : (
                                <p className="col-span-4 text-center text-xs text-gray-500 py-4">
                                    Belum ada kategori {data.type === 'expense' ? 'pengeluaran' : 'pemasukan'}.
                                    <br />Buat di menu Kategori dulu.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Tanggal & Catatan */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel value="Tanggal" />
                            <TextInput
                                type="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                className="mt-1 w-full bg-gray-800 border-gray-600 text-sm"
                            />
                        </div>
                        <div>
                            <InputLabel value="Upload Struk" />
                            <label className="mt-1 flex items-center justify-center px-4 py-2 bg-gray-800 border border-gray-600 rounded-xl cursor-pointer hover:bg-gray-700 transition">
                                <span className="text-xs text-gray-300">
                                    {previewImage ? 'Ganti Foto' : 'Pilih Foto 📸'}
                                </span>
                                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                            </label>
                        </div>
                    </div>

                    {/* Preview Struk */}
                    {previewImage && (
                        <div className="relative rounded-lg overflow-hidden border border-gray-600">
                            <img src={previewImage} alt="Struk" className="w-full h-32 object-cover" />
                            <button
                                type="button"
                                onClick={() => { setPreviewImage(null); setData('receipt', null); }}
                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-xs"
                            >✕</button>
                        </div>
                    )}

                    <div>
                        <InputLabel value="Catatan (Opsional)" />
                        <TextInput
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            className="mt-1 w-full bg-gray-800 border-gray-600 text-sm"
                            placeholder="Makan siang bareng tim..."
                        />
                    </div>

                    {/* Tombol Simpan */}
                    <div className="mt-6 flex justify-end gap-3 pt-2">
                        <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-700 rounded-xl hover:bg-gray-600">
                            Batal
                        </button>
                        <button disabled={processing} className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-white shadow-lg hover:shadow-green-500/30">
                            Simpan Transaksi
                        </button>
                    </div>

                </form>
            </div>
        </Modal>
    );
}