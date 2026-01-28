import { useForm } from '@inertiajs/react';
import Modal from '@/Components/Modal';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { CATEGORY_ICONS } from '@/Constants/Icons';

export default function CreateCategoryModal({ show, onClose }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        type: 'expense',
        icon: '📝', // Default icon
    });

    const submit = (e) => {
        e.preventDefault();
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
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold">Tambah Kategori</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
                </div>

                <form onSubmit={submit} className="space-y-5">

                    {/* Switch Type (Pengeluaran / Pemasukan) */}
                    <div className="flex bg-gray-800 p-1 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setData('type', 'expense')}
                            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${data.type === 'expense' ? 'bg-red-500 text-white shadow' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Pengeluaran
                        </button>
                        <button
                            type="button"
                            onClick={() => setData('type', 'income')}
                            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${data.type === 'income' ? 'bg-green-500 text-white shadow' : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Pemasukan
                        </button>
                    </div>

                    {/* Input Nama & Preview Icon */}
                    <div>
                        <InputLabel value="Nama Kategori" className="mb-1" />
                        <div className="flex gap-3">
                            {/* Kotak Preview Icon */}
                            <div className="w-12 h-11 flex items-center justify-center bg-gray-800 border border-gray-600 rounded-lg text-2xl animate-bounce-short">
                                {data.icon}
                            </div>
                            {/* Input Nama */}
                            <TextInput
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="block w-full bg-gray-800 border-gray-600 text-sm focus:border-blue-500 focus:ring-blue-500"
                                placeholder={data.type === 'expense' ? "Contoh: Jajan Sore" : "Contoh: Jual Barang Bekas"}
                            />
                        </div>
                    </div>

                    {/* GRID ICON (FIXED) */}
                    <div>
                        <InputLabel value="Pilih Ikon" className="mb-2 text-xs text-gray-400 uppercase tracking-wider" />
                        <div className="grid grid-cols-6 sm:grid-cols-8 gap-2 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
                            {CATEGORY_ICONS.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => {
                                        // FIX: Langsung update Icon DAN Nama sekaligus tanpa syarat
                                        setData(prevData => ({
                                            ...prevData,
                                            icon: item.icon,
                                            name: item.label
                                        }));
                                    }}
                                    className={`aspect-square flex items-center justify-center rounded-lg cursor-pointer transition-all border ${data.icon === item.icon
                                            ? 'bg-blue-600/30 border-blue-500 shadow-sm scale-110'
                                            : 'bg-gray-800/50 border-transparent hover:bg-gray-700 hover:border-gray-600'
                                        }`}
                                    title={item.label}
                                >
                                    <span className="text-xl">{item.icon}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tombol Simpan */}
                    <div className="flex justify-end pt-2">
                        <button disabled={processing} className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95">
                            Simpan Kategori
                        </button>
                    </div>
                </form>

                {/* Style Tambahan untuk Scrollbar */}
                <style>{`
                    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                    .custom-scrollbar::-webkit-scrollbar-track { background: #1f2937; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
                `}</style>
            </div>
        </Modal>
    );
}