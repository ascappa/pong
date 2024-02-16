"use client";
import {motion} from "framer-motion"
import { Button } from "@/ui/button";
import Link from "next/link";
import { isFirstVisitAtom } from "@/stores/genericStore";
import { useAtomValue } from "jotai";
import { customAlphabet } from "nanoid";
import { alphanumeric } from "nanoid-dictionary"
export function OnlineMenu() {
  const isFirstVisit = useAtomValue(isFirstVisitAtom);
  const layoutMode = true
  const nanoid = customAlphabet(alphanumeric, 10)
  const roomId = nanoid()
  return (
    <motion.div className="grid place-content-center grid-cols-[minmax(19ch,_auto)] gap-5">
      <Button asChild motionProps={{ layoutId: "cpu", layout: layoutMode }} className="uppercase">
        <Link href="/online/room">join room</Link>
      </Button>
      <Button asChild motionProps={{ layoutId: "online", layout: layoutMode }} className="uppercase">
        <Link href={`/online/room/${roomId}`}>create room</Link>
      </Button>
      <Button
        motionProps={{
          initial: { opacity: isFirstVisit ? 1 : 0 },
          animate: { opacity: 1 },
          layoutId: "main-menu"
        }}
        asChild
        className="uppercase"
      >
        <Link href="/">main menu</Link>
      </Button>
    </motion.div>
  );
}
