import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ labels, data }) {

    // 1. Cek apakah ada data
    const hasData = data && data.length > 0;

    // 2. Konversi data ke Angka (Float) agar tidak NaN
    // Database sering mengirim string "10000.00", kita ubah jadi angka murni
    const numericData = hasData ? data.map(item => parseFloat(item)) : [];

    // 3. Hitung Total dengan aman
    const totalExpense = numericData.reduce((acc, curr) => acc + (curr || 0), 0);

    // 4. Formatter untuk angka "5jt", "500rb", "1.2M" (Compact)
    const formatCompact = (number) => {
        return new Intl.NumberFormat('id-ID', {
            notation: "compact",
            compactDisplay: "short",
            maximumFractionDigits: 1
        }).format(number);
    };

    // Jika tidak ada data, tampilkan placeholder
    if (!hasData || totalExpense === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full min-h-[200px] text-gray-500 opacity-50">
                <div className="w-16 h-16 rounded-full border-4 border-gray-700 border-dashed flex items-center justify-center mb-2 animate-pulse">
                    <span className="text-2xl">📊</span>
                </div>
                <p className="text-xs font-medium">Belum ada pengeluaran</p>
            </div>
        );
    }

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: numericData,
                backgroundColor: [
                    '#3B82F6', // Blue
                    '#EF4444', // Red
                    '#10B981', // Green
                    '#F59E0B', // Yellow
                    '#8B5CF6', // Purple
                    '#EC4899', // Pink
                    '#6366F1', // Indigo
                    '#14B8A6', // Teal
                ],
                borderColor: '#131926', // Sesuaikan dengan warna BG Dashboard (Dark)
                borderWidth: 6,
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    usePointStyle: true,
                    pointStyle: 'circle',
                    color: '#9CA3AF', // Gray-400
                    font: { size: 10, family: 'sans-serif' },
                    padding: 15,
                    boxWidth: 8,
                }
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)',
                titleColor: '#fff',
                bodyColor: '#D1D5DB',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 12,
                displayColors: true,
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) { label += ': '; }
                        if (context.parsed !== null) {
                            label += new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: 'IDR',
                                minimumFractionDigits: 0
                            }).format(context.parsed);
                        }
                        return label;
                    }
                }
            }
        },
        cutout: '75%', // Lubang donat
        layout: {
            padding: 0
        }
    };

    return (
        <div className="w-full h-full min-h-[200px] relative flex items-center justify-center">
            <Doughnut data={chartData} options={options} />

            {/* Teks Total di Tengah Donat */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pr-10 md:pr-0">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">TOTAL</span>
                <span className="text-xl md:text-2xl font-bold text-white tracking-tight">
                    {/* Menggunakan formatter compact (misal: 5jt, 200rb) */}
                    {formatCompact(totalExpense)}
                </span>
            </div>
        </div>
    );
}