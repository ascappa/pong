import "./globals.css";
import { JotaiProvider } from "@/providers/jotaiProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { cn } from "@/lib/cn";
import { VisitTracker } from "./_components/visit-tracker";
import { MotionProvider } from "./_components/motion-provider";

const font = localFont({
  src: "./_fonts/Rajdhani-Regular.ttf",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pong",
  description: "Play pong with your friends!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(font.className, "bg-stone-950 text-stone-50")}>
        <JotaiProvider>
          <MotionProvider>
            <VisitTracker>
              <main className="flex h-[100dvh] items-center justify-center p-5">
                {children}
              </main>
            </VisitTracker>
          </MotionProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
