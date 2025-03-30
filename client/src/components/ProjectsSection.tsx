import { useRef, useState, useMemo, MouseEvent, ChangeEvent } from 'react';
import { motion, useInView, HTMLMotionProps, AnimatePresence } from 'framer-motion';
import { Project } from '../types/project';
import { useAnimationValues } from '../hooks/use-animation-values';
import ErrorBoundary from './ErrorBoundary';
import ImageWithFallback from './ImageWithFallback';

// Projects array - currently empty
const projects: Project[] = [];

// Tech colors for badges
const techColors: Record<string, string> = {
  "React": "primary",
  "TypeScript": "blue-500",
  "Node.js": "green-500",
  "Next.js": "accent"
};

// Get all unique technologies from projects
const allTechnologies = Array.from(
  new Set(projects.flatMap(project => project.tech))
).sort();

const ProjectsSection = () => {
  type SortType = "newest" | "oldest" | "az";
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<SortType>("newest");
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const { staggerContainer, fadeInUp } = useAnimationValues();

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];
    
    if (activeFilter !== "All") {
      filtered = filtered.filter(project => 
        project.tech.includes(activeFilter)
      );
    }
    
    switch (sortBy) {
      case "oldest":
        return filtered.sort((a, b) => a.id - b.id);
      case "az":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered.sort((a, b) => b.id - a.id);
    }
  }, [activeFilter, sortBy]);

  return (
    <ErrorBoundary>
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
              A showcase of my journey in software development. Each project will represent a unique challenge and solution.
            </p>
          </motion.div>

          {/* Filter and Sort Controls - Only shown when there are projects */}
          {projects.length > 0 && (
            <motion.div 
              className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4"
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <button
                  onClick={() => setActiveFilter("All")}
                  className={`px-4 py-2 rounded-full text-sm transition-all ${
                    activeFilter === "All"
                      ? "bg-primary text-dark"
                      : "bg-dark/50 text-primary hover:bg-dark/70"
                  }`}
                >
                  All
                </button>
                {allTechnologies.map(tech => (
                  <button
                    key={tech}
                    onClick={() => setActiveFilter(tech)}
                    className={`px-4 py-2 rounded-full text-sm transition-all ${
                      activeFilter === tech
                        ? "bg-primary text-dark"
                        : "bg-dark/50 text-primary hover:bg-dark/70"
                    }`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortType)}
                  className="bg-dark/50 text-primary border border-primary/30 rounded-lg px-3 py-1.5 text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="az">A-Z</option>
                </select>
              </div>
            </motion.div>
          )}
          
          {projects.length === 0 ? (
            <motion.div 
              className="text-center py-20"
              variants={fadeInUp}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-primary mb-2">No Projects Yet</h3>
              <p className="text-gray-400 max-w-md mx-auto">
                I'm currently working on some exciting projects. Check back soon to see what I'm building!
              </p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeFilter + sortBy}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                exit={{ opacity: 0, y: 20 }}
              >
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  className="project-card group bg-dark border border-gray-800 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
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
                    <ImageWithFallback
                      src={project.image}
                      alt={project.title}
                      className="transform transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300"></div>
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
                  
                  <div className="p-6 transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                    <h3 className="text-xl font-bold font-montserrat mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                      {project.featured && (
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/20 text-primary">
                          Featured
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${techColors[tech]}/20 text-${techColors[tech]}`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

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
            </AnimatePresence>
          )}
          
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
    </ErrorBoundary>
  );
};

export default ProjectsSection;
