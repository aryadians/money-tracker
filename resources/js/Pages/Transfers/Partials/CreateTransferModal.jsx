import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { useEffect } from 'react';

export default function CreateTransferModal({ show, onClose, wallets }) {

    const { data, setData, post, processing, reset, errors, clearErrors } = useForm({
        from_wallet_id: '',
        to_wallet_id: '',
        amount: '',
        date: new Date().toISOString().split('T')[0],
        description: '',
    });

    useEffect(() => {
        if (!show) {
            reset();
            clearErrors();
        }
    }, [show]);

    const submit = (e) => {
        e.preventDefault();
        post(route('transfers.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    // Filter agar dompet tujuan != dompet asal
    const targetWallets = wallets.filter(w => w.id !== parseInt(data.from_wallet_id));

    // Format tampilan uang di dropdown
    const formatMoney = (n) => new Intl.NumberFormat('id-ID').format(n);

    return (
        <Modal show={show} onClose={onClose}>
            <div className="bg-gray-900 text-white border border-white/10 rounded-2xl overflow-hidden shadow-2xl">

                {/* Header dengan Gradient */}
                <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 border-b border-white/5 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <span className="text-2xl">🔄</span> Pindah Buku
                        </h2>
                        <p className="text-xs text-gray-400 mt-1">Transfer saldo antar dompet Anda</p>
                    </div>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition">✕</button>
                </div>

                <form onSubmit={submit} className="p-6 space-y-6">

                    {/* INPUT NOMINAL (BIG HERO INPUT) */}
                    <div className="relative group">
                        <label className="text-xs font-bold text-orange-400 uppercase tracking-widest mb-2 block">Nominal Transfer</label>
                        <div className="relative flex items-center">
                            <span className="absolute left-4 text-gray-500 text-2xl font-bold group-focus-within:text-orange-500 transition-colors">Rp</span>
                            <input
                                type="number"
                                value={data.amount}
                                onChange={(e) => setData('amount', e.target.value)}
                                className="w-full pl-14 pr-4 py-4 bg-gray-950/50 border-2 border-gray-700 rounded-2xl text-4xl font-bold text-white placeholder-gray-700 focus:border-orange-500 focus:ring-0 outline-none transition-all"
                                placeholder="0"
                                autoFocus
                            />
                        </div>
                        {errors.amount && <p className="text-red-500 text-sm mt-1 flex items-center gap-1">⚠️ {errors.amount}</p>}
                    </div>

                    {/* AREA TRANSFER (FROM -> TO) */}
                    <div className="bg-gray-800/50 p-4 rounded-2xl border border-white/5 relative">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">

                            {/* DARI */}
                            <div>
                                <InputLabel value="Dari Dompet" className="text-xs text-gray-400 mb-1.5" />
                                <div className="relative">
                                    <select
                                        value={data.from_wallet_id}
                                        onChange={(e) => setData('from_wallet_id', e.target.value)}
                                        className="w-full bg-gray-900 border-gray-600 text-white text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-3 pr-8 cursor-pointer hover:bg-gray-800 transition"
                                    >
                                        <option value="" disabled>Pilih Sumber</option>
                                        {wallets.map((wallet) => (
                                            <option key={wallet.id} value={wallet.id}>
                                                {wallet.name} (Rp {formatMoney(wallet.balance)})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.from_wallet_id && <p className="text-red-500 text-xs mt-1">{errors.from_wallet_id}</p>}
                            </div>

                            {/* ICON PANAH (Absolute di tengah desktop, hidden di mobile) */}
                            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gray-700 rounded-full items-center justify-center border-2 border-gray-800 z-10">
                                <span className="text-gray-300 text-xs">➝</span>
                            </div>

                            {/* KE */}
                            <div>
                                <InputLabel value="Ke Dompet" className="text-xs text-gray-400 mb-1.5" />
                                <div className="relative">
                                    <select
                                        value={data.to_wallet_id}
                                        onChange={(e) => setData('to_wallet_id', e.target.value)}
                                        className="w-full bg-gray-900 border-gray-600 text-white text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-3 cursor-pointer hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                        disabled={!data.from_wallet_id}
                                    >
                                        <option value="" disabled>Pilih Tujuan</option>
                                        {targetWallets.map((wallet) => (
                                            <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
                                        ))}
                                    </select>
                                </div>
                                {errors.to_wallet_id && <p className="text-red-500 text-xs mt-1">{errors.to_wallet_id}</p>}
                            </div>
                        </div>
                    </div>

                    {/* FOOTER INPUTS (Tanggal & Catatan) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="sm:col-span-1">
                            <InputLabel value="Tanggal" className="text-xs text-gray-400 mb-1" />
                            <TextInput
                                type="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                className="w-full bg-gray-900 border-gray-700 text-sm rounded-xl py-2.5 text-white focus:border-orange-500 focus:ring-orange-500"
                            />
                        </div>
                        <div className="sm:col-span-2">
                            <InputLabel value="Catatan (Opsional)" className="text-xs text-gray-400 mb-1" />
                            <TextInput
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full bg-gray-900 border-gray-700 text-sm rounded-xl py-2.5 text-white placeholder-gray-600 focus:border-orange-500 focus:ring-orange-500"
                                placeholder="Contoh: Topup E-Wallet"
                            />
                        </div>
                    </div>

                    <button
                        disabled={processing}
                        className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl font-bold text-white text-lg shadow-lg shadow-orange-500/20 transition-all transform active:scale-[0.98] flex justify-center items-center gap-2 mt-4"
                    >
                        {processing ? 'Memproses...' : '🚀 Konfirmasi Transfer'}
                    </button>
                </form>
            </div>
        </Modal>
    );
}