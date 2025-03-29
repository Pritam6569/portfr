import { useRef } from 'react';
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
  
  const animatedText = useTextAnimation([
    'love coding',
    'build websites',
    'create animations',
    'solve problems'
  ], 3000);

  return (
    <section 
      id="home" 
      ref={containerRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Decorative blobs */}
        <motion.div 
          className="absolute top-20 -right-20 w-96 h-96 rounded-full bg-primary opacity-20"
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "40% 60% 30% 70% / 40% 40% 60% 50%",
              "60% 40% 50% 50% / 30% 30% 70% 70%",
              "60% 40% 30% 70% / 60% 30% 70% 40%"
            ]
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
        <motion.div 
          className="absolute bottom-40 -left-20 w-72 h-72 rounded-full bg-secondary opacity-20"
          animate={{
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 60%",
              "40% 60% 30% 70% / 40% 40% 60% 50%",
              "60% 40% 50% 50% / 30% 30% 70% 70%",
              "60% 40% 30% 70% / 60% 30% 70% 40%"
            ]
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            delay: 2 // Offset the animation from the first blob
          }}
        />
      </div>
      
      <motion.div 
        className="container mx-auto px-6 pt-24 pb-12 z-10 relative"
        style={{ y, opacity }}
      >
        <div className="flex flex-col md:flex-row items-center gap-10">
          <motion.div 
            className="md:w-1/2 space-y-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <motion.h2 
                className="text-3xl md:text-4xl font-montserrat font-light"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Hello, I'm
              </motion.h2>
              <motion.h1 
                className="text-5xl md:text-7xl font-montserrat font-black hero-text"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <span className="gradient-text">Pritam</span>
              </motion.h1>
              <motion.div 
                className="h-1 w-32 bg-accent my-4"
                initial={{ width: 0 }}
                animate={{ width: 128 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
              <motion.h3 
                className="text-2xl md:text-3xl font-montserrat"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                I <span className="text-accent">{animatedText}</span>
              </motion.h3>
              <motion.p 
                className="text-lg md:text-xl text-gray-300 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Creative developer crafting unique digital experiences with a passion for interactive design and clean code.
              </motion.p>
            </div>
            
            <motion.div 
              className="flex space-x-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <motion.a 
                href="#projects" 
                className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-full font-medium transition-all shadow-lg hover:shadow-primary/50"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                View Work
              </motion.a>
              <motion.a 
                href="#contact" 
                className="border-2 border-accent text-accent hover:bg-accent hover:text-dark px-8 py-3 rounded-full font-medium transition-all"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="relative">
              {/* Animated code block */}
              <motion.div 
                className="bg-dark rounded-xl border border-gray-700 p-6 font-mono w-full md:w-[500px] shadow-xl bg-opacity-80 backdrop-blur-sm"
                whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(108, 99, 255, 0.2)" }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 rounded-full bg-energy mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-highlight mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-accent mr-2"></div>
                  <span className="text-xs text-gray-400 ml-2">portfolio.jsx</span>
                </div>
                <div className="text-sm text-gray-300 overflow-x-auto">
                  <div className="mb-2"><span className="text-secondary">import</span> <span className="text-light">React</span> <span className="text-secondary">from</span> <span className="text-accent">'react'</span>;</div>
                  
                  <div className="mb-2"><span className="text-secondary">const</span> <span className="text-primary">Portfolio</span> = () =&gt; &#123;</div>
                  
                  <div className="ml-4 mb-2"><span className="text-secondary">const</span> <span className="text-primary">skills</span> = [</div>
                  <div className="ml-8 mb-1"><span className="text-accent">'JavaScript'</span>,</div>
                  <div className="ml-8 mb-1"><span className="text-accent">'React'</span>,</div>
                  <div className="ml-8 mb-1"><span className="text-accent">'Creative Coding'</span>,</div>
                  <div className="ml-8 mb-2"><span className="text-accent">'UI/UX'</span></div>
                  <div className="ml-4 mb-2">];</div>
                  
                  <div className="ml-4 mb-2"><span className="text-secondary">return</span> (</div>
                  <div className="ml-8 mb-1"><span className="text-light">&lt;<span className="text-energy">div</span> <span className="text-primary">className</span>=<span className="text-accent">"portfolio"</span>&gt;</span></div>
                  <div className="ml-12 mb-1"><span className="text-light">&lt;<span className="text-energy">h1</span>&gt;</span>Hello, I'm Pritam<span className="text-light">&lt;/<span className="text-energy">h1</span>&gt;</span></div>
                  <div className="ml-12 mb-1"><span className="text-light">&lt;<span className="text-energy">p</span>&gt;</span>Welcome to my creative space<span className="text-light">&lt;/<span className="text-energy">p</span>&gt;</span></div>
                  <div className="ml-12 mb-1 typed-code"><span className="text-light">&lt;<span className="text-energy">button</span>&gt;</span>Let's build something amazing<span className="text-light">&lt;/<span className="text-energy">button</span>&gt;</span></div>
                  <div className="ml-8 mb-1"><span className="text-light">&lt;/<span className="text-energy">div</span>&gt;</span></div>
                  <div className="ml-4 mb-2">);</div>
                  <div className="mb-2">&#125;;</div>
                  
                  <div><span className="text-secondary">export</span> <span className="text-secondary">default</span> <span className="text-primary">Portfolio</span>;</div>
                </div>
              </motion.div>
              
              {/* Decorative elements around the code block */}
              <motion.div 
                className="absolute -top-4 -right-4 w-20 h-20 bg-primary rounded-full opacity-30"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-secondary rounded-full opacity-20"
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="text-accent">
            <i className="fas fa-chevron-down"></i>
          </div>
          <p className="text-sm text-gray-400 mt-2">Scroll to explore</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
