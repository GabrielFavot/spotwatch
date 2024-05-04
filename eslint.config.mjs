// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    name: 'spotify-grid',
    rules: {
      '@stylistic/semi': ['error', 'always'],
      'no-empty': 'off',
      'vue/max-attributes-per-line': [
        'error',
        { singleline: 3 },
      ],
      '@stylistic/member-delimiter-style': 'error',
    },
  },
);
