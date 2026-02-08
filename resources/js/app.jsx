import '../css/app.css';
import './bootstrap';
import { ThemeProvider } from './context/ThemeContext';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';


import { I18nextProvider } from 'react-i18next';
import i18n from './Pages/i18n';
import { HelmetProvider } from 'react-helmet-async';
const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <HelmetProvider>
            <ThemeProvider>
                <I18nextProvider i18n={i18n}>
                    <App {...props} />
                </I18nextProvider>
            </ThemeProvider>
            </HelmetProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
