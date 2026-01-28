// Data Provider (Bank/E-Wallet) dengan Warna & Ikon Khas
export const WALLET_PRESETS = [
    { name: 'Bank BCA', type: 'bank', color: '#005EB8', icon: '🏦' }, // Biru BCA
    { name: 'Bank Mandiri', type: 'bank', color: '#FFB700', icon: '🏦' }, // Kuning Mandiri (Text Dark) atau Biru
    { name: 'Bank BRI', type: 'bank', color: '#00529C', icon: '🏦' }, // Biru BRI
    { name: 'Bank Jago', type: 'bank', color: '#F47B20', icon: '🏦' }, // Orange Jago
    { name: 'Gopay', type: 'ewallet', color: '#00AED6', icon: '📱' }, // Biru Gopay
    { name: 'OVO', type: 'ewallet', color: '#4C3494', icon: '🟣' }, // Ungu OVO
    { name: 'ShopeePay', type: 'ewallet', color: '#EE4D2D', icon: '🛍️' }, // Orange Shopee
    { name: 'Dana', type: 'ewallet', color: '#118EEA', icon: '📱' }, // Biru Dana
    { name: 'Tunai / Cash', type: 'cash', color: '#10B981', icon: '💵' }, // Hijau
];

// Data Kategori dengan Ikon
export const CATEGORY_ICONS = [
    { id: 'food', icon: '🍔', label: 'Makan & Minum' },
    { id: 'transport', icon: '⛽', label: 'Transport / Bensin' },
    { id: 'shopping', icon: '🛒', label: 'Belanja' },
    { id: 'entertainment', icon: '🎬', label: 'Hiburan' },
    { id: 'bills', icon: '💡', label: 'Tagihan (Listrik/Air)' },
    { id: 'health', icon: '💊', label: 'Kesehatan' },
    { id: 'education', icon: '🎓', label: 'Pendidikan' },
    { id: 'salary', icon: '💰', label: 'Gaji (Pemasukan)' },
    { id: 'gift', icon: '🎁', label: 'Hadiah' },
    { id: 'investment', icon: '📈', label: 'Investasi' },
];