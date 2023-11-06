"use client";
import { Paragraph } from "@/ui/paragraph";
import { Button } from "@/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
export function RoomMenu({ roomId }: { roomId: string }) {
  const layoutMode = true;
  return (
    <div className="flex min-h-[60%] max-w-lg flex-col items-center justify-end gap-16 text-center">
      <motion.div
        className="flex flex-col gap-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Paragraph>
          your room{"'"}s id is <br /> {roomId}
        </Paragraph>
        <Paragraph>waiting for your opponent...</Paragraph>
      </motion.div>
      <div className="flex flex-col gap-5">
        <Button
          asChild
          motionProps={{ layoutId: "online", layout: layoutMode }}
          className="uppercase"
        >
          <Link href={`/online/`}>online menu</Link>
        </Button>
        <Button
          asChild
          motionProps={{ layoutId: "main-menu", layout: layoutMode }}
          className="uppercase"
        >
          <Link href={`/`}>main menu</Link>
        </Button>
      </div>
    </div>
  );
}
