import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import { useEffect, useRef } from 'react';

export default function EditBudgetModal({ show, onClose, budget }) {
    const inputRef = useRef(null);
    
    // Inisialisasi form dengan data budget yang dipilih
    const { data, setData, put, processing, reset, errors, clearErrors } = useForm({
        amount: '',
    });

    useEffect(() => {
        if (show && budget) {
            // Isi form dengan nominal lama (hapus desimal .00 jika ada)
            setData('amount', parseInt(budget.limit).toString());
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            reset();
            clearErrors();
        }
    }, [show, budget]);

    const submit = (e) => {
        e.preventDefault();
        // Kirim request PUT ke route update
        put(route('budgets.update', budget.id), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const displayAmount = data.amount ? new Intl.NumberFormat('id-ID').format(data.amount) : '';

    const handleAmountChange = (e) => {
        const value = e.target.value.replace(/\./g, '');
        if (!isNaN(value)) {
            setData('amount', value);
        }
    };

    if (!budget) return null;

    return (
        <Modal show={show} onClose={onClose}>
            <div className="bg-[#0B0F19] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10 relative">
                
                {/* Background Glow */}
                <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/30 rounded-full blur-[100px] pointer-events-none"></div>

                {/* Header */}
                <div className="relative z-10 flex justify-between items-center p-6 pb-2">
                    <h2 className="text-lg font-bold text-gray-200">Ubah Target Anggaran</h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition text-gray-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={submit} className="relative z-10 p-6 pt-2 space-y-8">
                    
                    {/* INFO KATEGORI (READONLY) */}
                    <div className="flex items-center justify-center gap-2 bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-xl">{budget.category_icon}</span>
                        <span className="font-bold text-gray-300">{budget.category_name}</span>
                    </div>

                    {/* INPUT NOMINAL (HERO STYLE) */}
                    <div className="flex flex-col items-center justify-center py-4">
                        <label className="text-xs text-blue-400 font-bold tracking-widest uppercase mb-2">Batas Baru</label>
                        
                        <div className="relative flex items-baseline justify-center w-full group">
                            <span className="text-3xl font-medium text-gray-500 mr-2 group-focus-within:text-blue-500 transition-colors">Rp</span>
                            <input
                                ref={inputRef}
                                type="text"
                                value={displayAmount}
                                onChange={handleAmountChange}
                                className="w-full bg-transparent border-none text-center text-5xl md:text-6xl font-bold text-white placeholder-gray-700 focus:ring-0 p-0 caret-blue-500"
                                placeholder="0"
                            />
                        </div>
                        {errors.amount && <p className="text-red-500 text-sm mt-2 animate-bounce">{errors.amount}</p>}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button 
                        disabled={processing} 
                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-2xl font-bold text-white text-lg shadow-lg shadow-blue-500/25 transition-all transform active:scale-[0.98]"
                    >
                        {processing ? 'Menyimpan...' : 'Update Anggaran'}
                    </button>
                </form>
            </div>
        </Modal>
    );
}