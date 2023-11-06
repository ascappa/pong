"use client";
import { Button } from "@/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function NotFound() {
  const [dotCount, setDotCount] = useState(3);
  useEffect(() => {
    let intervalId = setInterval(() => setDotCount((c) => (c % 3) + 1), 500);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <div className="flex flex-col gap-5 items-center">
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-7xl uppercase text-center"
      >
        coming soon <span className="w-10 inline-block text-left">{".".repeat(dotCount)}</span>
      </motion.h1>
      <Button
        asChild
        className="uppercase"
      >
        <Link href="/">main menu</Link>
      </Button>
    </div>
  );
}
