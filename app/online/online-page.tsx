"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
export default function OnlinePage() {
  const animationDuration = 0.7;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <div className="grid grid-cols-[20ch] gap-5">
        <Button
          asChild
          outerProps={{ layoutId: "cpu", layout: true }}
          drawButton={false}
          animationDuration={animationDuration}
          className="uppercase"
        >
          <Link href="/cpu">cpu</Link>
        </Button>
        <Button
          asChild
          outerProps={{ layoutId: "online", layout: true }}
          drawButton={false}
          animationDuration={animationDuration}
          className="uppercase"
        >
          <Link href="/">online</Link>
        </Button>
        <AnimatePresence>
          <Button
            exit={{ opacity: 0 }}
            asChild
            drawButton={false}
            animationDuration={animationDuration}
            className="uppercase"
          >
            <Link href="/">main menu</Link>
          </Button>
        </AnimatePresence>
      </div>
    </main>
  );
}
