"use client";
import { Button } from "@/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

import { useSearchParams } from "next/navigation";
import { useAtomValue } from "jotai";
import { isFirstVisitAtom } from "@/stores/genericStore";

export function MainMenu() {
  const isFirstVisit = useAtomValue(isFirstVisitAtom);
  const animationDuration = 0.8;
  const willAnimate = isFirstVisit;
  return (
    <div className="grid grid-cols-[repeat(2,_minmax(19ch,_auto))] gap-4 gap-y-6">
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
        motionProps={{ layoutId: "cpu", layout: true }}
        animationDuration={animationDuration}
        className="uppercase"
      >
        <Link href="/cpu">cpu</Link>
      </Button>

      <Button
        asChild
        drawButton={willAnimate}
        motionProps={{ layoutId: "online", layout: true }}
        animationDuration={animationDuration}
        className="uppercase"
      >
        <Link href="/online">online</Link>
      </Button>
    </div>
  );
}
