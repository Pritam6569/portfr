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

    const links = document.querySelectorAll('a, button');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', () => updateCursorSize('large'));
      link.addEventListener('mouseleave', () => updateCursorSize('normal'));
    });

    return () => {
      // Clean up event listeners
      document.removeEventListener("mousemove", updateCursorPosition);
      document.removeEventListener("mouseenter", () => setIsVisible(true));
      document.removeEventListener("mouseleave", () => setIsVisible(false));
      
      links.forEach(link => {
        link.addEventListener('mouseenter', () => updateCursorSize('large'));
        link.addEventListener('mouseleave', () => updateCursorSize('normal'));
      });
    };
  }, [updateCursorPosition, updateCursorSize]);

  return (
    <motion.div
      ref={cursorRef}
      className="custom-cursor pointer-events-none fixed z-50 mix-blend-difference"
      style={{
        display: isVisible ? "block" : "none",
      }}
      animate={{
        width: cursorSize === "large" ? 50 : 20,
        height: cursorSize === "large" ? 50 : 20,
        backgroundColor: cursorSize === "large" ? "#FF6584" : "#6C63FF",
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    />
  );
};

export default CustomCursor;
