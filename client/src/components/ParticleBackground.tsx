import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
  opacity: number;
  blur: number;
}

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Colors that match our new color scheme
  const colors = [
    'rgba(77, 168, 255, 0.6)',  // Primary blue
    'rgba(100, 255, 218, 0.5)',  // Accent teal
    'rgba(100, 255, 218, 0.3)',  // Lighter teal
    'rgba(77, 168, 255, 0.3)',   // Lighter blue
    'rgba(255, 126, 103, 0.4)',  // Highlight
  ];
  
  useEffect(() => {
    const generateParticles = () => {
      if (!containerRef.current) return;
      
      const numberOfParticles = window.innerWidth > 768 ? 50 : 30;
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 4 + 1;
        
        const particle: Particle = {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: size,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 30 + 15,
          delay: Math.random() * 5,
          opacity: Math.random() * 0.5 + 0.1,
          blur: Math.random() > 0.8 ? Math.random() * 4 : 0, // Some particles are blurred
        };
        
        newParticles.push(particle);
      }
      
      setParticles(newParticles);
    };
    
    generateParticles();
    
    const handleResize = () => {
      generateParticles();
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="particles fixed inset-0 z-[-1] pointer-events-none"
    >
      {particles.map((particle) => {
        // Calculate distance from mouse for interactive effect
        const dx = Math.abs(particle.x - mousePosition.x);
        const dy = Math.abs(particle.y - mousePosition.y);
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Particles get slightly larger and brighter when mouse is near
        const scale = distance < 20 ? 1 + (20 - distance) / 100 : 1;
        const opacityBoost = distance < 20 ? (20 - distance) / 50 : 0;
        
        return (
          <motion.div
            key={particle.id}
            className="particle absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              backgroundColor: particle.color,
              opacity: particle.opacity + opacityBoost,
              filter: particle.blur > 0 ? `blur(${particle.blur}px)` : 'none',
              boxShadow: distance < 20 ? `0 0 ${Math.ceil((20 - distance) / 5)}px ${particle.color}` : 'none',
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, particle.id % 2 === 0 ? 10 : -10, 0],
              scale: [1, scale, 1],
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
      
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(circle at 50% 50%, rgba(10, 25, 41, 0) 0%, rgba(10, 25, 41, 0.2) 100%)',
        mixBlendMode: 'multiply'
      }} />
    </div>
  );
};

export default ParticleBackground;
