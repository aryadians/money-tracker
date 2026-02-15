import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';

function Index({ auth, goals }) {
    const [showModal, setShowModal] = useState(false);
    const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        target_amount: '',
        deadline: '',
        color_hex: '#3B82F6',
        description: '',
    });

    const addMoneyForm = useForm({
        amount: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('saving-goals.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    const submitAddMoney = (e) => {
        e.preventDefault();
        router.patch(route('saving-goals.update', selectedGoal.id), {
            amount: addMoneyForm.data.amount
        }, {
            onSuccess: () => {
                setShowAddMoneyModal(false);
                addMoneyForm.reset();
            }
        });
    };

    const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

    return (
        <>
            <Head title="Target Tabungan" />
            <div className="py-12 bg-gray-900 min-h-screen text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold">Target Tabungan</h2>
                            <p className="text-gray-400 mt-1">Wujudkan impianmu satu persatu 🎯</p>
                        </div>
                        <PrimaryButton onClick={() => setShowModal(true)}>+ Buat Target</PrimaryButton>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {goals.map((goal) => {
                            const percentage = Math.min(Math.round((goal.current_amount / goal.target_amount) * 100), 100);
                            return (
                                <div key={goal.id} className="bg-gray-800 p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-2xl">
                                            🎯
                                        </div>
                                        <div className="text-right">
                                            <span className="text-2xl font-black text-white/20">{percentage}%</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-1">{goal.name}</h3>
                                    <p className="text-gray-400 text-xs mb-6 truncate">{goal.description || 'Fokus pada tujuan!'}</p>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-gray-500">
                                            <span>Progress</span>
                                            <span>{formatRupiah(goal.target_amount)}</span>
                                        </div>
                                        <div className="h-3 bg-gray-900 rounded-full overflow-hidden border border-white/5">
                                            <div 
                                                className="h-full transition-all duration-1000 ease-out"
                                                style={{ 
                                                    width: `${percentage}%`, 
                                                    backgroundColor: goal.color_hex,
                                                    boxShadow: `0 0 15px ${goal.color_hex}44`
                                                }}
                                            ></div>
                                        </div>
                                        <div className="text-sm font-bold text-white">
                                            {formatRupiah(goal.current_amount)} terkumpul
                                        </div>
                                    </div>

                                    <button 
                                        onClick={() => { setSelectedGoal(goal); setShowAddMoneyModal(true); }}
                                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold text-sm transition shadow-lg shadow-blue-500/20"
                                    >
                                        Tambah Tabungan
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Modal Create */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <form onSubmit={submit} className="p-8 bg-gray-800 text-white rounded-3xl">
                    <h2 className="text-2xl font-bold mb-6">Buat Target Baru</h2>
                    
                    <div className="space-y-5">
                        <div>
                            <InputLabel value="Nama Target (Misal: Beli Laptop)" className="text-gray-400 mb-2" />
                            <TextInput 
                                className="w-full bg-gray-900 border-gray-700 rounded-xl" 
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                placeholder="Apa impianmu?"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <InputLabel value="Target Dana" className="text-gray-400 mb-2" />
                                <TextInput 
                                    type="number"
                                    className="w-full bg-gray-900 border-gray-700 rounded-xl" 
                                    value={data.target_amount}
                                    onChange={e => setData('target_amount', e.target.value)}
                                />
                                <InputError message={errors.target_amount} />
                            </div>
                            <div>
                                <InputLabel value="Warna Progress" className="text-gray-400 mb-2" />
                                <input 
                                    type="color"
                                    className="w-full h-[42px] bg-gray-900 border-gray-700 rounded-xl p-1 cursor-pointer"
                                    value={data.color_hex}
                                    onChange={e => setData('color_hex', e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <InputLabel value="Deadline (Opsional)" className="text-gray-400 mb-2" />
                            <TextInput 
                                type="date"
                                className="w-full bg-gray-900 border-gray-700 rounded-xl text-gray-300" 
                                value={data.deadline}
                                onChange={e => setData('deadline', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setShowModal(false)} className="rounded-xl">Batal</SecondaryButton>
                        <PrimaryButton disabled={processing} className="rounded-xl px-8">Simpan Target</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Modal Add Money */}
            <Modal show={showAddMoneyModal} onClose={() => setShowAddMoneyModal(false)}>
                <form onSubmit={submitAddMoney} className="p-8 bg-gray-800 text-white rounded-3xl">
                    <h2 className="text-2xl font-bold mb-2">Tambah Tabungan</h2>
                    <p className="text-sm text-gray-400 mb-6">Masukkan jumlah uang yang ingin Anda sisihkan untuk <b>{selectedGoal?.name}</b></p>

                    <div>
                        <InputLabel value="Jumlah Uang" className="text-gray-400 mb-2" />
                        <TextInput 
                            type="number"
                            className="w-full bg-gray-900 border-gray-700 rounded-xl text-xl font-bold text-blue-400" 
                            value={addMoneyForm.data.amount}
                            onChange={e => addMoneyForm.setData('amount', e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setShowAddMoneyModal(false)} className="rounded-xl">Batal</SecondaryButton>
                        <PrimaryButton className="rounded-xl px-8">Konfirmasi</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

Index.layout = page => <AuthenticatedLayout header={null}>{page}</AuthenticatedLayout>;

export default Index;
