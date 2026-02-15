import { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

export default function AchievementPopup({ achievements }) {
    const [show, setShow] = useState(false);
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        if (achievements && achievements.length > 0) {
            setCurrent(achievements[0]);
            setShow(true);
            setTimeout(() => setShow(false), 5000); // Tampil 5 detik
        }
    }, [achievements]);

    if (!current) return null;

    return (
        <Transition
            show={show}
            enter="transition ease-out duration-300"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-200"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] bg-gradient-to-r from-yellow-500 to-orange-500 p-6 rounded-3xl shadow-2xl flex items-center gap-4 border-2 border-yellow-300 max-w-sm w-full">
                <div className="text-4xl animate-bounce">{current.icon}</div>
                <div>
                    <h3 className="text-white font-black text-lg uppercase tracking-wide">Achievement Unlocked!</h3>
                    <p className="text-yellow-100 font-bold">{current.name}</p>
                    <p className="text-white text-xs mt-1">{current.description}</p>
                </div>
            </div>
        </Transition>
    );
}
