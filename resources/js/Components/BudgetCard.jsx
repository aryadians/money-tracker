export default function BudgetCard({ budget }) {
    const { category_name, category_icon, limit, spent, percentage, is_over } = budget;

    // Tentukan warna berdasarkan persentase
    let colorClass = 'bg-blue-500';
    if (percentage > 75) colorClass = 'bg-yellow-500';
    if (percentage >= 100) colorClass = 'bg-red-500';

    const formatMoney = (n) => new Intl.NumberFormat('id-ID').format(n);

    return (
        <div className="bg-gray-800/40 border border-white/5 rounded-2xl p-4 mb-4 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gray-700/50 flex items-center justify-center text-xl">
                        {category_icon}
                    </div>
                    <div>
                        <h4 className="font-bold text-white text-sm">{category_name}</h4>
                        <p className="text-xs text-gray-400">
                            Terpakai: <span className={is_over ? 'text-red-400 font-bold' : 'text-gray-300'}>Rp {formatMoney(spent)}</span>
                        </p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">Limit</span>
                    <p className="font-bold text-white text-sm">Rp {formatMoney(limit)}</p>
                </div>
            </div>

            {/* Progress Bar Container */}
            <div className="relative w-full h-3 bg-gray-900 rounded-full overflow-hidden mt-3">
                {/* Bar */}
                <div
                    className={`absolute top-0 left-0 h-full rounded-full transition-all duration-1000 ease-out ${colorClass} ${is_over ? 'animate-pulse' : ''}`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
            </div>

            <div className="flex justify-between mt-1 text-[10px] font-bold">
                <span className={percentage >= 100 ? 'text-red-500' : 'text-blue-400'}>
                    {percentage.toFixed(0)}% Digunakan
                </span>
                {is_over && <span className="text-red-500">⚠️ OVER BUDGET!</span>}
            </div>
        </div>
    );
}   