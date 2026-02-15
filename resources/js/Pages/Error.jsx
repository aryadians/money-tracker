import { Link, Head } from '@inertiajs/react';

export default function Error({ status }) {
  const title = {
    503: '503: Service Unavailable',
    500: '500: Server Error',
    404: '404: Page Not Found',
    403: '403: Forbidden',
  }[status];

  const description = {
    503: 'Maaf, kami sedang melakukan perbaikan. Silakan cek kembali nanti.',
    500: 'Ups, terjadi kesalahan di server kami.',
    404: 'Halaman yang Anda cari tidak ditemukan.',
    403: 'Maaf, Anda tidak memiliki akses ke halaman ini.',
  }[status];

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-5 text-white font-sans">
      <Head title={title} />
      <div className="text-center">
        <div className="text-9xl font-black text-gray-800 mb-4 animate-pulse">{status}</div>
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">{description}</p>
        <Link 
          href="/" 
          className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-2xl font-bold transition-all shadow-lg shadow-blue-500/20"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
}
