"use client";
import { Button } from "@/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useRenderCount } from "@uidotdev/usehooks";
import { useSearchParams } from "next/navigation";
import { useAtom } from "jotai";
import { isFirstVisitAtom } from "@/stores/genericStore";

export default function HomePage() {
  const [isFirstVisit, setIsFirstVisit] = useAtom(isFirstVisitAtom);
  const searchParams = useSearchParams();
  const animationDuration = 0.8;
  const willAnimate = isFirstVisit;
  useEffect(() => {
    setIsFirstVisit(false);
  }, [setIsFirstVisit]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <div className="grid grid-cols-[20ch_20ch] gap-5 gap-y-7">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: animationDuration }}
          className="col-span-full text-7xl uppercase place-self-center"
        >
          pong
        </motion.h1>
        <Button
          asChild
          drawButton={willAnimate}
          outerProps={{ layoutId: "cpu", layout: true }}
          animationDuration={animationDuration}
          className="uppercase"
        >
          <Link href="/cpu">cpu</Link>
        </Button>
        <Button
          asChild
          drawButton={willAnimate}
          outerProps={{ layoutId: "online", layout: true }}
          animationDuration={animationDuration}
          className="uppercase"
        >
          <Link href="/online">online</Link>
        </Button>
      </div>
    </main>
  );
}
