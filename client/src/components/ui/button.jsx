import React from "react";

/**
 * Wrapper for Shadcn Button component.
 * If you have a CLI-generated button component (button.tsx/jsx), replace the
 * body of this file to `export * from './button'` or re-export the component.
 *
 * This default provides a minimal Button so imports don't break.
 */

export function Button({ children, className = "", variant, ...props }) {
  // simple mapping for the "variant" prop (keeps existing classes working)
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const classes = `${base} ${className}`;
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;
