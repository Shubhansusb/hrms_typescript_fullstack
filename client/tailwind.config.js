/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#3B82F6', // blue-500
				accent: {
					green: '#10B981', // green-500
					amber: '#F59E0B', // amber-500
					red: '#EF4444', // red-500
				},
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
		},
	},
	plugins: [],
	darkMode: 'class',
};
