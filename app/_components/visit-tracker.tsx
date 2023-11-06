"use client";
import { isFirstVisitAtom } from "@/stores/genericStore";
import { useSetAtom } from "jotai";
import { ReactNode, useEffect } from "react";

export function VisitTracker({ children }: { children: ReactNode }) {
  const setIsFirstVisit = useSetAtom(isFirstVisitAtom);
  useEffect(() => {
    setIsFirstVisit(false);
  }, [setIsFirstVisit]);
  return <>{children}</>;
}
