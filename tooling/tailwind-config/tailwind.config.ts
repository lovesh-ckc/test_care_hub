import type { Config } from 'tailwindcss';
import { colors, spacing, radius, shadow } from '@infinity/tokens';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        blue: colors.blue,
        green: colors.green,
        red: colors.red,
        amber: colors.amber,
      },
      spacing: spacing,
      borderRadius: radius,
      boxShadow: shadow,
    },
  },
  plugins: [],
};

export default config;
