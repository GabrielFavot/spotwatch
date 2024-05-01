// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    name: 'access-42-audit',
    rules: {
      '@stylistic/semi': ['error', 'always'],
    },
  },
);
