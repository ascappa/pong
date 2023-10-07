import "./globals.css";
import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";

const font = Rajdhani({ weight: "500" });

export const metadata: Metadata = {
  title: "Pong",
  description: "Play pong with your friends!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
