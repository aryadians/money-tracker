import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { WALLET_PRESETS } from '@/Constants/Icons'; // <--- Import Data Tadi

export default function CreateWalletModal({ show, onClose }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        type: 'bank',
        balance: '',
        color_hex: '#3B82F6',
    });

    // Fungsi saat Preset dipilih (Otomatis isi Nama, Tipe, Warna)
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
        post(route('wallets.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6 bg-gray-900 text-white border border-white/10">
                <h2 className="text-xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Tambah Dompet Baru
                </h2>

                <form onSubmit={submit} className="space-y-5">

                    {/* --- BAGIAN PRESET (LOGO BANK/E-WALLET) --- */}
                    <div>
                        <InputLabel value="Pilih Provider Populer (Otomatis)" className="mb-3 text-gray-400" />
                        <div className="flex flex-wrap gap-3">
                            {WALLET_PRESETS.map((preset) => (
                                <div
                                    key={preset.name}
                                    onClick={() => selectPreset(preset)}
                                    className={`cursor-pointer px-4 py-2 rounded-xl flex items-center gap-2 border transition-all transform hover:scale-105 ${data.name === preset.name
                                            ? 'border-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.3)]'
                                            : 'border-gray-700 bg-gray-800 hover:border-gray-500'
                                        }`}
                                >
                                    <span className="text-lg">{preset.icon}</span>
                                    <span className="text-sm font-medium">{preset.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-gray-700 my-4"></div>

                    {/* Input Nama Manual */}
                    <div>
                        <InputLabel htmlFor="name" value="Nama Dompet (Custom)" />
                        <TextInput
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full bg-gray-800 border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                            placeholder="Contoh: Tabungan Nikah"
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* Input Saldo & Warna */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="balance" value="Saldo Awal" />
                            <TextInput
                                id="balance"
                                type="number"
                                value={data.balance}
                                onChange={(e) => setData('balance', e.target.value)}
                                className="mt-1 block w-full bg-gray-800 border-gray-600"
                                placeholder="0"
                            />
                        </div>
                        <div>
                            <InputLabel value="Warna Kartu" />
                            <div className="flex items-center gap-2 mt-2 h-[42px] px-3 bg-gray-800 rounded-xl border border-gray-600">
                                <input
                                    type="color"
                                    value={data.color_hex}
                                    onChange={(e) => setData('color_hex', e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer bg-transparent border-none p-0"
                                />
                                <span className="text-sm text-gray-400">{data.color_hex}</span>
                            </div>
                        </div>
                    </div>

                    {/* Tombol Aksi */}
                    <div className="mt-6 flex justify-end gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 bg-gray-800 text-gray-300 rounded-xl hover:bg-gray-700 transition font-medium"
                        >
                            Batal
                        </button>
                        <button
                            disabled={processing}
                            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-bold text-white shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all"
                        >
                            Simpan Dompet
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}