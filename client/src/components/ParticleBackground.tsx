import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}

const colors = ['#6C63FF', '#FF6584', '#4ECDC4', '#FFC857', '#FF5A5F'];

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  
  useEffect(() => {
    const generateParticles = () => {
      if (!containerRef.current) return;
      
      const numberOfParticles = window.innerWidth > 768 ? 80 : 40;
      const newParticles: Particle[] = [];
      
      for (let i = 0; i < numberOfParticles; i++) {
        const particle: Particle = {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 5 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: Math.random() * 20 + 10,
          delay: Math.random() * 10,
        };
        
        newParticles.push(particle);
      }
      
      particles.current = newParticles;
    };
    
    generateParticles();
    
    const handleResize = () => {
      generateParticles();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef} 
      className="particles fixed inset-0 z-[-1] pointer-events-none opacity-30"
    >
      {particles.current.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particle.color,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [0, -20, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
