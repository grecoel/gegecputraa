/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                apple: {
                    'bg': '#FAFAFA',
                    'surface': '#1C1C1E',
                    'orange': '#FF6B00',
                    'amber': '#FF9500',
                    'text': '#1D1D1F',
                    'text-secondary': '#86868B',
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
                'accent-gradient': 'linear-gradient(135deg, #FF6B00 0%, #FF9500 50%, #FFB340 100%)',
                'accent-shine': 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.06) 50%, transparent 60%)',
            },
        },
    },
    plugins: [],
}
