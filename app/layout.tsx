import "./globals.css";
import { JotaiProvider } from "@/providers/jotaiProvider";
import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import { cn } from "@/lib/cn";

const font = Rajdhani({ weight: "500", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pong",
  description: "Play pong with your friends!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(font.className, "bg-stone-950 text-stone-50")} >
          <JotaiProvider>{children}</JotaiProvider>
      </body>
    </html>
  );
}
