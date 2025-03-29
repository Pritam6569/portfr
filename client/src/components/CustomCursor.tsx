import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "../hooks/use-cursor";

const CustomCursor = () => {
  const { cursorRef, cursorSize, updateCursorPosition, updateCursorSize } = useCursor();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set up event listeners
    document.addEventListener("mousemove", updateCursorPosition);
    document.addEventListener("mouseenter", () => setIsVisible(true));
    document.addEventListener("mouseleave", () => setIsVisible(false));

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => updateCursorSize('large'));
      element.addEventListener('mouseleave', () => updateCursorSize('normal'));
    });

    return () => {
      // Clean up event listeners
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseenter", () => setIsVisible(true));
      document.removeEventListener("mouseleave", () => setIsVisible(false));
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', () => updateCursorSize('large'));
        element.removeEventListener('mouseleave', () => updateCursorSize('normal'));
      });
    };
  }, [updateCursorPosition, updateCursorSize]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 rounded-full border-2 border-[var(--color-accent)] mix-blend-difference"
        style={{
          display: isVisible ? "block" : "none",
          backdropFilter: cursorSize === 'large' ? 'blur(2px)' : 'none',
          background: cursorSize === 'large' ? 'rgba(100, 255, 218, 0.05)' : 'transparent',
        }}
        animate={{
          width: cursorSize === "large" ? 60 : 30,
          height: cursorSize === "large" ? 60 : 30,
          opacity: cursorSize === "large" ? 0.9 : 0.6,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      />
      
      {/* Inner cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-50 rounded-full bg-[var(--color-primary)] mix-blend-screen"
        style={{
          display: isVisible ? "block" : "none",
          top: cursorRef.current ? parseInt(cursorRef.current.style.top) + (cursorSize === "large" ? 27 : 12) : 0,
          left: cursorRef.current ? parseInt(cursorRef.current.style.left) + (cursorSize === "large" ? 27 : 12) : 0,
        }}
        animate={{
          width: 6,
          height: 6,
          opacity: 0.8,
        }}
        transition={{
          type: "tween",
          duration: 0.1,
        }}
      />
    </>
  );
};

export default CustomCursor;
