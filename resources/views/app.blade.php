<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="google-site-verification" content="03bEbgjU4pAfuLWMgSI0W-l5t9Fkv49LR20SKPJj_f8" />    <title>أوسكار للتسويق والتقييم العقاري</title>
    <meta name="description" content="أوسكار للتسويق والتقييم العقاري: شريكك الموثوق لخدمات البيع والشراء والتأجير . نقدم تسويقًا احترافيًا واستشارات دقيقة لجميع العقارات السكنية والتجارية والإدارية والتقييم العقارى." />
    <meta name="keywords" content="أوسكار للتسويق والتقييم العقاري, عقارات القاهرة, بيع شقق القاهرة, تأجير محلات تجارية, تسويق عقاري محترف, استشارات عقارية, شقق للبيع وسط البلد, عقارات تجارية للايجار, شركة عقارات في القاهرة" />
    <link rel="icon" type="image/x-icon" href="{{ asset('favicon-v2.ico') }}">
        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap" rel="stylesheet">

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased dark:bg-gray-950">
        @inertia
    </body>
</html>
