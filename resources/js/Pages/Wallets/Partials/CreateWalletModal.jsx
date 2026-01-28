import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { WALLET_PRESETS } from '@/Constants/Icons';
import { useEffect } from 'react';

// Terima prop 'walletToEdit'
export default function WalletModal({ show, onClose, walletToEdit = null }) {

    // Setup Form
    const { data, setData, post, patch, processing, reset, errors, clearErrors } = useForm({
        name: '',
        type: 'bank',
        balance: '',
        color_hex: '#3B82F6',
    });

    // PANTTAU PERUBAHAN: Jika walletToEdit berubah, isi form. Jika null, kosongkan.
    useEffect(() => {
        if (walletToEdit) {
            setData({
                name: walletToEdit.name,
                type: walletToEdit.type,
                balance: walletToEdit.balance,
                color_hex: walletToEdit.color_hex,
            });
        } else {
            reset();
        }
        clearErrors();
    }, [walletToEdit, show]);

    // Fungsi Pilih Preset
    const selectPreset = (preset) => {
        setData((prev) => ({
            ...prev,
            name: preset.name,
            type: preset.type,
            color_hex: preset.color
        }));
    };

    const submit = (e) => {
        e.preventDefault();
        if (walletToEdit) {
            // MODE EDIT
            patch(route('wallets.update', walletToEdit.id), {
                onSuccess: () => onClose(),
            });
        } else {
            // MODE BUAT BARU
            post(route('wallets.store'), {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            });
        }
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6 bg-gray-900 text-white border border-white/10 max-h-[90vh] overflow-y-auto custom-scrollbar">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        {walletToEdit ? 'Edit Dompet' : 'Tambah Dompet Baru'}
                    </h2>
                    <button onClick={onClose} className="text-gray-500 hover:text-white">✕</button>
                </div>

                <form onSubmit={submit} className="space-y-6">

                    {/* BAGIAN PRESET (Hanya muncul saat Buat Baru agar tidak mengganggu Edit) */}
                    {!walletToEdit && (
                        <div>
                            <InputLabel value="Pilih Provider (Otomatis)" className="mb-3 text-xs text-gray-400 uppercase tracking-wider" />
                            <div className="flex flex-wrap gap-2">
                                {WALLET_PRESETS.map((preset) => (
                                    <div
                                        key={preset.name}
                                        onClick={() => selectPreset(preset)}
                                        className={`cursor-pointer px-3 py-2 rounded-lg flex items-center gap-2 border transition-all transform hover:scale-105 ${data.name === preset.name
                                                ? 'border-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                                : 'border-gray-700 bg-gray-800 hover:border-gray-500'
                                            }`}
                                    >
                                        <span className="text-base">{preset.icon}</span>
                                        <span className="text-xs font-medium">{preset.name}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="border-t border-gray-800 my-5"></div>
                        </div>
                    )}

                    {/* INPUT NAMA */}
                    <div>
                        <InputLabel htmlFor="name" value="Nama Dompet" className="mb-1 text-gray-400" />
                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="w-full bg-gray-800 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Contoh: Tabungan Nikah"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* INPUT SALDO (MODEL BESAR CLEAN) */}
                    <div>
                        <InputLabel htmlFor="balance" value="Saldo Saat Ini" className="mb-1 text-gray-400" />
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-500 group-focus-within:text-blue-500 transition-colors">
                                Rp
                            </span>
                            <input
                                type="number"
                                value={data.balance}
                                onChange={(e) => setData('balance', e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-gray-800 rounded-xl text-3xl font-bold text-white placeholder-gray-700 border border-gray-700 focus:border-blue-500 focus:ring-0 transition-all outline-none appearance-none"
                                placeholder="0"
                            />
                        </div>
                        <InputError message={errors.balance} className="mt-2" />
                    </div>

                    {/* INPUT WARNA */}
                    <div>
                        <InputLabel value="Warna Kartu" className="mb-2 text-gray-400" />
                        <div className="flex flex-wrap gap-3">
                            {['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1', '#14B8A6'].map((color) => (
                                <div
                                    key={color}
                                    onClick={() => setData('color_hex', color)}
                                    className={`w-10 h-10 rounded-full cursor-pointer shadow-lg transition-transform hover:scale-110 flex items-center justify-center ${data.color_hex === color ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110' : ''
                                        }`}
                                    style={{ backgroundColor: color }}
                                >
                                    {data.color_hex === color && <span className="text-white text-xs">✓</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* TOMBOL AKSI */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 bg-gray-800 text-gray-400 rounded-xl hover:bg-gray-700 hover:text-white transition font-medium"
                        >
                            Batal
                        </button>
                        <button
                            disabled={processing}
                            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all"
                        >
                            {walletToEdit ? 'Update Perubahan' : 'Simpan Dompet'}
                        </button>
                    </div>
                </form>

                {/* CSS: Hilangkan Spinner Input Number */}
                <style>{`
                    input[type=number]::-webkit-inner-spin-button, 
                    input[type=number]::-webkit-outer-spin-button { 
                        -webkit-appearance: none; margin: 0; 
                    }
                `}</style>
            </div>
        </Modal>
    );
}