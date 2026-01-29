import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { useEffect, useRef } from 'react';

export default function CreateBudgetModal({ show, onClose, categories }) {
    const inputRef = useRef(null);
    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        category_id: '',
        amount: '',
    });

    useEffect(() => {
        if (show) {
            // Auto focus ke input nominal saat modal terbuka
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            reset();
            clearErrors();
        }
    }, [show]);

    const submit = (e) => {
        e.preventDefault();
        post(route('budgets.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    // Format tampilan angka saat mengetik
    const displayAmount = data.amount ? new Intl.NumberFormat('id-ID').format(data.amount) : '';

    const handleAmountChange = (e) => {
        // Hapus karakter non-digit agar bisa disimpan sebagai number
        const value = e.target.value.replace(/\./g, '');
        if (!isNaN(value)) {
            setData('amount', value);
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="bg-[#0B0F19] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative">

                {/* Background Glow Effect */}
                <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/30 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Header */}
                <div className="relative z-10 flex justify-between items-center p-6 pb-2">
                    <h2 className="text-lg font-bold text-gray-200">Buat Anggaran Baru</h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition text-gray-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={submit} className="relative z-10 p-6 pt-2 space-y-8">

                    {/* INPUT NOMINAL (HERO STYLE) */}
                    <div className="flex flex-col items-center justify-center py-6">
                        <label className="text-xs text-purple-400 font-bold tracking-widest uppercase mb-2">Batas Maksimal</label>

                        <div className="relative flex items-baseline justify-center w-full group">
                            <span className="text-3xl font-medium text-gray-500 mr-2 group-focus-within:text-purple-500 transition-colors">Rp</span>

                            {/* Fake Input untuk Tampilan Formatted */}
                            <input
                                ref={inputRef}
                                type="text"
                                value={displayAmount}
                                onChange={handleAmountChange}
                                className="w-full bg-transparent border-none text-center text-5xl md:text-6xl font-bold text-white placeholder-gray-700 focus:ring-0 p-0 caret-purple-500"
                                placeholder="0"
                            />
                        </div>
                        {errors.amount && <p className="text-red-500 text-sm mt-2 animate-bounce">{errors.amount}</p>}
                    </div>

                    {/* SELECT KATEGORI (CARD STYLE) */}
                    <div className="bg-[#131926] p-1 rounded-2xl border border-white/10">
                        <div className="relative">
                            <select
                                value={data.category_id}
                                onChange={(e) => setData('category_id', e.target.value)}
                                className="w-full bg-transparent border-none text-white text-sm rounded-xl focus:ring-0 block p-4 pl-12 cursor-pointer appearance-none hover:bg-white/5 transition-colors"
                            >
                                <option value="" disabled>Pilih Kategori Pengeluaran...</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id} className="bg-gray-900 text-white">
                                        {cat.name}
                                    </option>
                                ))}
                            </select>

                            {/* Icon Kategori di Kiri */}
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-lg pointer-events-none">
                                {data.category_id
                                    ? categories.find(c => c.id == data.category_id)?.icon_name
                                    : '📂'}
                            </div>

                            {/* Icon Panah di Kanan */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                                ▼
                            </div>
                        </div>
                    </div>
                    {errors.category_id && <p className="text-red-500 text-xs ml-2">{errors.category_id}</p>}

                    {/* SUBMIT BUTTON */}
                    <button
                        disabled={processing}
                        className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-2xl font-bold text-white text-lg shadow-lg shadow-purple-500/25 transition-all transform active:scale-[0.98] flex justify-center items-center gap-2"
                    >
                        {processing ? 'Menyimpan...' : 'Simpan Target 🎯'}
                    </button>
                </form>
            </div>
        </Modal>
    );
}