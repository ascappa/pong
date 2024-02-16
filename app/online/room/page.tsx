"use client";
import { motion } from "framer-motion";
import { Button } from "@/ui/button";
import Link from "next/link";
import { useState } from "react";
export default function Room() {
  const layoutMode = true;
  const [roomToJoin, setRoomToJoin] = useState("")
  return (
    <motion.div className="flex min-h-[40%] flex-col items-center justify-end gap-4">
      <motion.input
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="rounded-lg border-2 border-white bg-black p-3 pr-10 uppercase"
        type="text"
        placeholder="please enter a valid id..."
        onChange={(e) => {
          setRoomToJoin(e.target.value)
        }}
      />
      <div className="grid grid-cols-[minmax(19ch,_auto)] gap-5 ">
        <Button
          asChild
          motionProps={{ layoutId: "online", layout: layoutMode }}
        >
          <Link href={"/online/room/" + roomToJoin}>join room</Link>
        </Button>
        <Button
          asChild
          motionProps={{ layoutId: "main-menu", layout: layoutMode }}
        >
          <Link href={`/online`}>back</Link>
        </Button>
      </div>
    </motion.div>
  );
}
