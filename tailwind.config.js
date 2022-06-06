module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  media: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ['Poppins', 'system-ui', 'sans-serif'],
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/images/hero-pattern.png')",
        'card-texture': "url('https://res.cloudinary.com/spacejoy/image/upload/v1652948828/Mesh_Bg_asjn3i.png')",
        vector: "url('https://res.cloudinary.com/spacejoy/image/upload/v1653652981/Dotted_Vector_jcdmmi.svg')",
      },
      borderWidth: ['last', 'first'],
      colors: {
        'spj-red': '#F5296E',
        'spj-yellow': '#F39C12',
      },
      shadows: {
        'spj-red': '0 2px 4px 0 #FFC6C6',
      },
      keyframes: {
        pulseDot: {
          '0%': {
            opacity: '100',
            transform: 'scale(0.5)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(1.5)',
          },
        },
      },
      animation: {
        pulseDot: 'pulseDot 1s infinite',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
  ],
};
