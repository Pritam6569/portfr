import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Project } from '../types/project';
import { useAnimationValues } from '../hooks/use-animation-values';

const projects: Project[] = [
  {
    id: 1,
    title: "Interactive Dashboard",
    description: "A responsive admin dashboard with real-time data visualization and customizable widgets.",
    image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    tech: ["React", "Firebase"],
    githubUrl: "https://github.com/realpritam",
    demoUrl: "#"
  },
  {
    id: 2,
    title: "E-commerce Platform",
    description: "A full-featured online store with cart functionality, payment processing, and order management.",
    image: "https://images.unsplash.com/photo-1609599217457-31bfcb4cbec5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    tech: ["Next.js", "Stripe"],
    githubUrl: "https://github.com/realpritam",
    demoUrl: "#"
  },
  {
    id: 3,
    title: "3D Interactive Portfolio",
    description: "An immersive 3D experience showcasing creative projects with interactive elements and animations.",
    image: "https://images.unsplash.com/photo-1626908013351-800ddd7b196c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1796&q=80",
    tech: ["Three.js", "GSAP"],
    githubUrl: "https://github.com/realpritam",
    demoUrl: "#"
  }
];

// Map tech to colors
const techColors: Record<string, string> = {
  "React": "primary",
  "Firebase": "secondary",
  "Next.js": "accent",
  "Stripe": "highlight",
  "Three.js": "energy",
  "GSAP": "primary"
};

const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  
  const { staggerContainer, fadeInUp } = useAnimationValues();

  return (
    <section 
      id="projects" 
      ref={ref}
      className="py-20 diagonal-section-reversed bg-gradient-to-bl from-dark to-dark/80"
    >
      <div className="container mx-auto px-6 py-16">
        <motion.div 
          className="text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 className="text-4xl md:text-5xl font-bold font-montserrat">
            <span className="relative inline-block">
              My Projects
              <motion.span 
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-accent"
                initial={{ width: 0 }}
                animate={isInView ? { width: 96 } : { width: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              ></motion.span>
            </span>
          </h2>
          <p className="text-xl mt-6 max-w-2xl mx-auto text-gray-300">
            Here are some of my favorite creations. Each project represents a unique challenge and solution.
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              className="project-card bg-dark border border-gray-800 rounded-xl overflow-hidden"
              variants={fadeInUp}
              custom={index}
              whileHover={{ 
                y: -10, 
                rotateX: 5, 
                rotateY: 5,
                boxShadow: "0 20px 30px rgba(0, 0, 0, 0.2)" 
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20
              }}
            >
              <div className="relative h-48 overflow-hidden">
                <motion.img 
                  src={project.image}
                  alt={project.title} 
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className={`absolute bottom-2 left-${techIndex ? techIndex * 70 + 2 : 2} bg-${techColors[tech]} px-2 py-1 rounded text-xs font-mono`}
                    style={{ left: techIndex ? `${techIndex * 70 + 2}px` : '2px' }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold font-montserrat mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                
                <div className="flex justify-between items-center">
                  <motion.a 
                    href={project.demoUrl} 
                    className="text-primary hover:text-accent transition-colors flex items-center gap-1 group"
                    whileHover={{ x: 5 }}
                  >
                    View Project 
                    <motion.i 
                      className="fas fa-arrow-right"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    ></motion.i>
                  </motion.a>
                  <motion.a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                    whileHover={{ y: -3, scale: 1.2 }}
                  >
                    <i className="fab fa-github text-xl"></i>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          variants={fadeInUp}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.5 }}
        >
          <motion.a 
            href="https://github.com/realpritam" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-dark/50 hover:bg-dark border border-primary/50 hover:border-primary text-primary px-6 py-3 rounded-full transition-all shadow-lg hover:shadow-primary/30"
            whileHover={{ y: -5 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className="fab fa-github"></i> See more on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
