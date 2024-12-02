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
        'black-friday':
          "url('https://res.cloudinary.com/spacejoy/image/upload/v1732728783/spj-v2/strip_10_ijg5sr.webp')",
        'black-friday-design':
          "url('https://res.cloudinary.com/spacejoy/image/upload/fl_lossy,q_auto/v1732694005/spj-v2/Black-Friday-sale/DElight_5_kc3zjo.webp')",
        'cyber-monday':
          'url(https://res.cloudinary.com/spacejoy/image/upload/v1733146640/spj-v2/cyber-monday-sale/Purple_and_White_Futuristic_Artificial_Intelligence_Benefits_Instagram_Post_w626h0.png)',
        'cyber-monday-design':
          'url(https://res.cloudinary.com/spacejoy/image/upload/v1733147319/spj-v2/cyber-monday-sale/DElight_2_em6y3k.png)',
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
