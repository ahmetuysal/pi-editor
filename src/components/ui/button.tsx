import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "shadow",
        white: "shadow",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:enabled:bg-destructive/90",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        default: "h-8 p-2 px-4 text-xs sm:h-9 sm:text-sm",
        sm: "h-7 rounded-md px-2 text-xs sm:h-8 sm:px-3",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
        none: "rounded-md px-4",
      },
      on: {
        dark: "",
        light: "",
      },
    },
    compoundVariants: [
      {
        variant: "default",
        on: "light",
        className: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      {
        variant: "default",
        on: "dark",
        // Primary color toggling is done with dark class toggling className: "bg-primary-foreground text-primary hover:bg-primary-foreground/90",
        className: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      {
        variant: "white",
        on: "light",
        className: "bg-gray-900 text-white hover:bg-gray-900/90",
      },
      {
        variant: "white",
        on: "dark",
        className: "bg-white text-gray-900 hover:bg-white/90",
      },
      {
        variant: "link",
        on: "light",
        className: "text-primary",
      },
      {
        variant: "link",
        on: "dark",
        className: "text-white",
      },
      {
        variant: "outline",
        on: "light",
        className: "border-gray-300 text-gray-900 hover:bg-gray-50",
      },
      {
        variant: "outline",
        on: "dark",
        className: "border-gray-600 text-white hover:bg-gray-700",
      },
      {
        variant: "secondary",
        on: "light",
        className: "bg-gray-200 text-gray-900 hover:bg-gray-300",
      },
      {
        variant: "secondary",
        on: "dark",
        className: "bg-gray-700 text-white hover:bg-gray-600",
      },
      {
        variant: "destructive",
        on: "light",
        className: "bg-destructive text-destructive-foreground",
      },
      {
        variant: "destructive",
        on: "dark",
        className: "bg-destructive-foreground text-destructive",
      },
      {
        variant: "ghost",
        on: "light",
        className: "hover:bg-accent hover:text-accent-foreground",
      },
      {
        variant: "ghost",
        on: "dark",
        className: "text-white hover:bg-accent/80 hover:text-accent-foreground",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
      on: "light",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> &
  ({ asChild: true; loading?: never } | { asChild?: false; loading?: boolean });

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      on,
      asChild = false,
      loading,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className, on }))}
        ref={ref}
        {...props}
      >
        {loading ? (
          <>
            <svg
              className="-ml-1 mr-3 size-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
