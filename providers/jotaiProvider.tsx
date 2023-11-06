"use client"
import { Provider, useAtom, useSetAtom } from "jotai";
import { ReactNode, useEffect } from "react";

export function JotaiProvider({children}: {children: ReactNode}) {
  return <Provider>{children}</Provider>
}