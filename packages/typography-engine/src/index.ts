/**
 * Typography Engine
 * 
 * Manages typography scaling, hierarchy, and consistency
 * across all applications using design tokens.
 */

import { typography } from '@infinity/tokens';

export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';
export type TextWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black';

/**
 * Typography Scale
 */
export const TypographyScale = {
  h1: {
    size: '5xl' as TextSize,
    weight: 'bold' as TextWeight,
    lineHeight: '1.2',
    letterSpacing: '-0.02em',
  },
  h2: {
    size: '4xl' as TextSize,
    weight: 'bold' as TextWeight,
    lineHeight: '1.3',
  },
  h3: {
    size: '3xl' as TextSize,
    weight: 'semibold' as TextWeight,
    lineHeight: '1.4',
  },
  h4: {
    size: '2xl' as TextSize,
    weight: 'semibold' as TextWeight,
    lineHeight: '1.4',
  },
  h5: {
    size: 'xl' as TextSize,
    weight: 'semibold' as TextWeight,
    lineHeight: '1.5',
  },
  h6: {
    size: 'lg' as TextSize,
    weight: 'semibold' as TextWeight,
    lineHeight: '1.5',
  },
  body: {
    size: 'base' as TextSize,
    weight: 'normal' as TextWeight,
    lineHeight: '1.6',
  },
  bodySm: {
    size: 'sm' as TextSize,
    weight: 'normal' as TextWeight,
    lineHeight: '1.5',
  },
  caption: {
    size: 'xs' as TextSize,
    weight: 'normal' as TextWeight,
    lineHeight: '1.4',
  },
} as const;

/**
 * Create typography class
 */
export function createTypographyClass(
  preset: keyof typeof TypographyScale,
  className?: string
): string {
  const config = TypographyScale[preset];
  const [fontSize] = typography.fontSize[config.size as TextSize] as [string, { lineHeight: string }];
  const fontWeight = typography.fontWeight[config.weight];

  return [
    `text-${config.size}`,
    `font-${config.weight}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');
}

/**
 * Get typography config
 */
export function getTypographyConfig(preset: keyof typeof TypographyScale) {
  return TypographyScale[preset];
}

/**
 * Responsive Typography
 */
export const ResponsiveTypography = {
  // Large displays
  display: {
    mobile: TypographyScale.h2,
    tablet: TypographyScale.h1,
    desktop: TypographyScale.h1,
  },
  // Page headings
  pageTitle: {
    mobile: TypographyScale.h2,
    tablet: TypographyScale.h1,
    desktop: TypographyScale.h1,
  },
  // Section headings
  sectionTitle: {
    mobile: TypographyScale.h4,
    tablet: TypographyScale.h3,
    desktop: TypographyScale.h3,
  },
  // Body text
  body: {
    mobile: TypographyScale.bodySm,
    tablet: TypographyScale.body,
    desktop: TypographyScale.body,
  },
};
