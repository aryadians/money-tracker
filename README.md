<div align="center">

# 💰 Money Tracker

> Aplikasi manajemen keuangan pribadi yang powerful dan user-friendly

```
  ╔═══════════════════════════════════════╗
  ║        💳 MONEY TRACKER 💵           ║
  ║  Smart Financial Management System    ║
  ╚═══════════════════════════════════════╝
```

</div>

<div align="center">

[![Laravel](https://img.shields.io/badge/Laravel-11.x-FF2D20?style=for-the-badge&logo=laravel)](https://laravel.com)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![PHP](https://img.shields.io/badge/PHP-8.3-777BB4?style=for-the-badge&logo=php)](https://www.php.net)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql)](https://www.mysql.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![MIT License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)](#)
[![Code Quality](https://img.shields.io/badge/Code%20Quality-A-brightgreen?style=flat-square)](#)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green?style=flat-square)](#)

</div>

---

## 📋 Daftar Isi

- [🎯 Tentang Aplikasi](#tentang-aplikasi)
- [✨ Fitur Utama](#fitur-utama)
- [🛠️ Tech Stack](#tech-stack)
- [📦 Instalasi](#instalasi)
- [🚀 Cara Menggunakan](#cara-menggunakan)
- [📁 Struktur Proyek](#struktur-proyek)
- [🔐 Fitur Keamanan](#fitur-keamanan)
- [📊 Model Data](#model-data)
- [🤝 Kontribusi](#kontribusi)
- [📝 Lisensi](#lisensi)

---

## 🎯 Tentang Aplikasi

**Money Tracker** adalah aplikasi web modern untuk manajemen keuangan pribadi yang membantu Anda:

- 💰 Mencatat dan melacak setiap transaksi keuangan
- 💼 Mengelola multiple wallet/rekening bank
- 📊 Menganalisis pengeluaran dengan kategori
- 🎯 Membuat dan memantau anggaran (budget)
- 💸 Mencatat transfer antar wallet
- 📈 Visualisasi data keuangan dengan grafik interaktif

Dibangun dengan teknologi terkini untuk memberikan pengalaman pengguna yang optimal dan performa yang cepat.

---

## ✨ Fitur Utama

### 💳 Manajemen Wallet
- ✅ Buat multiple wallet/rekening
- ✅ Set saldo awal untuk setiap wallet
- ✅ Pantau saldo real-time
- ✅ Kelola detail wallet dengan mudah

### 📝 Pencatatan Transaksi
- ✅ Catat pemasukan dan pengeluaran
- ✅ Kategorisasi transaksi otomatis
- ✅ Tambahkan deskripsi dan catatan detail
- ✅ Filter dan cari transaksi dengan powerful search
- ✅ Export data ke format Excel (.xlsx)

### 🏷️ Kategori Dinamis
- ✅ Kelola kategori transaksi
- ✅ Set warna custom per kategori
- ✅ Kategori terstruktur (pemasukan/pengeluaran)
- ✅ Analisis pengeluaran per kategori

### 🎯 Anggaran & Budget
- ✅ Tentukan budget per kategori
- ✅ Monitor progress pengeluaran
- ✅ Alert ketika mendekati limit budget
- ✅ Analisis spending vs budget

### 💸 Transfer Antar Wallet
- ✅ Kirim uang antar wallet
- ✅ Track transfer history
- ✅ Update saldo otomatis
- ✅ Catat fee transfer (jika ada)

### 📊 Laporan & Analytics
- ✅ Dashboard dengan overview keuangan
- ✅ Statistik pengeluaran bulanan
- ✅ Chart interaktif (pie, bar, line)
- ✅ Laporan tahunan dan bulanan
- ✅ Perbandingan budget vs aktual

### 🔒 Keamanan
- ✅ Autentikasi user yang aman
- ✅ Enkripsi data sensitif
- ✅ Session management yang baik
- ✅ CSRF protection

---

## 🛠️ Tech Stack

<table>
<tr>
<td align="center">
  <strong>Backend</strong><br>
  <a href="https://laravel.com">Laravel 11</a><br>
  <a href="https://www.php.net">PHP 8.3</a><br>
  <a href="https://www.mysql.com">MySQL 8.0</a>
</td>
<td align="center">
  <strong>Frontend</strong><br>
  <a href="https://react.dev">React 19</a><br>
  <a href="https://vitejs.dev">Vite 5</a><br>
  <a href="https://tailwindcss.com">Tailwind CSS 3</a>
</td>
<td align="center">
  <strong>Tools & Libraries</strong><br>
  <a href="https://inertiajs.com">Inertia.js</a><br>
  <a href="https://www.chartjs.org">Chart.js</a><br>
  <a href="https://axios-http.com">Axios</a>
</td>
</tr>
</table>

---

## 📦 Instalasi

### Prasyarat
- PHP 8.3+
- Node.js 18+
- MySQL 8.0+
- Composer
- npm atau yarn

### Langkah-langkah

#### 1️⃣ Clone Repository
```bash
git clone https://github.com/aryadians/money-tracker.git
cd money-tracker
```

#### 2️⃣ Install Dependencies
```bash
# PHP Dependencies
composer install

# Node Dependencies
npm install
```

#### 3️⃣ Setup Environment
```bash
# Copy environment file
cp .env.example .env

# Generate app key
php artisan key:generate
```

#### 4️⃣ Database Setup
```bash
# Run migrations
php artisan migrate

# Seed database (opsional)
php artisan db:seed
```

#### 5️⃣ Build Assets
```bash
# Development
npm run dev

# Production
npm run build
```

#### 6️⃣ Start Server
```bash
php artisan serve
```

Aplikasi akan berjalan di `http://localhost:8000`

---

## 🚀 Cara Menggunakan

### 📱 Dashboard
Setelah login, Anda akan melihat dashboard dengan:
- 💵 Total saldo semua wallet
- 📊 Grafik pengeluaran bulan ini
- 🎯 Status budget vs pengeluaran
- 📈 Ringkasan transaksi terbaru

### 👤 Buat Akun
1. Klik "Sign Up" di halaman login
2. Isi email, nama, dan password
3. Verifikasi email (jika diaktifkan)
4. Mulai gunakan aplikasi

### 💳 Setup Wallet
1. Buka menu "Wallet" di sidebar
2. Klik "Tambah Wallet"
3. Isi nama wallet, tipe, dan saldo awal
4. Simpan

### 📝 Catat Transaksi
1. Klik "Transaksi" → "Tambah Baru"
2. Pilih tipe (Pemasukan/Pengeluaran)
3. Pilih wallet sumber
4. Pilih kategori
5. Masukkan nominal dan tanggal
6. Tambahkan deskripsi (opsional)
7. Simpan

### 🎯 Atur Budget
1. Buka "Budget" di menu
2. Klik "Buat Budget Baru"
3. Pilih kategori dan nominal limit
4. Tentukan periode (bulanan/tahunan)
5. Simpan dan monitor progress

---

## 📁 Struktur Proyek

```
money-tracker/
├── app/
│   ├── Exports/              # 📤 Excel export handlers
│   ├── Http/
│   │   ├── Controllers/      # 🎮 Request handlers
│   │   ├── Middleware/       # 🔐 Middleware
│   │   └── Requests/         # ✅ Form validation
│   ├── Models/               # 📊 Database models
│   │   ├── User.php          # 👤 User model
│   │   ├── Wallet.php        # 💳 Wallet model
│   │   ├── Transaction.php   # 📝 Transaction model
│   │   ├── Category.php      # 🏷️ Category model
│   │   ├── Transfer.php      # 💸 Transfer model
│   │   └── Budget.php        # 🎯 Budget model
│   └── Providers/            # 🔌 Service providers
├── database/
│   ├── migrations/           # 🗄️ Database schemas
│   ├── seeders/              # 🌱 Sample data
│   └── factories/            # 🏭 Testing factories
├── resources/
│   ├── js/
│   │   ├── app.jsx           # React root component
│   │   ├── bootstrap.js      # App initialization
│   │   ├── Components/       # 🧩 React components
│   │   ├── Layouts/          # 📐 Layout components
│   │   ├── Pages/            # 📄 Page components
│   │   └── Constants/        # ⚙️ Constants
│   ├── css/
│   │   └── app.css           # 🎨 Global styles
│   └── views/
│       └── app.blade.php     # Root Blade template
├── routes/
│   ├── web.php               # 🌐 Web routes
│   ├── auth.php              # 🔐 Auth routes
│   └── console.php           # 💻 Console routes
├── tests/                    # ✅ Test suites
├── config/                   # ⚙️ Config files
├── storage/                  # 💾 File storage
├── public/                   # 🌍 Public assets
├── .env.example              # Environment template
├── composer.json             # PHP dependencies
├── package.json              # Node dependencies
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
├── phpunit.xml               # PHPUnit config
└── README.md                 # 📖 Dokumentasi
```

---

## 🔐 Fitur Keamanan

| Fitur | Deskripsi |
|-------|-----------|
| 🔑 **Authentication** | Sistem login aman dengan Sanctum/JWT |
| 🛡️ **CSRF Protection** | Token CSRF pada setiap form |
| 🔒 **Password Hashing** | Bcrypt encryption untuk password |
| 📋 **Authorization** | Policy-based access control |
| ✅ **Input Validation** | Form validation di frontend & backend |
| 🚫 **SQL Injection Protection** | Prepared statements & ORM |
| 🔐 **HTTPS Ready** | Support untuk HTTPS/SSL |
| 👤 **User Privacy** | Data user terisolasi per akun |

---

## 📊 Model Data

### 👤 User
- ID, email, nama, password, created_at, updated_at

### 💳 Wallet
- ID, user_id, nama, tipe, saldo, currency, created_at, updated_at

### 📝 Transaction
- ID, wallet_id, category_id, tipe, nominal, deskripsi, tanggal, created_at, updated_at

### 🏷️ Category
- ID, user_id, nama, icon, warna, tipe (income/expense), created_at, updated_at

### 💸 Transfer
- ID, wallet_asal_id, wallet_tujuan_id, nominal, fee, tanggal, created_at, updated_at

### 🎯 Budget
- ID, user_id, category_id, nominal_limit, periode, progress, created_at, updated_at

---

## 🤝 Kontribusi

Kontribusi sangat welcome! 🎉

1. **Fork** repository
2. Buat **branch** fitur baru (`git checkout -b feature/AmazingFeature`)
3. **Commit** perubahan (`git commit -m 'Add some AmazingFeature'`)
4. **Push** ke branch (`git push origin feature/AmazingFeature`)
5. Buat **Pull Request**

### 📋 Panduan Kontribusi
- Ikuti coding standard yang ada
- Tambahkan test untuk fitur baru
- Update dokumentasi jika diperlukan
- Pastikan code sudah ter-format dengan baik

---

## 📝 Lisensi

Project ini dilisensikan di bawah **MIT License** - Lihat file [LICENSE](LICENSE) untuk detail.

---

<div align="center">

### 💡 Tips Berguna

Untuk informasi lebih lengkap, baca [dokumentasi lengkap](docs/README.md) atau buka [issues](https://github.com/aryadians/money-tracker/issues) untuk pertanyaan.

**Made with ❤️ by [Aryadians](https://github.com/aryadians)**

⭐ Jika project ini berguna, jangan lupa kasih star! ⭐

</div>
