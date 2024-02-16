"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/cn";
import { motion, MotionProps, Variants } from "framer-motion";
import { ClassValue } from "class-variance-authority/types";

const buttonVariants = cva(
  "inline-flex relative items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-zinc-950 dark:focus-visible:ring-zinc-300",
  {
    variants: {
      variant: {
        primary:
          "text-zinc-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-50/90",
        destructive:
          "bg-red-500 text-zinc-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-zinc-50 dark:hover:bg-red-900/90",
        outline:
          "border border-zinc-200 bg-white hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        secondary:
          "bg-zinc-100 text-zinc-900 hover:bg-zinc-100/80 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-800/80",
        ghost:
          "hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50",
        link: "text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-50",
      },
      size: {
        sm: "px-4 h-7 text-base",
        md: "px-6 h-9 text-lg",
        lg: "px-8 h-11 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  drawButton?: boolean;
  animationDuration?: number;
  letterSpread?: boolean;
  outerClass?: ClassValue;
  motionProps?: MotionProps & { key?: string };
  motionKey?: string;
}

const CvaButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      drawButton = false,
      animationDuration = 0.8,
      motionProps: outerProps,
      motionKey,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const container: Variants = {
      hidden: {
        opacity: 0,
      },
      show: {
        opacity: 1,
        transition: {
          duration: animationDuration + 0.2,
        },
      },
    };
    return (
      <motion.div
        className={cn("relative inline-flex items-center justify-center", className)}
        initial={drawButton && "hidden"}
        animate="show"
        variants={container}
        {...outerProps}
      >
        <Comp
          className={cn(
            buttonVariants({ variant, size,}),
            "z-10 w-full uppercase",
            
          )}
          ref={ref}
          {...props}
        />
        <motion.svg
          viewBox="0 0 135 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute"
        >
          <motion.g strokeWidth={2} className="stroke-current">
            <motion.path
              d="M134 1H6.11538L1 6.11538V31.6923"
              initial={drawButton && { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: animationDuration }}
            />
            <motion.path
              d="M1 36.8077H128.885L134 31.6923V6.11537"
              initial={drawButton && { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: animationDuration }}
            />
          </motion.g>
        </motion.svg>
        {/* <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: animationDuration }}
          className="z-10"
        >
          {props.children}
        </motion.span> */}
      </motion.div>
    );
  },
);
CvaButton.displayName = "Button";
const Button = motion(CvaButton);

export { Button, buttonVariants };
