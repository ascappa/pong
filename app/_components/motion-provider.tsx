"use client"
import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";

export function MotionProvider({children}: {children: ReactNode}) {
  return <MotionConfig>{children}</MotionConfig>
}