export default function BudgetCard({ budget, onEdit, onDelete }) {
    const { category_name, category_icon, limit, spent, percentage, is_over } = budget;

    // Warna progress bar
    let colorClass = 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]';
    if (percentage > 75) colorClass = 'bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]';
    if (percentage >= 100) colorClass = 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]';

    const formatMoney = (n) => new Intl.NumberFormat('id-ID').format(n);

    return (
        <div className="bg-[#181E29] border border-white/5 rounded-2xl p-4 mb-3 relative group hover:border-white/10 transition-all">

            {/* Header: Icon & Nama */}
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#232936] flex items-center justify-center text-xl shadow-inner border border-white/5">
                        {category_icon}
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-200 text-sm">{category_name}</h4>
                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Limit: Rp {formatMoney(limit)}</p>
                    </div>
                </div>

                {/* --- TOMBOL AKSI (Muncul saat Hover) --- */}
                <div className="flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                        onClick={() => onEdit(budget)}
                        className="w-7 h-7 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 flex items-center justify-center transition"
                        title="Edit Anggaran"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => onDelete(budget)}
                        className="w-7 h-7 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 flex items-center justify-center transition"
                        title="Hapus Anggaran"
                    >
                        🗑️
                    </button>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-2.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${colorClass} ${is_over ? 'animate-pulse' : ''}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
            </div>

            {/* Footer Stats */}
            <div className="flex justify-between mt-2 text-[10px] font-medium">
                <span className="text-gray-400">
                    Terpakai: <span className="text-white font-bold">Rp {formatMoney(spent)}</span>
                </span>
                <span className={is_over ? 'text-red-500 font-bold' : percentage > 75 ? 'text-yellow-500' : 'text-blue-400'}>
                    {percentage.toFixed(0)}% {is_over ? '(Over)' : ''}
                </span>
            </div>
        </div>
    );
}