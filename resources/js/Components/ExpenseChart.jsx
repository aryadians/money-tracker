import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpenseChart({ labels, data }) {

    // Jika tidak ada data, tampilkan placeholder cantik
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-full text-gray-500 opacity-60">
                <div className="w-16 h-16 rounded-full border-4 border-gray-700 border-dashed flex items-center justify-center mb-2">
                    <span className="text-2xl">📊</span>
                </div>
                <p className="text-xs font-medium">Belum ada data</p>
            </div>
        );
    }

    const chartData = {
        labels: labels,
        datasets: [
            {
                data: data,
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
                borderColor: '#1f2937', // Sama dengan warna bg card (gray-800) agar terlihat terpisah
                borderWidth: 6,
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // PENTING: Agar chart mengikuti ukuran container
        plugins: {
            legend: {
                position: 'right', // Legenda di kanan
                labels: {
                    usePointStyle: true, // Ubah kotak jadi bulat
                    pointStyle: 'circle',
                    color: '#9CA3AF', // Text gray-400
                    font: { size: 11, family: 'sans-serif' },
                    padding: 15,
                    boxWidth: 8, // Ukuran titik
                }
            },
            tooltip: {
                backgroundColor: 'rgba(17, 24, 39, 0.9)', // gray-900
                titleColor: '#fff',
                bodyColor: '#D1D5DB',
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
                padding: 10,
                cornerRadius: 8,
                displayColors: true,
                boxWidth: 8,
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) { label += ': '; }
                        if (context.parsed !== null) {
                            label += new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(context.parsed);
                        }
                        return label;
                    }
                }
            }
        },
        cutout: '75%', // Lubang donat lebih elegan
        layout: {
            padding: 0
        }
    };

    return (
        <div className="w-full h-full min-h-[180px] relative">
            <Doughnut data={chartData} options={options} />

            {/* Teks Total di Tengah Donat (Opsional, matikan jika tidak suka) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Total</span>
                <span className="text-sm font-bold text-white">
                    {/* Hitung total data untuk ditampilkan di tengah */}
                    {data.length > 0 ? (data.reduce((a, b) => a + b, 0) / 1000).toFixed(0) + 'k' : 0}
                </span>
            </div>
        </div>
    );
}