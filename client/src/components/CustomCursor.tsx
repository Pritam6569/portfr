import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "../hooks/use-cursor";

const CustomCursor = () => {
  const { cursorRef, cursorSize, updateCursorPosition, updateCursorSize } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [innerPosition, setInnerPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Set up event listeners
    const handleMouseMove = (e: MouseEvent) => {
      updateCursorPosition(e);
      setInnerPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Handle interactive elements
    const handleElementEnter = () => updateCursorSize('large');
    const handleElementLeave = () => updateCursorSize('normal');
    
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleElementEnter);
      element.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      // Clean up event listeners
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleElementEnter);
        element.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, [updateCursorPosition, updateCursorSize]);

  return isVisible ? (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 rounded-full border-2 border-[var(--color-accent)] mix-blend-difference"
        style={{
          backdropFilter: cursorSize === 'large' ? 'blur(2px)' : 'none',
          background: cursorSize === 'large' ? 'rgba(100, 255, 218, 0.05)' : 'transparent',
          position: 'fixed',
          top: 0,
          left: 0,
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
          position: 'fixed',
          top: innerPosition.y,
          left: innerPosition.x,
          transform: 'translate(-50%, -50%)',
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
  ) : null;
};

export default CustomCursor;
