import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';

export default function FlashMessage() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [type, setType] = useState('success'); // success | error

    useEffect(() => {
        // Cek apakah ada flash message dari backend (Controller)
        if (flash.message || flash.error) {
            setMessage(flash.message || flash.error);
            setType(flash.error ? 'error' : 'success');
            setVisible(true);

            // Hilang otomatis setelah 3 detik
            const timer = setTimeout(() => {
                setVisible(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!visible) return null;

    return (
        <div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl border animate-slide-in-right transition-all duration-500
            ${type === 'success' 
                ? 'bg-green-900/60 border-green-500/30 text-green-400 shadow-green-500/20' 
                : 'bg-red-900/60 border-red-500/30 text-red-400 shadow-red-500/20'
            }`}
        >
            {/* Icon Circle */}
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg shadow-inner
                ${type === 'success' ? 'bg-green-500/20 border border-green-500/20' : 'bg-red-500/20 border border-red-500/20'}`}
            >
                {type === 'success' ? '✅' : '⚠️'}
            </div>
            
            {/* Text Content */}
            <div>
                <h4 className="font-bold text-xs uppercase tracking-widest mb-0.5">
                    {type === 'success' ? 'Berhasil' : 'Gagal'}
                </h4>
                <p className="text-sm font-medium text-white leading-tight">{message}</p>
            </div>

            {/* Close Button */}
            <button onClick={() => setVisible(false)} className="ml-4 text-white/40 hover:text-white transition-colors">
                ✕
            </button>

            {/* CSS Animation */}
            <style>{`
                @keyframes slide-in-right {
                    0% { transform: translateX(100%) scale(0.9); opacity: 0; }
                    80% { transform: translateX(-5%); }
                    100% { transform: translateX(0) scale(1); opacity: 1; }
                }
                .animate-slide-in-right { animation: slide-in-right 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
            `}</style>
        </div>
    );
}