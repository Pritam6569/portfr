import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTextAnimation } from '../hooks/use-text-animation';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });
  
  // Parallax effect for background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 15;
      const y = (e.clientY / window.innerHeight) * 15;
      setBackgroundPosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  const animatedText = useTextAnimation([
    'design interfaces',
    'build web apps',
    'create animations',
    'solve problems'
  ], 3000);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
      style={{ 
        background: `radial-gradient(circle at ${50 + backgroundPosition.x}% ${30 + backgroundPosition.y}%, rgba(77, 168, 255, 0.15) 0%, rgba(10, 25, 41, 0) 50%)` 
      }}
    >
      {/* Grid background for aesthetic */}
      <div className="absolute inset-0 z-0" 
        style={{ 
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px), 
                           linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.4
        }}></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute w-64 h-64 rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(77, 168, 255, 0.15) 0%, rgba(10, 25, 41, 0) 70%)',
            top: '20%',
            right: '5%',
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute w-72 h-72 rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(100, 255, 218, 0.1) 0%, rgba(10, 25, 41, 0) 70%)',
            bottom: '10%',
            left: '15%',
            filter: 'blur(30px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>
      
      <motion.div 
        className="container mx-auto px-6 pt-20 pb-20 z-10 relative"
        style={{ y, opacity }}
      >
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-20">
          <motion.div 
            className="md:w-1/2 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <motion.div 
                className="inline-block px-4 py-1 rounded-full bg-[rgba(77,168,255,0.1)] border border-[rgba(77,168,255,0.3)] text-sm mb-2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="text-[var(--color-primary)]">Full-Stack Developer</span>
              </motion.div>
              
              <motion.h2 
                className="text-2xl md:text-3xl font-light mb-1 text-[var(--color-light)]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                Hello, I'm
              </motion.h2>
              
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <span className="gradient-text">Pritam</span>
              </motion.h1>
              
              <motion.div 
                className="h-1 w-24 bg-[var(--color-accent)] my-6"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
              
              <motion.h3 
                className="text-2xl md:text-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                I <span className="accent-gradient-text inline-block min-w-[180px]">{animatedText}</span>
              </motion.h3>
              
              <motion.p 
                className="text-lg text-[var(--color-muted)] mt-6 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Creative developer specializing in building exceptional digital experiences. 
                I focus on creating intuitive, responsive, and engaging web applications with clean code.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex flex-wrap gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <motion.a 
                href="#projects" 
                className="px-8 py-3.5 rounded-md font-medium transition-all text-[var(--color-darker)] relative overflow-hidden group"
                style={{ background: 'var(--gradient-primary)' }}
                whileHover={{ y: -3, boxShadow: "0 15px 30px -10px rgba(77, 168, 255, 0.3)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10">View My Work</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-[#64FFDA] to-[#4DA8FF] opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
              
              <motion.a 
                href="#contact" 
                className="px-8 py-3.5 rounded-md font-medium transition-all relative overflow-hidden group"
                style={{ background: 'rgba(100, 255, 218, 0.1)', border: '1px solid rgba(100, 255, 218, 0.3)' }}
                whileHover={{ y: -3, boxShadow: "0 10px 30px -10px rgba(100, 255, 218, 0.2)" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 text-[var(--color-accent)]">Contact Me</span>
              </motion.a>
            </motion.div>
            
            <motion.div
              className="flex items-center space-x-5 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <a 
                href="https://github.com/realpritam" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors"
              >
                <motion.div whileHover={{ y: -3 }}>
                  <i className="fab fa-github text-xl"></i>
                </motion.div>
              </a>
              <a 
                href="https://www.instagram.com/p_r_i_t_a_m777/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
              >
                <motion.div whileHover={{ y: -3 }}>
                  <i className="fab fa-instagram text-xl"></i>
                </motion.div>
              </a>
              <a 
                href="#" 
                className="text-[var(--color-muted)] hover:text-[var(--color-highlight)] transition-colors"
              >
                <motion.div whileHover={{ y: -3 }}>
                  <i className="fab fa-linkedin-in text-xl"></i>
                </motion.div>
              </a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="relative">
              {/* Code editor UI */}
              <motion.div 
                className="glass-card rounded-xl p-5 w-full md:w-[500px] shadow-[0_20px_80px_-20px_rgba(77,168,255,0.25)]"
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                  </div>
                  <div className="ml-4 bg-[rgba(255,255,255,0.05)] rounded-md px-3 py-1 text-xs text-[var(--color-muted)]">
                    <span>portfolio.tsx</span>
                  </div>
                </div>
                
                <div className="text-sm text-[#E2E8F0] overflow-x-auto font-mono">
                  <div className="mb-2">
                    <span className="text-[#FF7E67]">import</span> 
                    <span className="text-[#E2E8F0]"> &#123; </span>
                    <span className="text-[#4DA8FF]">useState</span>
                    <span className="text-[#E2E8F0]">, </span>
                    <span className="text-[#4DA8FF]">useEffect</span>
                    <span className="text-[#E2E8F0]"> &#125; </span>
                    <span className="text-[#FF7E67]">from</span> 
                    <span className="text-[#64FFDA]"> 'react'</span>
                    <span className="text-[#E2E8F0]">;</span>
                  </div>
                  
                  <div className="mb-4">
                    <span className="text-[#FF7E67]">import</span> 
                    <span className="text-[#E2E8F0]"> &#123; </span>
                    <span className="text-[#4DA8FF]">motion</span>
                    <span className="text-[#E2E8F0]"> &#125; </span>
                    <span className="text-[#FF7E67]">from</span> 
                    <span className="text-[#64FFDA]"> 'framer-motion'</span>
                    <span className="text-[#E2E8F0]">;</span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-[#FF7E67]">const</span> 
                    <span className="text-[#4DA8FF]"> Portfolio</span> 
                    <span className="text-[#E2E8F0]"> = () =&gt; </span>
                    <span className="text-[#E2E8F0]">{'{'}</span>
                  </div>
                  
                  <div className="ml-4 mb-2">
                    <span className="text-[#FF7E67]">const</span> 
                    <span className="text-[#E2E8F0]"> [</span>
                    <span className="text-[#4DA8FF]">isLoading</span>
                    <span className="text-[#E2E8F0]">, </span>
                    <span className="text-[#4DA8FF]">setIsLoading</span>
                    <span className="text-[#E2E8F0]">] = </span>
                    <span className="text-[#FF7E67]">useState</span>
                    <span className="text-[#E2E8F0]">(</span>
                    <span className="text-[#FF7E67]">true</span>
                    <span className="text-[#E2E8F0]">);</span>
                  </div>
                  
                  <div className="ml-4 mb-4 typing-animation">
                    <span className="text-[#FF7E67]">const</span> 
                    <span className="text-[#4DA8FF]"> projects</span> 
                    <span className="text-[#E2E8F0]"> = [</span>
                    <span className="text-[#64FFDA]">'UI Design'</span>
                    <span className="text-[#E2E8F0]">, </span>
                    <span className="text-[#64FFDA]">'Web Apps'</span>
                    <span className="text-[#E2E8F0]">, </span>
                    <span className="text-[#64FFDA]">'Animations'</span>
                    <span className="text-[#E2E8F0]">];</span>
                  </div>
                  
                  <div className="ml-4 mb-2">
                    <span className="text-[#FF7E67]">return</span> 
                    <span className="text-[#E2E8F0]"> (</span>
                  </div>
                  
                  <div className="ml-8 mb-1">
                    <span className="text-[#E2E8F0]">&lt;</span>
                    <span className="text-[#4DA8FF]">motion.div</span> 
                    <span className="text-[#64FFDA]"> className</span>
                    <span className="text-[#E2E8F0]">=</span>
                    <span className="text-[#64FFDA]">"portfolio"</span>
                    <span className="text-[#E2E8F0]">&gt;</span>
                  </div>
                  
                  <div className="ml-12 mb-1 typing-animation">
                    <span className="text-[#E2E8F0]">Creating something amazing...</span>
                  </div>
                  
                  <div className="ml-8 mb-1">
                    <span className="text-[#E2E8F0]">&lt;/</span>
                    <span className="text-[#4DA8FF]">motion.div</span>
                    <span className="text-[#E2E8F0]">&gt;</span>
                  </div>
                  
                  <div className="ml-4 mb-2">
                    <span className="text-[#E2E8F0]">);</span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-[#E2E8F0]">&#125;;</span>
                  </div>
                  
                  <div>
                    <span className="text-[#FF7E67]">export</span> 
                    <span className="text-[#FF7E67]"> default</span> 
                    <span className="text-[#4DA8FF]"> Portfolio</span>
                    <span className="text-[#E2E8F0]">;</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Decorative elements */}
              <motion.div 
                className="absolute -top-6 -right-6 w-24 h-24"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(77, 168, 255, 0.1) 0%, rgba(10, 25, 41, 0) 80%)',
                  borderRadius: '50%',
                  border: '1px solid rgba(77, 168, 255, 0.1)',
                  backdropFilter: 'blur(5px)'
                }}
                animate={{ y: [-10, 10, -10] }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  repeatType: "loop" 
                }}
              />
              <motion.div 
                className="absolute -bottom-10 -left-8 w-20 h-20"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(100, 255, 218, 0.1) 0%, rgba(10, 25, 41, 0) 80%)',
                  borderRadius: '50%',
                  border: '1px solid rgba(100, 255, 218, 0.1)',
                  backdropFilter: 'blur(5px)'
                }}
                animate={{ y: [10, -10, 10] }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity, 
                  ease: "easeInOut", 
                  delay: 1,
                  repeatType: "loop" 
                }}
              />
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
          animate={{ y: [0, 8, 0] }}
          transition={{ 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut", 
            repeatType: "loop" 
          }}
        >
          <div className="text-[var(--color-accent)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </div>
          <p className="text-sm text-[var(--color-muted)] mt-2">Scroll to explore</p>
        </motion.div>
      </motion.div>
      
      <style>
        {`
          .typing-animation {
            border-right: 2px solid #64FFDA;
            overflow: hidden;
            white-space: nowrap;
            animation: typing 4s steps(30) infinite, blink-caret 0.75s step-end infinite;
          }
          
          @keyframes typing {
            0% { width: 0 }
            20% { width: 100% }
            80% { width: 100% }
            100% { width: 0 }
          }
          
          @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: #64FFDA }
          }
        `}
      </style>
    </section>
  );
};

export default HeroSection;
