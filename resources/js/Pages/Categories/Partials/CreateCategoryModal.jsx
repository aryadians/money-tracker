import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { CATEGORY_ICONS } from '@/Constants/Icons'; // Import ikon 🍔 ⛽

export default function CreateCategoryModal({ show, onClose }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        type: 'expense',
        icon: '🍔', // Default icon
    });

    const submit = (e) => {
        e.preventDefault();
        // Pastikan route ini nanti kita buat
        post(route('categories.store'), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <div className="p-6 bg-gray-900 text-white border border-white/10">
                <h2 className="text-xl font-bold mb-6 text-white">Tambah Kategori Baru</h2>

                <form onSubmit={submit} className="space-y-6">

                    {/* Pilihan Tipe (Pemasukan / Pengeluaran) */}
                    <div className="flex bg-gray-800 p-1 rounded-xl">
                        <button
                            type="button"
                            onClick={() => setData('type', 'expense')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${data.type === 'expense' ? 'bg-red-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Pengeluaran 💸
                        </button>
                        <button
                            type="button"
                            onClick={() => setData('type', 'income')}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${data.type === 'income' ? 'bg-green-500 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Pemasukan 💰
                        </button>
                    </div>

                    {/* Input Nama */}
                    <div>
                        <InputLabel htmlFor="cat_name" value="Nama Kategori" />
                        <TextInput
                            id="cat_name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full bg-gray-800 border-gray-600"
                            placeholder={data.type === 'expense' ? "Contoh: Bensin Pertamax" : "Contoh: Bonus Tahunan"}
                        />
                    </div>

                    {/* GRID ICON (Bagian Penting!) */}
                    <div>
                        <InputLabel value="Pilih Ikon" className="mb-3" />
                        <div className="grid grid-cols-5 gap-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {CATEGORY_ICONS.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        setData('icon', item.icon);
                                        // Auto-fill nama jika masih kosong
                                        if (data.name === '') setData('name', item.label);
                                    }}
                                    className={`aspect-square flex flex-col items-center justify-center rounded-xl cursor-pointer transition-all border ${data.icon === item.icon
                                            ? 'bg-blue-600/20 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] scale-110'
                                            : 'bg-gray-800 border-transparent hover:bg-gray-700'
                                        }`}
                                >
                                    <span className="text-2xl drop-shadow-md">{item.icon}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tombol Simpan */}
                    <div className="mt-6 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-700 rounded-xl hover:bg-gray-600">
                            Batal
                        </button>
                        <button disabled={processing} className="px-5 py-2 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 shadow-lg">
                            Simpan Kategori
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}