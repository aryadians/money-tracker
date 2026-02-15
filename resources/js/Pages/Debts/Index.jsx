import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputError from '@/Components/InputError';

function Index({ auth, debts }) {
    const [showModal, setShowModal] = useState(false);
    const [showPayModal, setShowPayModal] = useState(false);
    const [selectedDebt, setSelectedDebt] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        person_name: '',
        type: 'payable',
        amount: '',
        due_date: '',
        description: '',
    });

    const payForm = useForm({
        paid_amount: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('debts.store'), {
            onSuccess: () => {
                setShowModal(false);
                reset();
            },
        });
    };

    const submitPayment = (e) => {
        e.preventDefault();
        router.patch(route('debts.update', selectedDebt.id), {
            paid_amount: payForm.data.paid_amount
        }, {
            onSuccess: () => {
                setShowPayModal(false);
                payForm.reset();
            }
        });
    };

    const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

    return (
        <>
            <Head title="Hutang & Piutang" />
            <div className="py-12 bg-gray-900 min-h-screen text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Hutang & Piutang</h2>
                        <PrimaryButton onClick={() => setShowModal(true)}>+ Catat Baru</PrimaryButton>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {debts.map((debt) => (
                            <div key={debt.id} className="bg-gray-800 p-6 rounded-2xl border border-white/5 relative overflow-hidden group">
                                <div className={`absolute top-0 right-0 px-3 py-1 text-[10px] font-bold uppercase rounded-bl-xl ${debt.type === 'payable' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                    {debt.type === 'payable' ? 'Hutang Saya' : 'Piutang'}
                                </div>
                                
                                <h3 className="text-lg font-bold mb-1">{debt.person_name}</h3>
                                <p className="text-gray-400 text-sm mb-4">{debt.description || 'Tidak ada catatan'}</p>
                                
                                <div className="flex justify-between items-end">
                                    <div>
                                        <p className="text-xs text-gray-500 uppercase font-bold">Total</p>
                                        <p className="text-xl font-bold">{formatRupiah(debt.amount)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-gray-500 uppercase font-bold">Sisa</p>
                                        <p className={`text-lg font-bold ${debt.is_paid ? 'text-green-400' : 'text-orange-400'}`}>
                                            {debt.is_paid ? 'LUNAS' : formatRupiah(debt.amount - debt.paid_amount)}
                                        </p>
                                    </div>
                                </div>

                                {!debt.is_paid && (
                                    <button 
                                        onClick={() => { setSelectedDebt(debt); setShowPayModal(true); }}
                                        className="mt-4 w-full py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-sm font-bold transition"
                                    >
                                        Bayar / Cicil
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal Create */}
            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <form onSubmit={submit} className="p-6 bg-gray-800 text-white">
                    <h2 className="text-lg font-bold mb-4">Catat Hutang/Piutang Baru</h2>
                    
                    <div className="space-y-4">
                        <div>
                            <InputLabel value="Nama Orang" className="text-gray-400" />
                            <TextInput 
                                className="w-full bg-gray-900 border-gray-700" 
                                value={data.person_name}
                                onChange={e => setData('person_name', e.target.value)}
                            />
                            <InputError message={errors.person_name} />
                        </div>

                        <div>
                            <InputLabel value="Tipe" className="text-gray-400" />
                            <select 
                                className="w-full bg-gray-900 border-gray-700 rounded-md text-white"
                                value={data.type}
                                onChange={e => setData('type', e.target.value)}
                            >
                                <option value="payable">Hutang Saya (Saya Pinjam)</option>
                                <option value="receivable">Piutang (Orang Pinjam ke Saya)</option>
                            </select>
                        </div>

                        <div>
                            <InputLabel value="Jumlah" className="text-gray-400" />
                            <TextInput 
                                type="number"
                                className="w-full bg-gray-900 border-gray-700" 
                                value={data.amount}
                                onChange={e => setData('amount', e.target.value)}
                            />
                            <InputError message={errors.amount} />
                        </div>

                        <div>
                            <InputLabel value="Catatan" className="text-gray-400" />
                            <TextInput 
                                className="w-full bg-gray-900 border-gray-700" 
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setShowModal(false)}>Batal</SecondaryButton>
                        <PrimaryButton disabled={processing}>Simpan</PrimaryButton>
                    </div>
                </form>
            </Modal>

            {/* Modal Pay */}
            <Modal show={showPayModal} onClose={() => setShowPayModal(false)}>
                <form onSubmit={submitPayment} className="p-6 bg-gray-800 text-white">
                    <h2 className="text-lg font-bold mb-2">Catat Pembayaran</h2>
                    <p className="text-sm text-gray-400 mb-4">Mencatat cicilan untuk {selectedDebt?.person_name}</p>

                    <div>
                        <InputLabel value="Jumlah Bayar" className="text-gray-400" />
                        <TextInput 
                            type="number"
                            className="w-full bg-gray-900 border-gray-700" 
                            value={payForm.data.paid_amount}
                            onChange={e => payForm.setData('paid_amount', e.target.value)}
                            autoFocus
                        />
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <SecondaryButton onClick={() => setShowPayModal(false)}>Batal</SecondaryButton>
                        <PrimaryButton>Konfirmasi Bayar</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

Index.layout = page => <AuthenticatedLayout header={null}>{page}</AuthenticatedLayout>;

export default Index;
