import { useRef, useState, useCallback } from "react";

type CursorSize = "normal" | "large";

export const useCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorSize, setCursorSize] = useState<CursorSize>("normal");

  const updateCursorPosition = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }
  }, []);

  const updateCursorSize = useCallback((size: CursorSize) => {
    setCursorSize(size);
  }, []);

  return {
    cursorRef,
    cursorSize,
    updateCursorPosition,
    updateCursorSize,
  };
};
