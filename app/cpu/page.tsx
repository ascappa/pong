import { Button } from "@/ui/button";
import { Pong } from "./pong";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col items-center gap-4">
      <Pong />
      <Button motionProps={{ layoutId: "cpu" }} asChild className="w-[19ch]">
        <Link href="/">back</Link>
      </Button>
    </div>
  );
}
