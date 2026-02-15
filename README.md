<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/master/icons/wallet.svg" width="100" alt="Logo">
</p>

<h1 align="center">SpendWise - Smart Money Tracker</h1>

<p align="center">
  <em>Solusi cerdas untuk mengelola keuangan pribadi Anda secara efisien, modern, dan real-time.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/github/stars/user/repo?style=for-the-badge&logo=github&color=gold" alt="Stars">
  <img src="https://img.shields.io/github/forks/user/repo?style=for-the-badge&logo=github&color=blue" alt="Forks">
  <img src="https://img.shields.io/github/issues/user/repo?style=for-the-badge&logo=github&color=red" alt="Issues">
  <img src="https://img.shields.io/github/license/user/repo?style=for-the-badge&logo=github&color=green" alt="License">
</p>

---

## 📖 Tentang Project
**SpendWise** adalah aplikasi manajemen keuangan berbasis web yang membantu pengguna untuk mencatat transaksi harian, mengelola anggaran (budget), melacak saldo di berbagai dompet, serta memberikan visualisasi data yang interaktif. Dibangun dengan fokus pada kecepatan performa dan pengalaman pengguna yang intuitif.

### 🌟 Fitur Utama

| Fitur | Icon | Deskripsi |
| :--- | :---: | :--- |
| **Multi-Wallet** | 💳 | Kelola berbagai sumber dana seperti Bank, E-Wallet, dan Tunai dalam satu tempat. |
| **Manajemen Transaksi** | 📝 | Catat pemasukan, pengeluaran, dan transfer antar dompet dengan sangat mudah. |
| **Anggaran (Budgeting)** | 📊 | Tetapkan batas pengeluaran per kategori dan pantau penggunaannya secara real-time. |
| **Visualisasi Data** | 📈 | Grafik interaktif untuk melihat tren pengeluaran bulanan Anda. |
| **Scan Struk (OCR)** | 📸 | Otomatis input nominal belanja hanya dengan mengunggah foto struk belanja. |
| **Sistem Achievement** | 🏆 | Dapatkan lencana penghargaan setiap kali Anda mencapai target finansial tertentu. |
| **Smart Insights** | 💡 | Rekomendasi otomatis berdasarkan pola pengeluaran Anda. |
| **Export Data** | 📥 | Unduh laporan keuangan Anda dalam format Excel (XLSX) atau PDF. |

---

## 🛠️ Teknologi yang Digunakan

- **Frontend:** ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Inertia.js](https://img.shields.io/badge/Inertia.js-9553E9?style=for-the-badge&logo=inertia&logoColor=white)
- **Backend:** ![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white) ![PHP](https://img.shields.io/badge/PHP-777BB4?style=for-the-badge&logo=php&logoColor=white)
- **Database:** ![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
- **Tools:** ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)

---

## 🚀 Cara Instalasi (Lokal)

Ikuti langkah-langkah berikut untuk menjalankan project di mesin lokal Anda:

1. **Clone Repositori**
   ```bash
   git clone https://github.com/username/repo-name.git
   cd repo-name
   ```

2. **Instal Dependensi Backend (Composer)**
   ```bash
   composer install
   ```

3. **Instal Dependensi Frontend (NPM)**
   ```bash
   npm install
   ```

4. **Konfigurasi Environment**
   Salin file `.env.example` menjadi `.env` dan sesuaikan database Anda serta kredensial lainnya.
   ```bash
   cp .env.example .env
   ```

5. **Generate Application Key**
   ```bash
   php artisan key:generate
   ```

6. **Migrasi Database & Seeding**
   ```bash
   php artisan migrate --seed
   ```

7. **Jalankan Project**
   Buka dua terminal, jalankan perintah berikut:
   *   Terminal 1: `php artisan serve`
   *   Terminal 2: `npm run dev`

---

## 🌐 Cara Deploy

### Persiapan Build
Sebelum melakukan upload ke server, jalankan perintah build agar semua aset teroptimasi:
```bash
npm run build
```

### Opsi 1: Shared Hosting (cPanel)
1. Upload semua file project ke server (kecuali folder `node_modules`).
2. Pindahkan isi folder `public` ke `public_html`.
3. Sesuaikan file `index.php` di `public_html` agar mengarah ke path vendor yang benar.
4. Update `.env` dengan konfigurasi database server.

### Opsi 2: VPS (Ubuntu/Nginx)
1. Clone repository ke folder `/var/www/`.
2. Jalankan `composer install --optimize-autoloader --no-dev`.
3. Konfigurasi Nginx untuk mengarah ke folder `public`.
4. Jalankan `php artisan config:cache` and `php artisan route:cache`.

---

## 📄 Lisensi
Didistribusikan di bawah Lisensi MIT. Lihat `LICENSE` untuk informasi lebih lanjut.

## ✉️ Kontak
Nama Anda - [@username](https://instagram.com/username) - email@example.com

Link Project: [https://github.com/username/repo-name](https://github.com/username/repo-name)

---
<p align="center">Dibuat dengan ❤️ untuk manajemen keuangan yang lebih baik.</p>
