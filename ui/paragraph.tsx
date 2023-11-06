import { cn } from "@/lib/cn";
import { HTMLAttributes } from "react";

type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;

export function Paragraph({ className, children, ...props }: ParagraphProps) {
  return (
    <p className={cn(className, "uppercase text-3xl")} {...props}>
      {children}
    </p>
  );
}
