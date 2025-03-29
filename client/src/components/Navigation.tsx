import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (custom: number) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.1 * custom,
        duration: 0.4, 
        ease: "easeOut"
      }
    })
  };

  return (
    <nav
      className={`fixed top-0 w-full py-4 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 backdrop-blur-xl bg-[var(--color-darker)]/80 shadow-lg shadow-[#000]/10'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#home" 
          className="text-2xl font-bold tracking-wide gradient-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          &lt;Pritam/&gt;
        </motion.a>
        
        <div className="hidden md:flex space-x-8">
          {['home', 'about', 'projects', 'contact'].map((item, index) => (
            <motion.a 
              key={item}
              href={`#${item}`} 
              className={`nav-item relative px-2 py-1 text-[var(--color-light)] hover:text-[var(--color-accent)] transition-colors`}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={menuItemVariants}
              whileHover={{ y: -2 }}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
              {isActive(`/#${item}`) && (
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[var(--color-accent)] rounded"
                  layoutId="navIndicator"
                />
              )}
            </motion.a>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button 
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md bg-[rgba(100,255,218,0.1)] border border-[rgba(100,255,218,0.2)] text-[var(--color-accent)] focus:outline-none z-50" 
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="18" 
              height="18" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {isMenuOpen ? (
                <motion.path 
                  d="M18 6L6 18M6 6l12 12" 
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <>
                  <motion.line 
                    x1="3" y1="12" x2="21" y2="12"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.line 
                    x1="3" y1="6" x2="21" y2="6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  />
                  <motion.line 
                    x1="3" y1="18" x2="21" y2="18"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  />
                </>
              )}
            </svg>
          </button>
        </motion.div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 glass-card flex flex-col items-center justify-center z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="flex flex-col space-y-8 text-center w-full px-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {['home', 'about', 'projects', 'contact'].map((item, index) => (
                <motion.a 
                  key={item}
                  href={`#${item}`} 
                  className="text-2xl text-[var(--color-light)] hover:text-[var(--color-accent)] relative group"
                  onClick={closeMenu}
                  custom={index}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileTap={{ scale: 0.95 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[var(--color-accent)] group-hover:w-full transition-all duration-300"></span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
