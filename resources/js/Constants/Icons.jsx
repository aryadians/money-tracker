// 1. DATA PROVIDER DOMPET (BANK/E-WALLET)
export const WALLET_PRESETS = [
    { name: 'BCA', type: 'bank', color: '#005EB8', icon: '🏦' },
    { name: 'Mandiri', type: 'bank', color: '#FFB700', icon: '🏦' },
    { name: 'BRI', type: 'bank', color: '#00529C', icon: '🏦' },
    { name: 'BNI', type: 'bank', color: '#005E6A', icon: '🏦' },
    { name: 'Jago', type: 'bank', color: '#F47B20', icon: '📱' },
    { name: 'Jenius', type: 'bank', color: '#00A3DA', icon: '💳' },
    { name: 'Gopay', type: 'ewallet', color: '#00AED6', icon: '🟢' },
    { name: 'OVO', type: 'ewallet', color: '#4C3494', icon: '🟣' },
    { name: 'ShopeePay', type: 'ewallet', color: '#EE4D2D', icon: '🛍️' },
    { name: 'Dana', type: 'ewallet', color: '#118EEA', icon: '🔵' },
    { name: 'LinkAja', type: 'ewallet', color: '#E32128', icon: '🔴' },
    { name: 'Tunai', type: 'cash', color: '#10B981', icon: '💵' },
];

// 2. DATA KATEGORI (LEBIH LENGKAP)
export const CATEGORY_ICONS = [
    // --- MAKANAN & MINUMAN ---
    { id: 'food', icon: '🍽️', label: 'Makan Berat' },
    { id: 'fastfood', icon: '🍔', label: 'Fast Food' },
    { id: 'noodle', icon: '🍜', label: 'Mie/Bakso' },
    { id: 'drink', icon: '🥤', label: 'Minuman' },
    { id: 'coffee', icon: '☕', label: 'Kopi/Cafe' },
    { id: 'snack', icon: '🍟', label: 'Cemilan' },
    { id: 'groceries', icon: '🛒', label: 'Belanja Dapur' },
    { id: 'fruit', icon: '🍎', label: 'Buah' },

    // --- TRANSPORTASI ---
    { id: 'fuel', icon: '⛽', label: 'Bensin' },
    { id: 'car', icon: '🚗', label: 'Mobil' },
    { id: 'motor', icon: '🛵', label: 'Motor' },
    { id: 'taxi', icon: '🚕', label: 'Ojol/Taksi' },
    { id: 'bus', icon: '🚌', label: 'Bus/Angkot' },
    { id: 'train', icon: '🚆', label: 'Kereta' },
    { id: 'parking', icon: '🅿️', label: 'Parkir' },
    { id: 'service', icon: '🔧', label: 'Servis' },

    // --- TAGIHAN & RUMAH ---
    { id: 'house', icon: '🏠', label: 'Sewa/KPR' },
    { id: 'electric', icon: '💡', label: 'Listrik' },
    { id: 'water', icon: '💧', label: 'Air' },
    { id: 'internet', icon: '🌐', label: 'Internet/Wifi' },
    { id: 'phone', icon: '📱', label: 'Pulsa/Data' },
    { id: 'laundry', icon: '🧺', label: 'Laundry' },
    { id: 'maintenance', icon: '🔨', label: 'Perbaikan' },

    // --- GAYA HIDUP & HIBURAN ---
    { id: 'shopping', icon: '🛍️', label: 'Belanja Baju' },
    { id: 'makeup', icon: '💄', label: 'Skincare' },
    { id: 'movie', icon: '🎬', label: 'Nonton/Bioskop' },
    { id: 'game', icon: '🎮', label: 'Game' },
    { id: 'music', icon: '🎵', label: 'Musik/Spotify' },
    { id: 'sport', icon: '⚽', label: 'Olahraga' },
    { id: 'travel', icon: '✈️', label: 'Liburan' },
    { id: 'hotel', icon: '🏨', label: 'Hotel' },

    // --- KESEHATAN & DIRI ---
    { id: 'doctor', icon: '👨‍⚕️', label: 'Dokter' },
    { id: 'meds', icon: '💊', label: 'Obat' },
    { id: 'gym', icon: '💪', label: 'Gym/Fitness' },
    { id: 'barber', icon: '✂️', label: 'Cukur Rambut' },
    { id: 'education', icon: '🎓', label: 'Pendidikan' },
    { id: 'book', icon: '📚', label: 'Buku' },

    // --- PEMASUKAN / LAINNYA ---
    { id: 'salary', icon: '💰', label: 'Gaji' },
    { id: 'bonus', icon: '💎', label: 'Bonus' },
    { id: 'investment', icon: '📈', label: 'Investasi' },
    { id: 'gift', icon: '🎁', label: 'Hadiah' },
    { id: 'charity', icon: '🤝', label: 'Sedekah' },
    { id: 'pet', icon: '🐾', label: 'Hewan Peliharaan' },
    { id: 'baby', icon: '👶', label: 'Kebutuhan Bayi' },
    { id: 'other', icon: '📝', label: 'Lainnya' },
];