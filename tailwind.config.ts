import type { Config } from 'tailwindcss';
import { theme } from './public/theme.js';

export { theme } from './public/theme.js';

export default {
  content: ['./index.html', './src/**/*.{ts,vue,svelte}'],
  theme,
  variants: {
    extend: {},
  },
} satisfies Config;
