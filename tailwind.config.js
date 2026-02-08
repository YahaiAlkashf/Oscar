import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Cairo", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: {
                    DEFAULT: "#A86B06",
                    dark: "#BF9D21",
                },
                background: {
                    dark: "#0F0F0F",
                    card: "#1A1A1A",
                    border: "#2A2A2A",
                },
                text: {
                    main: "#FFFFFF",
                    muted: "#A1A1AA",
                },
            },
        },
    },

    plugins: [forms],
};
