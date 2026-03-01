/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                google: {
                    'base': '#202124',
                    'surface': '#303134',
                    'blue': '#8AB4F8',
                    'purple': '#C58AF9',
                    'text': '#E8EAED',
                    'text-secondary': '#9AA0A6',
                },
            },
            fontFamily: {
                sans: ['"Google Sans"', '"Inter"', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.8s ease-out forwards',
                'fade-up': 'fadeUp 0.8s ease-out forwards',
                'slow-spin': 'spin 15s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeUp: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
            },
            backgroundImage: {
                'gemini-gradient': 'linear-gradient(135deg, #4285F4 0%, #9B72CB 50%, #D96570 100%)',
                'gemini-shine': 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)',
            },
        },
    },
    plugins: [],
}
