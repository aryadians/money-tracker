<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Money Tracker') }}</title>

        <!-- SEO & Open Graph -->
        <meta name="description" content="Kelola keuangan pribadi jadi lebih ringan, cepat, dan aman dengan Money Tracker.">
        <meta property="og:title" content="Money Tracker - Smart Financial Management">
        <meta property="og:description" content="Catat pemasukan dan pengeluaran Anda dengan antarmuka modern dan performa super cepat.">
        <meta property="og:type" content="website">
        <meta property="og:image" content="/logo.svg">
        <meta name="theme-color" content="#0B0F19">

        <link rel="dns-prefetch" href="//fonts.bunny.net">
        <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💸</text></svg>">
        <link rel="manifest" href="/manifest.json">

        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-gray-900 text-white">
        @inertia
        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/service-worker.js');
                });
            }
        </script>
    </body>
</html>