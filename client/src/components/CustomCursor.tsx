import { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";

type CursorSize = "normal" | "large";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorSize, setCursorSize] = useState<CursorSize>("normal");
  const [isVisible, setIsVisible] = useState(false);
  const [innerPosition, setInnerPosition] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);
  const [trailPositions, setTrailPositions] = useState<{x: number, y: number, id: number}[]>([]);
  const trailIdRef = useRef(0);

  // Throttle mousemove events for better performance
  const throttle = useCallback((callback: Function, limit: number) => {
    let wait = false;
    return function(...args: any[]) {
      if (!wait) {
        callback(...args);
        wait = true;
        setTimeout(() => {
          wait = false;
        }, limit);
      }
    };
  }, []);

  const updateCursorPosition = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }
  }, []);

  const updateCursorSize = useCallback((size: CursorSize) => {
    setCursorSize(size);
  }, []);

  // Add positions to trail with throttling for performance
  const updateTrailPositions = useCallback(
    throttle((x: number, y: number) => {
      const id = trailIdRef.current++;
      setTrailPositions(prev => {
        const newPositions = [...prev, { x, y, id }];
        return newPositions.slice(-5); // Keep only the latest 5 positions
      });
    }, 50),
    []
  );

  useEffect(() => {
    // Skip on server-side rendering
    if (typeof document === 'undefined') return;
    
    // Don't initialize on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    // Set up event listeners
    const handleMouseMove = (e: MouseEvent) => {
      updateCursorPosition(e);
      setInnerPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      updateTrailPositions(e.clientX, e.clientY);
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

    // Use MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.addedNodes.length) {
          mutation.addedNodes.forEach(node => {
            if (node instanceof HTMLElement) {
              if (
                node.tagName === 'A' || 
                node.tagName === 'BUTTON' || 
                node.tagName === 'INPUT' || 
                node.tagName === 'TEXTAREA' ||
                node.getAttribute('role') === 'button'
              ) {
                node.addEventListener('mouseenter', handleElementEnter);
                node.addEventListener('mouseleave', handleElementLeave);
              }
              
              // Check children of added node
              const childInteractive = node.querySelectorAll('a, button, input, textarea, [role="button"]');
              childInteractive.forEach(el => {
                el.addEventListener('mouseenter', handleElementEnter);
                el.addEventListener('mouseleave', handleElementLeave);
              });
            }
          });
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
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
      
      observer.disconnect();
    };
  }, [updateCursorPosition, updateTrailPositions]);

  // Don't render cursor on touch devices or server-side
  if (typeof window === 'undefined' || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) {
    return null;
  }

  return isVisible ? (
    <>
      {/* Cursor trail effect */}
      {trailPositions.map((pos, index) => (
        <motion.div
          key={pos.id}
          className="pointer-events-none fixed z-49 rounded-full bg-[#4DA8FF]"
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
          borderColor: clicking ? '#FF7E67' : '#64FFDA'
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
          background: clicking ? '#FF7E67' : '#4DA8FF',
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
          className="pointer-events-none fixed z-48 rounded-full bg-[#FF7E67]"
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
