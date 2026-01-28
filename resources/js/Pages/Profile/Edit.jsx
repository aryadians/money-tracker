import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-200 leading-tight">Profile</h2>}
        >
            <Head title="Profile" />

            <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden pb-12">

                {/* Background Decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                    <div className="absolute top-[20%] left-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                    <div className="absolute bottom-[20%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 py-12">

                    {/* Kartu 1: Update Info Profil */}
                    <div className="p-4 sm:p-8 bg-gray-800/50 backdrop-blur-md border border-white/10 shadow-xl sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    {/* Kartu 2: Ganti Password */}
                    <div className="p-4 sm:p-8 bg-gray-800/50 backdrop-blur-md border border-white/10 shadow-xl sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    {/* Kartu 3: Hapus Akun */}
                    <div className="p-4 sm:p-8 bg-gray-800/50 backdrop-blur-md border border-white/10 shadow-xl sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>

            <style>{` .animate-blob { animation: blob 7s infinite; } `}</style>
        </AuthenticatedLayout>
    );
}