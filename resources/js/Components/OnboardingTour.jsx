import { useState, useEffect } from 'react';

export default function OnboardingTour() {
    const [step, setStep] = useState(0);
    
    useEffect(() => {
        // Cek apakah user sudah pernah lihat tutorial
        const hasSeen = localStorage.getItem('hasSeenOnboarding');
        if (!hasSeen) {
            setStep(1); // Mulai tutorial
        }
    }, []);

    const finishTour = () => {
        setStep(0);
        localStorage.setItem('hasSeenOnboarding', 'true');
    };

    if (step === 0) return null;

    const steps = [
        {
            title: "Selamat Datang di Money Tracker! 👋",
            desc: "Aplikasi keuangan super lengkap untuk mengatur masa depanmu.",
            target: "body" // Center
        },
        {
            title: "Dashboard Pintar 🧠",
            desc: "Di sini kamu bisa melihat Skor Kesehatan Keuangan dan Analisis Cerdas.",
            target: "body"
        },
        {
            title: "Mulai Mencatat 📝",
            desc: "Gunakan tombol 'Transaksi Baru' atau scan struk untuk mencatat pengeluaran.",
            target: "body"
        }
    ];

    const currentStep = steps[step - 1];

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-white text-gray-900 p-8 rounded-3xl max-w-md w-full shadow-2xl relative overflow-hidden text-center">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
                
                <h2 className="text-2xl font-black mb-3">{currentStep.title}</h2>
                <p className="text-gray-600 mb-8">{currentStep.desc}</p>
                
                <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Langkah {step} dari {steps.length}
                    </span>
                    <button 
                        onClick={() => step < steps.length ? setStep(step + 1) : finishTour()}
                        className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold transition-all shadow-lg"
                    >
                        {step < steps.length ? 'Lanjut →' : 'Mulai Sekarang! 🚀'}
                    </button>
                </div>
            </div>
        </div>
    );
}
