import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

type CursorSize = "normal" | "large";
type TrailElement = { x: number; y: number; id: number; type: string; rotation: number; color: string };

// Whimsical code elements for the cursor trail
const codeElements = [
  { char: "{", type: "bracket" },
  { char: "}", type: "bracket" },
  { char: "<", type: "angle" },
  { char: ">", type: "angle" },
  { char: "(", type: "paren" },
  { char: ")", type: "paren" },
  { char: "[]", type: "array" },
  { char: ";", type: "semicolon" },
  { char: "//", type: "comment" },
  { char: "*", type: "asterisk" },
  { char: "=", type: "equal" },
  { char: ":", type: "colon" },
  { char: "&&", type: "logical" },
  { char: "||", type: "logical" },
  { char: "=>", type: "arrow" },
  { char: "import", type: "keyword" },
  { char: "const", type: "keyword" },
  { char: "let", type: "keyword" },
  { char: "return", type: "keyword" },
  { char: "if", type: "keyword" },
  { char: "export", type: "keyword" },
];

// Theme colors for cursor elements
const colorPalette = ['#4DA8FF', '#64FFDA', '#FF7E67', '#9580FF', '#3FDAA4', '#F95738'];

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorSize, setCursorSize] = useState<CursorSize>("normal");
  const [isVisible, setIsVisible] = useState(false);
  const [innerPosition, setInnerPosition] = useState({ x: 0, y: 0 });
  const [clicking, setClicking] = useState(false);
  const [trailElements, setTrailElements] = useState<TrailElement[]>([]);
  const trailIdRef = useRef(0);
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 });
  const lastMousePosition = useRef({ x: 0, y: 0 });
  const [lastColorIndex, setLastColorIndex] = useState(0);
  // For special burst effects on click
  const [burstElements, setBurstElements] = useState<Array<{ id: number; x: number; y: number; angle: number; distance: number; char: string; color: string }>>([]);
  const burstIdRef = useRef(0);

  // Create a special 'Pritam' trail that occasionally appears
  const [showNameTrail, setShowNameTrail] = useState(false);
  const nameLetters = useMemo(() => 'Pritam'.split(''), []);

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

  // Calculate mouse velocity for dynamic trail effects
  const calculateVelocity = useCallback((e: MouseEvent) => {
    const dx = e.clientX - lastMousePosition.current.x;
    const dy = e.clientY - lastMousePosition.current.y;
    
    // Update velocity with some smoothing
    setMouseVelocity(prev => ({
      x: prev.x * 0.8 + dx * 0.2,
      y: prev.y * 0.8 + dy * 0.2
    }));
    
    lastMousePosition.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Get a new color from the palette that's different from the last one
  const getNextColor = useCallback(() => {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * colorPalette.length);
    } while (newIndex === lastColorIndex && colorPalette.length > 1);
    
    setLastColorIndex(newIndex);
    return colorPalette[newIndex];
  }, [lastColorIndex]);

  // Add elements to trail with throttling for performance
  const updateTrailElements = useCallback(
    throttle((x: number, y: number) => {
      const id = trailIdRef.current++;
      const velocityMagnitude = Math.sqrt(mouseVelocity.x ** 2 + mouseVelocity.y ** 2);
      
      // Randomly select a trail element type based on velocity
      let elementType: string;
      if (velocityMagnitude > 15) {
        // For fast movements, use more dynamic symbols
        elementType = Math.random() < 0.7 ? 'code' : 'particle';
      } else {
        // For slower movements, use more text and brackets
        elementType = Math.random() < 0.4 ? 'code' : 'particle';
      }
      
      // Special case: occasionally show the name trail
      if (Math.random() < 0.01 && !showNameTrail) {
        setShowNameTrail(true);
        setTimeout(() => setShowNameTrail(false), 3000);
      }
      
      const rotation = Math.random() * 360;
      const color = getNextColor();
      
      setTrailElements(prev => {
        const newElements = [...prev, { x, y, id, type: elementType, rotation, color }];
        // Keep more elements for a more substantial trail
        return newElements.slice(-12);
      });
    }, 30),
    [mouseVelocity, getNextColor, showNameTrail]
  );

  // Create a burst of elements on click
  const createBurst = useCallback((x: number, y: number) => {
    const burstCount = 10;
    const newBurstElements = [];
    
    for (let i = 0; i < burstCount; i++) {
      const angle = (i / burstCount) * 360 + Math.random() * 30;
      const distance = 60 + Math.random() * 40;
      const randomElement = codeElements[Math.floor(Math.random() * codeElements.length)];
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      
      newBurstElements.push({
        id: burstIdRef.current++,
        x,
        y,
        angle,
        distance,
        char: randomElement.char,
        color
      });
    }
    
    setBurstElements(prev => [...prev, ...newBurstElements]);
    
    // Clear burst elements after animation
    setTimeout(() => {
      setBurstElements(prev => 
        prev.filter(el => !newBurstElements.find(newEl => newEl.id === el.id))
      );
    }, 1000);
  }, []);

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
      calculateVelocity(e);
      updateTrailElements(e.clientX, e.clientY);
    };
    
    const handleMouseLeave = () => {
      setIsVisible(false);
    };
    
    const handleMouseEnter = () => {
      setIsVisible(true);
    };
    
    const handleMouseDown = (e: MouseEvent) => {
      setClicking(true);
      createBurst(e.clientX, e.clientY);
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
  }, [updateCursorPosition, updateTrailElements, calculateVelocity, createBurst]);

  // Don't render cursor on touch devices or server-side
  if (typeof window === 'undefined' || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) {
    return null;
  }

  // Get a random code element that matches the trail element type
  const getRandomCodeElement = (trailElement: TrailElement) => {
    // For 'code' type, use a code symbol
    if (trailElement.type === 'code') {
      const randomElement = codeElements[Math.floor(Math.random() * codeElements.length)];
      return randomElement.char;
    }
    
    // For 'particle' type, use visual symbols
    return ['•', '○', '◦', '◇', '◆', '+', '×', '⎔', '⏣'][Math.floor(Math.random() * 9)];
  };

  return isVisible ? (
    <>
      {/* Whimsical code elements trail */}
      <AnimatePresence>
        {trailElements.map((element, index) => {
          const codeChar = useMemo(() => getRandomCodeElement(element), [element]);
          const speed = Math.sqrt(mouseVelocity.x ** 2 + mouseVelocity.y ** 2);
          const size = element.type === 'code' ? 18 - (index * 0.8) : 8 - (index * 0.5);
          const isCode = element.type === 'code';
          
          return (
            <motion.div
              key={element.id}
              className="pointer-events-none fixed z-49 font-mono"
              style={{
                position: 'fixed',
                top: element.y,
                left: element.x,
                transform: `translate(-50%, -50%) rotate(${element.rotation}deg)`,
                fontSize: isCode ? `${size}px` : undefined,
                width: !isCode ? size : undefined,
                height: !isCode ? size : undefined,
                borderRadius: !isCode ? '50%' : undefined,
                color: element.color,
                backgroundColor: !isCode ? element.color : undefined,
                textShadow: isCode ? `0 0 5px ${element.color}` : undefined,
                fontWeight: isCode ? 'bold' : undefined,
                lineHeight: 1
              }}
              initial={{ 
                opacity: 0.7, 
                scale: isCode ? 0.8 : 1 
              }}
              animate={{ 
                opacity: 0,
                y: element.y + (Math.random() * 30 - 15) * (speed > 10 ? 2 : 1),
                x: element.x + (Math.random() * 30 - 15) * (speed > 10 ? 2 : 1),
                scale: isCode ? 1.2 : 1.5,
                rotate: element.rotation + (Math.random() * 180 - 90)
              }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.8 + Math.random() * 0.4,
                ease: "easeOut"
              }}
            >
              {isCode ? codeChar : null}
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Special "Pritam" name trail */}
      <AnimatePresence>
        {showNameTrail && nameLetters.map((letter, index) => (
          <motion.div
            key={`name-${index}`}
            className="pointer-events-none fixed z-49 font-mono"
            style={{
              position: 'fixed',
              top: innerPosition.y,
              left: innerPosition.x,
              color: colorPalette[index % colorPalette.length],
              fontWeight: 'bold',
              fontSize: '24px',
              textShadow: `0 0 8px ${colorPalette[index % colorPalette.length]}`,
            }}
            initial={{ 
              opacity: 0, 
              y: 0,
              x: 0,
              scale: 0.5,
            }}
            animate={{ 
              opacity: [0, 0.9, 0],
              y: -50 - (index * 10),
              x: (index - 3) * 15,
              scale: 1,
            }}
            transition={{ 
              duration: 2,
              delay: index * 0.1,
              ease: "easeOut"
            }}
          >
            {letter}
          </motion.div>
        ))}
      </AnimatePresence>
      
      {/* Burst elements on click */}
      <AnimatePresence>
        {burstElements.map(burst => (
          <motion.div
            key={`burst-${burst.id}`}
            className="pointer-events-none fixed z-48 font-mono"
            style={{
              position: 'fixed',
              top: burst.y,
              left: burst.x,
              color: burst.color,
              textShadow: `0 0 5px ${burst.color}`,
              fontWeight: 'bold',
              fontSize: '20px',
            }}
            initial={{ 
              opacity: 0.9,
              x: 0, 
              y: 0, 
              scale: 0.5,
            }}
            animate={{ 
              opacity: 0,
              x: Math.cos(burst.angle * Math.PI / 180) * burst.distance, 
              y: Math.sin(burst.angle * Math.PI / 180) * burst.distance, 
              scale: 1.5,
              rotate: Math.random() * 360,
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut" 
            }}
          >
            {burst.char}
          </motion.div>
        ))}
      </AnimatePresence>
      
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
          className="pointer-events-none fixed z-48 rounded-full"
          style={{
            position: 'fixed',
            top: innerPosition.y,
            left: innerPosition.x,
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${getNextColor()} 0%, rgba(255,255,255,0) 70%)`,
          }}
          initial={{ width: 0, height: 0, opacity: 0.7 }}
          animate={{ width: 80, height: 80, opacity: 0 }}
          transition={{ duration: 0.7 }}
        />
      )}
    </>
  ) : null;
};

export default CustomCursor;
