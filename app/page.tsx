import { Button } from "@/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-5">
      <div className="grid grid-cols-2 gap-5">
        <h1 className="col-span-full text-6xl uppercase place-self-center">pong</h1>
        <Button className="uppercase">cpu</Button>
        <Button className="uppercase">online</Button>
      </div>
    </main>
  );
}
