/**
 * Design Tokens
 * 
 * Single source of truth for spacing, colors, typography, and motion.
 * Used by both Tailwind and component libraries.
 * 
 * Token-driven architecture ensures:
 * - Consistency across all apps
 * - Centralized theming
 * - Type-safe design decisions
 */

// Spacing Scale (rem units)
export const spacing = {
  '0': '0',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '2': '0.5rem',
  '3': '0.75rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '10': '2.5rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '28': '7rem',
  '32': '8rem',
  '36': '9rem',
  '40': '10rem',
  '44': '11rem',
  '48': '12rem',
  '52': '13rem',
  '56': '14rem',
  '60': '15rem',
  '64': '16rem',
  '72': '18rem',
  '80': '20rem',
  '96': '24rem',
} as const;

// Color Palette
export const colors = {
  // Neutral
  white: '#FFFFFF',
  black: '#000000',
  gray: {
    '50': '#F9FAFB',
    '100': '#F3F4F6',
    '200': '#E5E7EB',
    '300': '#D1D5DB',
    '400': '#9CA3AF',
    '500': '#6B7280',
    '600': '#4B5563',
    '700': '#374151',
    '800': '#1F2937',
    '900': '#111827',
  },
  // Primary
  blue: {
    '50': '#EFF6FF',
    '100': '#DBEAFE',
    '500': '#3B82F6',
    '600': '#2563EB',
    '700': '#1D4ED8',
  },
  // Secondary
  indigo: {
    '50': '#EEF2FF',
    '500': '#6366F1',
    '600': '#4F46E5',
  },
  // Success
  green: {
    '50': '#F0FDF4',
    '500': '#22C55E',
    '600': '#16A34A',
  },
  // Warning
  amber: {
    '50': '#FFFBEB',
    '500': '#F59E0B',
    '600': '#D97706',
  },
  // Error
  red: {
    '50': '#FEF2F2',
    '500': '#EF4444',
    '600': '#DC2626',
  },
} as const;

// Border Radius
export const radius = {
  'none': '0',
  'sm': '0.125rem',
  'base': '0.25rem',
  'md': '0.375rem',
  'lg': '0.5rem',
  'xl': '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  'full': '9999px',
} as const;

// Typography
export const typography = {
  fontSize: {
    'xs': ['0.75rem', { lineHeight: '1rem' }],
    'sm': ['0.875rem', { lineHeight: '1.25rem' }],
    'base': ['1rem', { lineHeight: '1.5rem' }],
    'lg': ['1.125rem', { lineHeight: '1.75rem' }],
    'xl': ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
  },
  fontWeight: {
    'thin': 100,
    'extralight': 200,
    'light': 300,
    'normal': 400,
    'medium': 500,
    'semibold': 600,
    'bold': 700,
    'extrabold': 800,
    'black': 900,
  },
  letterSpacing: {
    'tighter': '-0.05em',
    'tight': '-0.025em',
    'normal': '0em',
    'wide': '0.025em',
    'wider': '0.05em',
    'widest': '0.1em',
  },
} as const;

// Motion / Animation
export const motion = {
  duration: {
    'fast': '150ms',
    'base': '200ms',
    'slow': '300ms',
    'slower': '500ms',
  },
  easing: {
    'linear': 'linear',
    'in': 'cubic-bezier(0.4, 0, 1, 1)',
    'out': 'cubic-bezier(0, 0, 0.2, 1)',
    'inout': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

// Shadow
export const shadow = {
  'none': 'none',
  'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  'base': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
} as const;

/**
 * Token Types for Type Safety
 */
export type Spacing = keyof typeof spacing;
export type ColorKey = keyof typeof colors;
export type Radius = keyof typeof radius;
export type MotionDuration = keyof typeof motion.duration;
export type MotionEasing = keyof typeof motion.easing;

/**
 * Token Export for CSS
 */
export const tokenSet = {
  spacing,
  colors,
  radius,
  typography,
  motion,
  shadow,
};
