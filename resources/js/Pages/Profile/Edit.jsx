import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="min-h-screen bg-gray-900 relative overflow-hidden pb-12">

                {/* Background Blobs (Sama seperti Dashboard) */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6 pt-10">

                    {/* CARD 1: UPDATE INFO */}
                    <div className="p-8 bg-gray-800/50 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* CARD 2: UPDATE PASSWORD */}
                    <div className="p-8 bg-gray-800/50 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* CARD 3: DELETE ACCOUNT */}
                    <div className="p-8 bg-red-900/20 backdrop-blur-xl border border-red-500/20 shadow-2xl rounded-3xl">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>

            {/* Style Animasi */}
            <style>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob { animation: blob 7s infinite; }
                .animation-delay-2000 { animation-delay: 2s; }
            `}</style>
        </AuthenticatedLayout>
    );
}