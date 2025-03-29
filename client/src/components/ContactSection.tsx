import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAnimationValues } from '../hooks/use-animation-values';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (formData.name && formData.email && formData.message) {
      // In a real app, this would send data to a server
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } else {
      toast({
        title: "Form incomplete",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
    }
  };
  
  const { staggerContainer, fadeInUp, slideInLeft, slideInRight } = useAnimationValues();

  return (
    <section 
      id="contact" 
      ref={ref}
      className="py-20 bg-gradient-to-br from-primary/10 via-dark to-dark/90"
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col md:flex-row gap-12"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="md:w-1/2"
            variants={slideInLeft}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold font-montserrat mb-6"
              variants={fadeInUp}
            >
              <span className="relative">
                Let's Connect
                <motion.span 
                  className="absolute -bottom-2 left-0 w-24 h-1 bg-accent"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: 96 } : { width: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                ></motion.span>
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-xl text-gray-300 mb-8"
              variants={fadeInUp}
            >
              Have a project in mind or just want to say hello? I'd love to hear from you. Let's create something amazing together!
            </motion.p>
            
            <motion.div 
              className="space-y-6"
              variants={staggerContainer}
            >
              <motion.div 
                className="flex items-center gap-4"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-envelope text-primary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Email</h3>
                  <a href="mailto:connect@pritam.dev" className="text-gray-300 hover:text-accent transition-colors">connect@pritam.dev</a>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-4"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-map-marker-alt text-secondary"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Location</h3>
                  <p className="text-gray-300">New Delhi, India</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-4"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-globe text-accent"></i>
                </div>
                <div>
                  <h3 className="text-lg font-medium">Social</h3>
                  <div className="flex gap-4 mt-2">
                    <motion.a 
                      href="https://github.com/realpritam" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon text-xl text-gray-300 hover:text-primary transition-all"
                      whileHover={{ y: -5, scale: 1.2 }}
                    >
                      <i className="fab fa-github"></i>
                    </motion.a>
                    <motion.a 
                      href="https://www.instagram.com/p_r_i_t_a_m777/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon text-xl text-gray-300 hover:text-energy transition-all"
                      whileHover={{ y: -5, scale: 1.2 }}
                    >
                      <i className="fab fa-instagram"></i>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon text-xl text-gray-300 hover:text-accent transition-all"
                      whileHover={{ y: -5, scale: 1.2 }}
                    >
                      <i className="fab fa-linkedin"></i>
                    </motion.a>
                    <motion.a 
                      href="#" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon text-xl text-gray-300 hover:text-highlight transition-all"
                      whileHover={{ y: -5, scale: 1.2 }}
                    >
                      <i className="fab fa-twitter"></i>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            variants={slideInRight}
          >
            <motion.div 
              className="bg-dark/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 shadow-xl"
              whileHover={{ boxShadow: "0 25px 50px -12px rgba(108, 99, 255, 0.25)" }}
            >
              <motion.h3 
                className="text-2xl font-bold font-montserrat mb-6"
                variants={fadeInUp}
              >
                Send a Message
              </motion.h3>
              
              <motion.form 
                className="space-y-6"
                onSubmit={handleSubmit}
                variants={staggerContainer}
              >
                <motion.div
                  variants={fadeInUp}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    required 
                    className="w-full bg-dark/70 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </motion.div>
                
                <motion.div
                  variants={fadeInUp}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    required 
                    className="w-full bg-dark/70 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </motion.div>
                
                <motion.div
                  variants={fadeInUp}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required 
                    className="w-full bg-dark/70 border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                    placeholder="What would you like to discuss?"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </motion.div>
                
                <motion.button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-accent text-white font-medium py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  variants={fadeInUp}
                  whileHover={{ y: -2, boxShadow: "0 10px 25px -5px rgba(108, 99, 255, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </motion.form>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
