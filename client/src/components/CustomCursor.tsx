import { useEffect, useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CursorElement {
  x: number;
  y: number;
  timestamp: number;
  type: 'circle' | 'code';
}

const codeElements = ['0', '1', '$', '#', '@', '*', '&', '%', '!', '?', '='];

const getRandomCodeElement = () => {
  return codeElements[Math.floor(Math.random() * codeElements.length)];
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trailElements, setTrailElements] = useState<CursorElement[]>([]);
  const [mouseVelocity, setMouseVelocity] = useState({ x: 0, y: 0 });
  const lastPositionRef = useRef({ x: 0, y: 0, timestamp: Date.now() });
  const frameRef = useRef<number>();
  const isMovingRef = useRef(false);
  
  // Pre-generate code elements for each potential trail position
  const codeChars = useMemo(() => Array(20).fill(0).map(() => getRandomCodeElement()), []);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastPositionRef.current.timestamp;
      
      // Calculate velocity
      const velocityX = (e.clientX - lastPositionRef.current.x) / deltaTime;
      const velocityY = (e.clientY - lastPositionRef.current.y) / deltaTime;
      
      setMouseVelocity({ x: velocityX * 100, y: velocityY * 100 });
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Update last position
      lastPositionRef.current = {
        x: e.clientX,
        y: e.clientY,
        timestamp: currentTime
      };

      isMovingRef.current = true;
      
      // Reset the moving flag after a delay
      clearTimeout(frameRef.current);
      frameRef.current = window.setTimeout(() => {
        isMovingRef.current = false;
      }, 100);
    };

    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (frameRef.current) {
        clearTimeout(frameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateTrail = () => {
      if (!isMovingRef.current) return;

      const speed = Math.sqrt(mouseVelocity.x ** 2 + mouseVelocity.y ** 2);
      const shouldAddCode = speed > 5 && Math.random() > 0.7;
      const elementType: 'circle' | 'code' = shouldAddCode ? 'code' : 'circle';
      
      setTrailElements(prev => {
        const newElement: CursorElement = {
          x: position.x,
          y: position.y,
          timestamp: Date.now(),
          type: elementType
        };
        
        return [newElement, ...prev].slice(0, 20);
      });
    };

    const interval = setInterval(updateTrail, 50);
    return () => clearInterval(interval);
  }, [position, mouseVelocity]);

  useEffect(() => {
    const cleanup = setInterval(() => {
      const now = Date.now();
      setTrailElements(prev => 
        prev.filter(element => now - element.timestamp < 1000)
      );
    }, 100);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <>
      <motion.div
        className="cursor-dot fixed pointer-events-none z-50"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isMovingRef.current ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          mass: 0.5,
          stiffness: 400
        }}
      >
        <div className="w-2 h-2 bg-accent rounded-full" />
      </motion.div>

      <motion.div
        className="cursor-ring fixed pointer-events-none z-50"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isMovingRef.current ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          damping: 30,
          mass: 0.8,
          stiffness: 300
        }}
      >
        <div className="w-8 h-8 border border-accent rounded-full opacity-50" />
      </motion.div>

      <div className="fixed inset-0 pointer-events-none z-40">
        <AnimatePresence>
          {trailElements.map((element, index) => {
            const speed = Math.sqrt(mouseVelocity.x ** 2 + mouseVelocity.y ** 2);
            const size = element.type === 'code' ? 18 - (index * 0.8) : 8 - (index * 0.5);
            
            return (
              <motion.div
                key={element.timestamp}
                initial={{ 
                  x: element.x - (element.type === 'code' ? 12 : size/2), 
                  y: element.y - (element.type === 'code' ? 12 : size/2),
                  scale: element.type === 'code' ? 0.8 : 1,
                  opacity: 1 
                }}
                animate={{ 
                  scale: element.type === 'code' ? 1.2 : 0.8,
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 1 }}
                className="absolute"
              >
                {element.type === 'code' ? (
                  <div 
                    className="text-accent/30 font-mono text-lg"
                    style={{
                      transform: `rotate(${(mouseVelocity.x + mouseVelocity.y) * 10}deg)`
                    }}
                  >
                    {codeChars[index % codeChars.length]}
                  </div>
                ) : (
                  <div 
                    className="rounded-full bg-accent/20"
                    style={{
                      width: size,
                      height: size,
                    }}
                  />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
};

export default CustomCursor;
