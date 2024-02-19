import React from "react";
import { PlateContent } from "@udecode/plate-common";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import type { PlateContentProps } from "@udecode/plate-common";
import type { VariantProps } from "class-variance-authority";

const editorVariants = cva(
  cn(
    "relative overflow-x-auto whitespace-pre-wrap break-words",
    "w-full rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none",
    "[&_[data-slate-placeholder]]:text-muted-foreground [&_[data-slate-placeholder]]:!opacity-100",
    "[&_[data-slate-placeholder]]:top-[auto_!important]",
    "[&_strong]:font-bold",
  ),
  {
    variants: {
      variant: {
        outline: "border border-input",
        ghost: "",
      },
      focused: {
        true: "ring-2 ring-ring ring-offset-2",
      },
      disabled: {
        true: "cursor-not-allowed opacity-50",
      },
      focusRing: {
        true: "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        false: "",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
      },
      dense: {
        true: "py-1",
        false: "px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "outline",
      focusRing: true,
      size: "sm",
      dense: false,
    },
  },
);

export type EditorProps = PlateContentProps &
  VariantProps<typeof editorVariants> & {
    containerClassName?: string;
  };

const Editor = React.forwardRef<HTMLDivElement, EditorProps>(
  (
    {
      className,
      containerClassName,
      disabled,
      focused,
      focusRing,
      readOnly,
      dense,
      size,
      variant,
      ...props
    },
    ref,
  ) => {
    return (
      <div ref={ref} className={cn("relative w-full", containerClassName)}>
        <PlateContent
          className={cn(
            editorVariants({
              disabled,
              focused,
              focusRing,
              size,
              variant,
              dense,
            }),
            className,
          )}
          disableDefaultStyles
          readOnly={disabled ?? readOnly}
          aria-disabled={disabled}
          {...props}
        />
      </div>
    );
  },
);
Editor.displayName = "Editor";

export { Editor };
