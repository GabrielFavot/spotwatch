// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    name: 'spotify-grid',
    rules: {
      '@stylistic/semi': ['error', 'always'],
    },
  },
);
