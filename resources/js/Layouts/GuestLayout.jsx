import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                    {/* FIX: Kita ganti <ApplicationLogo /> dengan Teks/Icon langsung.
                        Ini mencegah error "White Screen" jika file logo bermasalah.
                    */}
                    <div className="flex flex-col items-center">
                        <span className="text-4xl">💸</span>
                        <h1 className="text-2xl font-bold text-gray-800 mt-2 tracking-wider">
                            MONEY TRACKER
                        </h1>
                    </div>
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}