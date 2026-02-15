import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useState, useEffect } from 'react';
import { createWorker } from 'tesseract.js';

// Tambah prop 'transactionToEdit'
export default function CreateTransactionModal({ show, onClose, wallets, categories, onCreateCategory, transactionToEdit = null }) {

    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        wallet_id: '',
        category_id: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        type: 'expense',
        notes: '',
        receipt: null,
        _method: 'POST', // Default POST
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [isScanning, setIsScanning] = useState(false);

    // Fungsi OCR Scan Struk
    const handleScanReceipt = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsScanning(true);
        setData('receipt', file);
        if (file) setPreviewImage(URL.createObjectURL(file));

        try {
            const worker = await createWorker('eng');
            const ret = await worker.recognize(file);
            const text = ret.data.text;
            
            // Regex sederhana untuk mencari Total Harga
            const numbers = text.match(/[\d,.]+/g);
            if (numbers) {
                const validNumbers = numbers
                    .map(n => parseFloat(n.replace(/[,.]/g, '')))
                    .filter(n => !isNaN(n) && n > 1000);

                if (validNumbers.length > 0) {
                    const maxAmount = Math.max(...validNumbers);
                    setData(d => ({ ...d, amount: maxAmount, notes: 'Auto-scan: ' + maxAmount }));
                    alert(`Struk terdeteksi! Total: ${maxAmount}`);
                } else {
                    alert('Gagal mendeteksi total harga otomatis.');
                }
            }
            await worker.terminate();
        } catch (err) {
            console.error(err);
            alert('Gagal memproses gambar struk.');
        } finally {
            setIsScanning(false);
        }
    };

    // Filter kategori sesuai tipe
    const filteredCategories = categories.filter(c => c.type === data.type);

    // --- EFFECT: ISI DATA SAAT EDIT ---
    useEffect(() => {
        if (transactionToEdit) {
            setData({
                wallet_id: transactionToEdit.wallet_id,
                category_id: transactionToEdit.category_id,
                amount: transactionToEdit.amount,
                date: transactionToEdit.transaction_date,
                type: transactionToEdit.type,
                notes: transactionToEdit.description || '',
                receipt: null, // Reset file input
                _method: 'PATCH', // Penting untuk Update dengan File
            });
            // Jika ada gambar lama, tampilkan (Opsional: Butuh URL lengkap dari backend)
            setPreviewImage(transactionToEdit.receipt_image ? `/storage/${transactionToEdit.receipt_image}` : null);
        } else {
            reset();
            setPreviewImage(null);
            setData('_method', 'POST');
        }
        clearErrors();
    }, [transactionToEdit, show]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('receipt', file);
        if (file) setPreviewImage(URL.createObjectURL(file));
    };

    const submit = (e) => {
        e.preventDefault();

        if (transactionToEdit) {
            // MODE EDIT (Gunakan POST dengan _method: PATCH agar file terkirim)
            post(route('transactions.update', transactionToEdit.id), {
                onSuccess: () => onClose(),
            });
        } else {
            // MODE CREATE
            post(route('transactions.store'), {
                onSuccess: () => {
                    reset();
                    setPreviewImage(null);
                    onClose();
                },
            });
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-5 bg-gray-900 text-white border border-white/10 max-h-[90vh] overflow-y-auto custom-scrollbar">

                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex bg-gray-800 p-1 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setData('type', 'expense')}
                            className={`px-4 py-1.5 text-xs font-bold uppercase rounded-md transition-all ${data.type === 'expense' ? 'bg-red-500 text-white' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Pengeluaran
                        </button>
                        <button
                            type="button"
                            onClick={() => setData('type', 'income')}
                            className={`px-4 py-1.5 text-xs font-bold uppercase rounded-md transition-all ${data.type === 'income' ? 'bg-green-500 text-white' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Pemasukan
                        </button>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white">✕</button>
                </div>

                {/* --- OCR SCAN BUTTON --- */}
                {!transactionToEdit && (
                    <label className={`block w-full mb-5 text-center p-3 border-2 border-dashed rounded-xl cursor-pointer transition-all ${isScanning ? 'border-blue-500 bg-blue-500/10' : 'border-gray-700 bg-gray-800 hover:border-gray-500'}`}>
                        {isScanning ? (
                            <span className="text-xs font-bold text-blue-400 animate-pulse">🤖 Sedang Membaca Struk...</span>
                        ) : (
                            <div className="flex flex-col items-center">
                                <span className="text-lg">📸</span>
                                <span className="text-[10px] text-gray-400 mt-1 font-bold uppercase tracking-wider">Scan Struk Otomatis (Beta)</span>
                            </div>
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={handleScanReceipt} disabled={isScanning} />
                    </label>
                )}

                <form onSubmit={submit} className="space-y-5">

                    {/* Input Nominal */}
                    <div>
                        <InputLabel value="Nominal" className="text-xs text-gray-400 mb-1" />
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-500">Rp</span>
                            <input
                                type="number"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-800 rounded-xl text-3xl font-bold text-white placeholder-gray-700 border border-gray-700 focus:border-blue-500 focus:ring-0 transition-all outline-none appearance-none"
                                placeholder="0"
                                autoFocus
                            />
                        </div>
                    </div>

                    {/* Pilih Dompet */}
                    <div>
                        <InputLabel value="Sumber Dana" className="text-xs text-gray-400 mb-1" />
                        <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar">
                            {wallets.map((wallet) => (
                                <div
                                    key={wallet.id}
                                    onClick={() => setData('wallet_id', wallet.id)}
                                    className={`flex-shrink-0 cursor-pointer px-3 py-2 rounded-lg border flex items-center gap-2 transition-all ${data.wallet_id === wallet.id
                                            ? 'border-blue-500 bg-blue-500/20'
                                            : 'border-gray-700 bg-gray-800 opacity-70 hover:opacity-100'
                                        }`}
                                >
                                    <div className="w-1.5 h-6 rounded-full" style={{ backgroundColor: wallet.color_hex }}></div>
                                    <span className="font-medium text-sm whitespace-nowrap">{wallet.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pilih Kategori */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <InputLabel value="Kategori" className="text-xs text-gray-400" />
                            <button type="button" onClick={onCreateCategory} className="text-xs text-blue-400 hover:text-blue-300 underline">+ Baru</button>
                        </div>

                        <div className="grid grid-cols-5 gap-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                            {filteredCategories.length > 0 ? filteredCategories.map((cat) => (
                                <div
                                    key={cat.id}
                                    onClick={() => setData('category_id', cat.id)}
                                    className={`flex flex-col items-center justify-center p-2 rounded-lg border cursor-pointer transition-all ${data.category_id === cat.id
                                            ? 'border-yellow-500 bg-yellow-500/10'
                                            : 'border-gray-700 bg-gray-800 hover:bg-gray-700'
                                        }`}
                                >
                                    <span className="text-xl mb-1">{cat.icon_name || '📁'}</span>
                                    <span className="text-[9px] text-center w-full truncate text-gray-400">{cat.name}</span>
                                </div>
                            )) : (
                                <div className="col-span-5 py-4 text-center border border-dashed border-gray-700 rounded-lg">
                                    <p className="text-xs text-gray-500">Belum ada kategori.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Input Tanggal & Foto */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <InputLabel value="Tanggal" className="text-xs text-gray-400 mb-1" />
                            <TextInput type="date" value={data.date} onChange={(e) => setData('date', e.target.value)} className="w-full bg-gray-800 border-gray-600 text-sm py-2" />
                        </div>
                        <div>
                            <InputLabel value="Foto Struk" className="text-xs text-gray-400 mb-1" />
                            <label className="flex items-center justify-center h-[38px] px-3 bg-gray-800 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-700 transition">
                                <span className="text-xs text-gray-300 truncate">{previewImage ? '📸 Ganti' : '📤 Upload'}</span>
                                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
                            </label>
                        </div>
                    </div>

                    {/* Preview Image */}
                    {previewImage && (
                        <div className="relative rounded-lg overflow-hidden h-24 bg-black">
                            <img src={previewImage} alt="Preview" className="w-full h-full object-contain" />
                            <button type="button" onClick={() => { setPreviewImage(null); setData('receipt', null); }} className="absolute top-1 right-1 bg-black/50 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">✕</button>
                        </div>
                    )}

                    <TextInput
                        value={data.notes}
                        onChange={(e) => setData('notes', e.target.value)}
                        className="w-full bg-gray-800 border-gray-600 text-sm"
                        placeholder="Catatan..."
                    />

                    <button disabled={processing} className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl font-bold text-white shadow-lg transition-transform active:scale-95">
                        {transactionToEdit ? 'Update Perubahan' : 'Simpan Transaksi'}
                    </button>
                </form>

                <style>{`
                    input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: #1f2937; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
                `}</style>
            </div>
        </Modal>
    );
}