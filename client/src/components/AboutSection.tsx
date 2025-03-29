import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useAnimationValues } from '../hooks/use-animation-values';

const skills = [
  { name: 'JavaScript', color: 'primary' },
  { name: 'React', color: 'secondary' },
  { name: 'Next.js', color: 'accent' },
  { name: 'Node.js', color: 'highlight' },
  { name: 'UI/UX Design', color: 'energy' },
  { name: 'Three.js', color: 'primary' },
  { name: 'GSAP', color: 'secondary' },
  { name: 'Tailwind CSS', color: 'accent' }
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const { staggerContainer, fadeInUp, slideInLeft, slideInRight, imageVariant } = useAnimationValues();

  return (
    <section id="about" ref={ref} className="py-20 diagonal-section bg-gradient-to-br from-primary/10 to-dark">
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          className="flex flex-col md:flex-row gap-12 items-center"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div 
            className="md:w-1/2"
            variants={slideInLeft}
          >
            <div className="relative">
              {/* Profile image with blob shape */}
              <motion.div 
                className="w-64 h-64 md:w-80 md:h-80 mx-auto overflow-hidden relative glowing-border"
                variants={imageVariant}
                animate={{
                  borderRadius: [
                    "42% 58% 70% 30% / 45% 45% 55% 55%",
                    "73% 27% 26% 74% / 73% 25% 75% 27%",
                    "28% 72% 44% 56% / 49% 40% 60% 51%",
                    "40% 60% 70% 30% / 47% 62% 38% 53%",
                    "42% 58% 70% 30% / 45% 45% 55% 55%"
                  ]
                }}
                transition={{
                  duration: 8,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "loop"
                }}
              >
                <img 
                  src="https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=1812&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Coder at work" 
                  className="w-full h-full object-cover" 
                />
              </motion.div>
              
              {/* Floating tech icons */}
              <motion.div 
                className="absolute -top-5 -right-5 bg-dark p-3 rounded-full shadow-lg border border-accent"
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <i className="fab fa-react text-2xl text-accent"></i>
              </motion.div>
              <motion.div 
                className="absolute bottom-0 -left-5 bg-dark p-3 rounded-full shadow-lg border border-highlight"
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <i className="fab fa-js text-2xl text-highlight"></i>
              </motion.div>
              <motion.div 
                className="absolute top-1/2 -right-10 bg-dark p-3 rounded-full shadow-lg border border-energy"
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              >
                <i className="fab fa-node-js text-2xl text-energy"></i>
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-1/2"
            variants={slideInRight}
          >
            <motion.div className="space-y-6">
              <motion.h2 
                className="text-4xl md:text-5xl font-bold font-montserrat"
                variants={fadeInUp}
              >
                <span className="relative">
                  About Me
                  <motion.span 
                    className="absolute -bottom-2 left-0 w-20 h-1 bg-accent"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 80 } : { width: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  ></motion.span>
                </span>
              </motion.h2>
              
              <motion.p 
                className="text-xl leading-relaxed"
                variants={fadeInUp}
              >
                I'm a passionate coder who loves exploring the intersection of creativity and technology. With a keen eye for design and a deep understanding of modern frameworks, I build digital experiences that are both functional and beautiful.
              </motion.p>
              
              <motion.p 
                className="text-xl leading-relaxed"
                variants={fadeInUp}
              >
                When I'm not crafting code, you'll find me experimenting with new technologies, contributing to open-source projects, or sharing my knowledge with the community.
              </motion.p>
              
              <motion.div 
                className="pt-6"
                variants={fadeInUp}
              >
                <motion.h3 
                  className="text-2xl font-montserrat font-bold mb-4"
                  variants={fadeInUp}
                >
                  Tech I Love <i className="fas fa-heart text-energy"></i>
                </motion.h3>
                
                <motion.div 
                  className="flex flex-wrap gap-3"
                  variants={staggerContainer}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  {skills.map((skill, index) => (
                    <motion.span 
                      key={index}
                      className={`skills-pill px-4 py-2 bg-dark border border-${skill.color} text-${skill.color} rounded-full`}
                      variants={fadeInUp}
                      custom={index}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill.name}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
