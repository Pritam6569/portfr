import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark pt-24 pb-10 relative">
      {/* Wave decoration */}
      <div className="wave"></div>
      
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center md:text-left">
            <motion.a 
              href="#home" 
              className="text-3xl font-bold font-montserrat tracking-wide gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              &lt;Pritam/&gt;
            </motion.a>
            <p className="text-gray-400 mt-2">Crafting digital experiences</p>
          </div>
          
          <div className="flex gap-6">
            {[
              { name: 'Portfolio', icon: 'code', href: '#' },
              { name: 'About', icon: 'user', href: '#about' },
              { name: 'Projects', icon: 'laptop-code', href: '#projects' },
              { name: 'Contact', icon: 'envelope', href: '#contact' }
            ].map((item, index) => (
              <motion.a 
                key={index}
                href={item.href} 
                className="text-gray-400 hover:text-primary transition-colors"
                whileHover={{ y: -3 }}
              >
                <i className={`fas fa-${item.icon}`}></i> {item.name}
              </motion.a>
            ))}
          </div>
          
          <div className="flex gap-6">
            <motion.a 
              href="https://github.com/realpritam" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-dark/70 border border-gray-700 rounded-full flex items-center justify-center social-icon hover:border-primary hover:text-primary transition-all"
              whileHover={{ y: -5, scale: 1.2, borderColor: '#6C63FF', color: '#6C63FF' }}
            >
              <i className="fab fa-github"></i>
            </motion.a>
            <motion.a 
              href="https://www.instagram.com/p_r_i_t_a_m777/" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-dark/70 border border-gray-700 rounded-full flex items-center justify-center social-icon hover:border-energy hover:text-energy transition-all"
              whileHover={{ y: -5, scale: 1.2, borderColor: '#FF5A5F', color: '#FF5A5F' }}
            >
              <i className="fab fa-instagram"></i>
            </motion.a>
            <motion.a 
              href="#" 
              className="w-10 h-10 bg-dark/70 border border-gray-700 rounded-full flex items-center justify-center social-icon hover:border-accent hover:text-accent transition-all"
              whileHover={{ y: -5, scale: 1.2, borderColor: '#4ECDC4', color: '#4ECDC4' }}
            >
              <i className="fab fa-linkedin-in"></i>
            </motion.a>
          </div>
        </motion.div>
        
        <motion.div 
          className="border-t border-gray-800 mt-10 pt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-500">© {currentYear} Pritam. All rights reserved.</p>
          <p className="text-xs text-gray-600 mt-2">
            Designed & developed with <i className="fas fa-heart text-energy text-xs"></i> by Pritam
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
