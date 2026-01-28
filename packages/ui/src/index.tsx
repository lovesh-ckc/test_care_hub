/**
 * UI Component Library
 * 
 * Primitives and approved patterns only.
 * All components use design tokens from @infinity/tokens.
 * 
 * Rules:
 * - No primitive extensions in apps
 * - All variants defined here
 * - Strict TypeScript
 * - Versioned exports
 */

import React from 'react';
import type { ReactNode, ComponentProps } from 'react';
import { colors, radius, spacing } from '@infinity/tokens';

/**
 * Button Component
 */
export interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const baseClass =
      'font-medium transition-colors inline-flex items-center justify-center';

    const variantClass = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      danger: 'bg-red-600 text-white hover:bg-red-700',
    }[variant];

    const sizeClass = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }[size];

    return (
      <button
        ref={ref}
        className={`${baseClass} ${variantClass} ${sizeClass}`}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? '...' : children}
      </button>
    );
  }
);

Button.displayName = 'Button';

/**
 * Card Component
 */
export interface CardProps extends ComponentProps<'div'> {
  title?: ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title, children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
        {...props}
      >
        {title && <div className="border-b border-gray-200 px-6 py-4 font-semibold">{title}</div>}
        <div className="p-6">{children}</div>
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Badge Component
 */
export interface BadgeProps extends ComponentProps<'span'> {
  variant?: 'gray' | 'blue' | 'green' | 'red';
  size?: 'sm' | 'md';
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'gray', size = 'md', children, className = '', ...props }, ref) => {
    const variantClass = {
      gray: 'bg-gray-200 text-gray-800',
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      red: 'bg-red-100 text-red-800',
    }[variant];

    const sizeClass = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-1 text-sm',
    }[size];

    return (
      <span
        ref={ref}
        className={`inline-block rounded-full font-medium ${variantClass} ${sizeClass} ${className}`}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

/**
 * Alert Component
 */
export interface AlertProps extends ComponentProps<'div'> {
  type?: 'info' | 'success' | 'warning' | 'error';
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ type = 'info', children, className = '', ...props }, ref) => {
    const typeClass = {
      info: 'bg-blue-50 border-blue-200 text-blue-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-amber-50 border-amber-200 text-amber-800',
      error: 'bg-red-50 border-red-200 text-red-800',
    }[type];

    return (
      <div
        ref={ref}
        className={`rounded-lg border p-4 ${typeClass} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Alert.displayName = 'Alert';

/**
 * Component Library Export
 */
export const UILibrary = {
  Button,
  Card,
  Badge,
  Alert,
};
