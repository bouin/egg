/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './ContentBlocks/**/*.html',
        './Resources/Private/**/*.html',
        './Resources/Public/Assets/Src/**/*.js',
        './Classes/**/*.php',
        './Configuration/**/*.typoscript',
        './Configuration/**/*.yaml',
    ],
    safelist: [
        'link-fixed',
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};