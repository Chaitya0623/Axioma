import React from "react";
import { cn } from "@/lib/utils"; // Utility function for conditional classnames, if you don't have this, remove it or replace with `clsx`

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm",
        "focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        props.className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
