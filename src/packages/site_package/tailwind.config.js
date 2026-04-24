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
        'link-fixed',
        'min-h-[280px]',
        'md:min-h-[360px]',
        'min-h-[420px]',
        'md:min-h-[520px]',
        'min-h-[560px]',
        'md:min-h-[700px]',
        'text-white',
        'text-[#48433F]',
        'bg-[#48433F]',
        'bg-[#F6F2EC]',
        'bg-[#D3D6D7]',
        'bg-[#E1DCD7]'
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};