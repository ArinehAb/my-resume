module.exports = {
  style: {
    postcss: {
      // "extends" merges with CRA's existing postcss-loader config
      mode: "extends",
      loaderOptions: {
        postcssOptions: {
          plugins: [
            require("tailwindcss"),   // Tailwind v3
            require("autoprefixer"),
          ],
        },
      },
    },
  },
};
