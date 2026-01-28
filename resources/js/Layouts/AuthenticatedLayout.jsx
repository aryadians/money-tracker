import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">

            {/* Navbar Glassmorphism */}
            <nav className="border-b border-white/10 bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            {/* Logo */}
                            <div className="flex shrink-0 items-center">
                                <Link href="/" className="flex items-center gap-2 group">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-blue-500/50 transition-all duration-300">
                                        <span className="text-lg">💸</span>
                                    </div>
                                    <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:to-white transition-all">
                                        MoneyTracker
                                    </span>
                                </Link>
                            </div>

                            {/* Desktop Navigation */}
                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ${route().current('dashboard')
                                            ? 'border-blue-500 text-white'
                                            : 'border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-600'
                                        }`}
                                >
                                    Dashboard
                                </NavLink>
                            </div>
                        </div>

                        {/* User Dropdown */}
                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-full border border-white/10 bg-gray-800 px-4 py-2 text-sm font-medium leading-4 text-gray-300 transition duration-150 ease-in-out hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                            >
                                                {user.name}

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4 text-gray-400"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content contentClasses="py-1 bg-gray-800 border border-white/10 shadow-xl rounded-md">
                                        <div className="px-4 py-2 text-xs text-gray-500 border-b border-white/5">
                                            Manage Account
                                        </div>

                                        {/* FIX: Gunakan !text-gray-300 agar warna abu-abu gelap bawaan tertimpa */}
                                        <Dropdown.Link
                                            href={route('profile.edit')}
                                            className="block w-full px-4 py-2 text-start text-sm leading-5 !text-gray-300 hover:bg-gray-700 hover:!text-white focus:outline-none transition duration-150 ease-in-out"
                                        >
                                            Profile
                                        </Dropdown.Link>

                                        <div className="border-t border-white/5 my-1"></div>

                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            className="block w-full px-4 py-2 text-start text-sm leading-5 !text-red-400 hover:bg-gray-700 hover:!text-red-300 focus:outline-none transition duration-150 ease-in-out"
                                        >
                                            Log Out
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="-me-2 flex items-center sm:hidden">
                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu Content */}
                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden bg-gray-800/95 backdrop-blur-xl border-b border-white/10'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                            className={`block w-full ps-3 pe-4 py-2 border-l-4 text-start text-base font-medium transition duration-150 ease-in-out ${route().current('dashboard')
                                    ? 'border-blue-500 text-white bg-blue-500/10'
                                    : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-800 hover:border-gray-600'
                                }`}
                        >
                            Dashboard
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-700 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-400">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                href={route('profile.edit')}
                                className="block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-gray-400 hover:text-gray-200 hover:bg-gray-800 hover:border-gray-600 transition duration-150 ease-in-out"
                            >
                                Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                                className="block w-full ps-3 pe-4 py-2 border-l-4 border-transparent text-start text-base font-medium text-red-400 hover:text-red-300 hover:bg-gray-800 hover:border-red-600 transition duration-150 ease-in-out"
                            >
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-gray-800/50 shadow border-b border-white/5">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}