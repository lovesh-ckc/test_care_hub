/**
 * Layout Engine
 * 
 * Provides layout utilities and components that enforce
 * spacing and alignment rules across the platform.
 */

import { spacing } from '@infinity/tokens';

export interface LayoutConfig {
  maxWidth?: string;
  gutter?: keyof typeof spacing;
  breakpoint?: 'mobile' | 'tablet' | 'desktop';
}

/**
 * Calculate responsive spacing
 */
export function getResponsiveSpacing(
  breakpoint: LayoutConfig['breakpoint'],
  base: keyof typeof spacing
): string {
  const spacingMap: Record<NonNullable<LayoutConfig['breakpoint']>, Record<keyof typeof spacing, string>> = {
    mobile: {
      ...spacing,
    },
    tablet: {
      ...spacing,
    },
    desktop: {
      ...spacing,
    },
  };

  return spacingMap[breakpoint || 'desktop'][base];
}

/**
 * Layout Presets
 */
export const LayoutPresets = {
  container: {
    mobile: 'w-full px-4',
    tablet: 'w-full px-6',
    desktop: 'w-full max-w-7xl mx-auto px-8',
  },
  grid: {
    mobile: 'grid-cols-1 gap-4',
    tablet: 'grid-cols-2 gap-6',
    desktop: 'grid-cols-3 gap-8',
  },
  flex: {
    center: 'flex items-center justify-center',
    between: 'flex items-center justify-between',
    start: 'flex items-start justify-start',
    end: 'flex items-end justify-end',
  },
};

/**
 * Grid Layout System
 */
export interface GridProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: keyof typeof spacing;
  className?: string;
}

export function createGridClass(props: GridProps): string {
  const colMap = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    6: 'grid-cols-6',
    12: 'grid-cols-12',
  };

  const gapMap = {
    4: 'gap-4',
    6: 'gap-6',
    8: 'gap-8',
  };

  const gapKey = (props.gap ?? 4) as keyof typeof gapMap;
  return `grid ${colMap[props.cols || 1]} ${gapMap[gapKey]} ${props.className || ''}`.trim();
}
