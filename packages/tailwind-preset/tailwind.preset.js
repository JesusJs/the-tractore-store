module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        surface: 'var(--color-surface)',
        background: 'var(--color-background)',

        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
        },

        border: 'var(--color-border)',

        success: 'var(--color-success)',
      },

      fontFamily: {
        sans: ['Raleway', 'sans-serif'],
      },

      borderRadius: {
        pill: 'var(--radius-pill)',
      },

      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
      },
    },
  },
};