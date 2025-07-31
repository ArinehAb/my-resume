// craco.config.js
module.exports = {
  style: {
    postcss: {
      plugins: [
        require("@tailwindcss/postcss"),  // ✅ new Tailwind v4 PostCSS plugin
        require("autoprefixer"),
      ],
    },
  },
};
