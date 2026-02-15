import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useState } from 'react';
import { format } from 'date-fns';

export default function Index({ auth, calendarData, filters }) {
    const [date, setDate] = useState(new Date());

    const formatRupiah = (number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);

    // Fungsi untuk merender konten di setiap tanggal kalender
    const tileContent = ({ date, view }) => {
        if (view === 'month') {
            const dateStr = format(date, 'yyyy-MM-dd');
            const data = calendarData[dateStr];
            
            if (data) {
                return (
                    <div className="flex flex-col gap-0.5 mt-1 text-[8px] sm:text-[10px]">
                        {data.income > 0 && <span className="text-green-500 font-bold">+{formatRupiah(data.income)}</span>}
                        {data.expense > 0 && <span className="text-red-500 font-bold">-{formatRupiah(data.expense)}</span>}
                    </div>
                );
            }
        }
    };

    const onMonthChange = ({ activeStartDate }) => {
        const month = activeStartDate.getMonth() + 1;
        const year = activeStartDate.getFullYear();
        
        router.get(route('calendar.index'), {
            month: month,
            year: year
        }, { preserveState: true, preserveScroll: true });
    };

    return (
        <>
            <Head title="Kalender Keuangan" />
            <div className="py-12 bg-gray-900 min-h-screen text-white">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold mb-6">Kalender Keuangan 📅</h2>
                    
                    <div className="bg-gray-800 p-6 rounded-3xl shadow-xl border border-white/5 overflow-hidden">
                        <style>{`
                            .react-calendar { width: 100%; background: transparent; border: none; font-family: sans-serif; }
                            .react-calendar__tile { color: white; height: 100px; border: 1px solid #374151; display: flex; flex-direction: column; align-items: flex-start; justify-content: flex-start; padding: 5px; }
                            .react-calendar__tile:enabled:hover, .react-calendar__tile:enabled:focus { background-color: #1f2937; }
                            .react-calendar__tile--now { background: #3b82f633; border: 1px solid #3b82f6; }
                            .react-calendar__navigation button { color: white; min-width: 44px; background: none; font-size: 1.2em; }
                            .react-calendar__navigation button:enabled:hover, .react-calendar__navigation button:enabled:focus { background-color: #374151; }
                            .react-calendar__month-view__days__day--weekend { color: #f87171; }
                            .react-calendar__month-view__weekdays { text-transform: uppercase; font-weight: bold; font-size: 0.75em; color: #9ca3af; }
                        `}</style>
                        
                        <Calendar
                            onChange={setDate}
                            value={date}
                            tileContent={tileContent}
                            onActiveStartDateChange={onMonthChange}
                            locale="id-ID"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = page => <AuthenticatedLayout header={null}>{page}</AuthenticatedLayout>;
