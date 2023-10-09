"use client";
import { MotionButton } from "@/ui/button";
import { motion } from "framer-motion";

export default function HomePage() {
  const animationDuration = 0.8;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <div className="grid grid-cols-2 gap-5">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: animationDuration }}
          className="col-span-full text-6xl uppercase place-self-center"
        >
          pong
        </motion.h1>
        <MotionButton animationDuration={animationDuration - 0.2} className="uppercase">
          cpu
        </MotionButton>
        <MotionButton animationDuration={animationDuration - 0.2} className="uppercase">
          online
        </MotionButton>
      </div>
    </main>
  );
}
