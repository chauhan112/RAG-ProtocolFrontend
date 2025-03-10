/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#ff1717",
                secondary: "#d32b2b",
                dark: "#212b35",
                grey: "#f4f5f7",
            },
        },
    },
    plugins: [],
};
