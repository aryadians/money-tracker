import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center relative overflow-hidden font-sans">
            <Head title="Log in" />

            {/* --- BACKGROUND ANIMATION (Elemen 3D Semu) --- */}
            {/* Bola Ungu Bergerak */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
            {/* Bola Biru Bergerak */}
            <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
            {/* Bola Pink Bergerak */}
            <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>

            {/* --- CARD KACA (GLASSMORPHISM) --- */}
            <div className="relative z-10 w-full max-w-md p-8 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.01] duration-500">

                {/* Header / Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 shadow-lg mb-4 animate-bounce-slow">
                        <span className="text-3xl">💸</span>
                    </div>
                    <h2 className="text-3xl font-bold text-white tracking-wide drop-shadow-md">
                        Money Tracker
                    </h2>
                    <p className="text-gray-300 text-sm mt-2">
                        Kelola keuangan masa depanmu.
                    </p>
                </div>

                {/* Status Message */}
                {status && (
                    <div className="mb-4 p-3 rounded bg-green-500/20 border border-green-500/50 text-sm font-medium text-green-300">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    {/* Email Input */}
                    <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1 group-focus-within:text-blue-400 transition-colors">
                            Email Address
                        </label>
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-inner"
                            autoComplete="username"
                            isFocused={true}
                            placeholder="nama@email.com"
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <InputError message={errors.email} className="mt-2 text-red-300" />
                    </div>

                    {/* Password Input */}
                    <div className="group">
                        <label className="block text-sm font-medium text-gray-300 mb-1 ml-1 group-focus-within:text-purple-400 transition-colors">
                            Password
                        </label>
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all shadow-inner"
                            autoComplete="current-password"
                            placeholder="••••••••"
                            onChange={(e) => setData('password', e.target.value)}
                        />
                        <InputError message={errors.password} className="mt-2 text-red-300" />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center cursor-pointer">
                            <Checkbox
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-offset-gray-800"
                            />
                            <span className="ml-2 text-gray-300 hover:text-white transition-colors">Ingat Saya</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-blue-400 hover:text-blue-300 hover:underline transition-colors"
                            >
                                Lupa Password?
                            </Link>
                        )}
                    </div>

                    {/* Submit Button (Gradient & 3D Hover) */}
                    <button
                        disabled={processing}
                        className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg transform hover:-translate-y-1 hover:shadow-purple-500/30 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {processing ? 'Memproses...' : 'MASUK SEKARANG'}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="mt-8 text-center text-sm text-gray-400">
                    Belum punya akun?{' '}
                    <Link href={route('register')} className="font-semibold text-white hover:text-blue-300 transition-colors">
                        Daftar disini
                    </Link>
                </div>
            </div>

            {/* --- CSS KHUSUS ANIMASI BLOB --- */}
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                .animate-bounce-slow {
                    animation: bounce 3s infinite;
                }
            `}</style>
        </div>
    );
}