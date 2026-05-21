const preset = require('../../packages/tailwind-preset/tailwind.preset.js');

module.exports = {
  presets: [preset],
  content: [
    './src/**/*.{html,ts}',
    '../../packages/mfe-explore/src/**/*.{html,ts}',
    '../../packages/mfe-decide/src/**/*.{html,ts}',
    '../../packages/mfe-checkout/src/**/*.{html,ts}',
    '../../packages/ts-design-system/src/**/*.{html,ts}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
