const preset = require('../tailwind-preset/tailwind.preset.js');

module.exports = {
  presets: [preset],
  content: [
    './src/**/*.{html,ts}',
    '../ts-design-system/src/**/*.{html,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
