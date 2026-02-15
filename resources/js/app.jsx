import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = import.meta.env.VITE_APP_NAME || 'Money Tracker';

createInertiaApp({
    title: (title) => title ? `${title} - Money Tracker` : 'Money Tracker',

    // Bagian ini mencari file halaman di folder Pages
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),

    setup({ el, App, props }) {
        const root = createRoot(el);

        // --- PERBAIKAN PENTING ---
        // Kita wajib mengirim {...props} ke komponen <App />.
        // Jika ini hilang, fungsi route() dan data user tidak akan terbaca (Layar Putih).
        root.render(<App {...props} />);
    },

    progress: {
        color: '#4B5563', // Warna loading bar di atas browser
    },
});