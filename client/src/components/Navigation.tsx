import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'wouter';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <nav className="fixed top-0 w-full py-4 z-50 bg-dark bg-opacity-80 backdrop-blur-sm">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold font-montserrat tracking-wide gradient-text">&lt;Pritam/&gt;</a>
        
        <div className="hidden md:flex space-x-8">
          {['home', 'about', 'projects', 'contact'].map((item) => (
            <a 
              key={item}
              href={`#${item}`} 
              className={`nav-item text-light hover:text-accent transition-colors ${isActive(`/#${item}`) ? 'text-accent' : ''}`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </div>
        
        <button 
          className="md:hidden text-2xl focus:outline-none z-50" 
          onClick={toggleMenu}
          aria-label="Toggle mobile menu"
        >
          <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-dark bg-opacity-95 flex flex-col items-center justify-center z-40"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
          >
            <div className="flex flex-col space-y-6 text-center">
              {['home', 'about', 'projects', 'contact'].map((item) => (
                <motion.a 
                  key={item}
                  href={`#${item}`} 
                  className="text-2xl hover:text-accent transition-colors"
                  onClick={closeMenu}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
