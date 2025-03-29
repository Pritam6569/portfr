import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCursor } from "../hooks/use-cursor";

const CustomCursor = () => {
  const { cursorRef, cursorSize, updateCursorPosition, updateCursorSize } = useCursor();
  const [isVisible, setIsVisible] = useState(false);
  const [innerPosition, setInnerPosition] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);
  const [trailPositions, setTrailPositions] = useState<{x: number, y: number}[]>([]);

  useEffect(() => {
    // Set up event listeners
    const handleMouseMove = (e: MouseEvent) => {
      updateCursorPosition(e);
      setInnerPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      
      // Add position to trail with a limit of 5 positions
      setTrailPositions(prev => {
        const newPositions = [...prev, { x: e.clientX, y: e.clientY }];
        return newPositions.slice(-5);
      });
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    const handleMouseDown = () => {
      setClicking(true);
    };
    
    const handleMouseUp = () => {
      setClicking(false);
    };
    
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

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
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleElementEnter);
        element.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, [updateCursorPosition, updateCursorSize]);

  return isVisible ? (
    <>
      {/* Cursor trail effect */}
      {trailPositions.map((pos, index) => (
        <motion.div
          key={index}
          className="pointer-events-none fixed z-49 rounded-full bg-[var(--color-primary)]"
          style={{
            position: 'fixed',
            top: pos.y,
            left: pos.x,
            transform: 'translate(-50%, -50%)',
            opacity: 0.3 - (index * 0.05),
            width: 5 - (index * 0.8),
            height: 5 - (index * 0.8),
          }}
          initial={{ opacity: 0.3 - (index * 0.05) }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      ))}
    
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 rounded-full border-2 mix-blend-difference"
        style={{
          backdropFilter: cursorSize === 'large' ? 'blur(3px)' : 'none',
          background: cursorSize === 'large' ? 'rgba(100, 255, 218, 0.1)' : 'transparent',
          position: 'fixed',
          top: 0,
          left: 0,
          borderColor: clicking ? 'var(--color-highlight)' : 'var(--color-accent)'
        }}
        animate={{
          width: clicking ? 40 : (cursorSize === "large" ? 70 : 30),
          height: clicking ? 40 : (cursorSize === "large" ? 70 : 30),
          opacity: cursorSize === "large" ? 0.95 : 0.7,
          scale: clicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
        }}
      />
      
      {/* Inner cursor dot */}
      <motion.div
        className="pointer-events-none fixed z-50 rounded-full mix-blend-screen"
        style={{
          position: 'fixed',
          top: innerPosition.y,
          left: innerPosition.x,
          transform: 'translate(-50%, -50%)',
          background: clicking ? 'var(--color-highlight)' : 'var(--color-primary)',
        }}
        animate={{
          width: clicking ? 8 : 6,
          height: clicking ? 8 : 6,
          opacity: clicking ? 1 : 0.9,
        }}
        transition={{
          type: "tween",
          duration: 0.1,
        }}
      />
      
      {/* Highlight effect on click */}
      {clicking && (
        <motion.div
          className="pointer-events-none fixed z-48 rounded-full bg-[var(--color-highlight)]"
          style={{
            position: 'fixed',
            top: innerPosition.y,
            left: innerPosition.x,
            transform: 'translate(-50%, -50%)',
          }}
          initial={{ width: 0, height: 0, opacity: 0.7 }}
          animate={{ width: 50, height: 50, opacity: 0 }}
          transition={{ duration: 0.5 }}
        />
      )}
    </>
  ) : null;
};

export default CustomCursor;
