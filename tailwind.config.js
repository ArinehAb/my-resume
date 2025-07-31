// tailwind.config.js (optional in v4)
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
        sans: ['"Open Sans"', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s ease-in-out infinite',
        'loading-dots': 'dots 1.2s steps(3, end) infinite',
      },
      keyframes: {
        dots: {
          '0%, 20%': { content: "' '" },
          '40%': { content: "' .'" },
          '60%': { content: "' ..'" },
          '80%, 100%': { content: "' ...'" },
        },
      },
    },
  },
  plugins: [],
};
