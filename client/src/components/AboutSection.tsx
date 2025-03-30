import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Tech stack with categories
const techStack = {
  languages: [
    { name: 'JavaScript', icon: 'fab fa-js-square', level: 90 },
    { name: 'TypeScript', icon: 'fab fa-js', level: 85 },
    { name: 'Python', icon: 'fab fa-python', level: 80 },
    { name: 'HTML5', icon: 'fab fa-html5', level: 95 },
    { name: 'CSS3', icon: 'fab fa-css3-alt', level: 90 }
  ],
  
  frameworks: [
    { name: 'React', icon: 'fab fa-react', level: 92 },
    { name: 'Next.js', icon: 'fas fa-code', level: 88 },
    { name: 'Node.js', icon: 'fab fa-node-js', level: 85 },
    { name: 'Express', icon: 'fas fa-server', level: 85 },
    { name: 'Tailwind', icon: 'fab fa-css3', level: 95 }
  ],
  
  tools: [
    { name: 'Git', icon: 'fab fa-git-alt', level: 90 },
    { name: 'Docker', icon: 'fab fa-docker', level: 75 },
    { name: 'AWS', icon: 'fab fa-aws', level: 70 },
    { name: 'Figma', icon: 'fab fa-figma', level: 85 },
    { name: 'VS Code', icon: 'fas fa-code', level: 95 }
  ],
};

// Journey timeline items
const journeyItems = [
  {
    year: '2018',
    title: 'Started Coding Journey',
    description: 'Began learning web development fundamentals and building my first projects.',
    icon: 'fas fa-laptop-code',
    color: '#4DA8FF',
    skills: ['HTML', 'CSS', 'JavaScript'],
    achievement: 'Built first portfolio website'
  },
  {
    year: '2019',
    title: 'First Freelance Project',
    description: 'Developed my first client website and discovered my passion for front-end development.',
    icon: 'fas fa-briefcase',
    color: '#64FFDA',
    skills: ['React', 'SCSS', 'Responsive Design'],
    achievement: 'Completed 3 client projects'
  },
  {
    year: '2020',
    title: 'Full Stack Exploration',
    description: 'Expanded my skills to include backend technologies and database management.',
    icon: 'fas fa-server',
    color: '#FF7E67',
    skills: ['Node.js', 'Express', 'MongoDB'],
    achievement: 'Created a full-stack e-commerce application'
  },
  {
    year: '2021',
    title: 'Joined Developer Community',
    description: 'Started contributing to open-source projects and attending developer meetups.',
    icon: 'fas fa-users',
    color: '#9580FF',
    skills: ['Git', 'GitHub', 'Team Collaboration'],
    achievement: '10+ open-source contributions'
  },
  {
    year: '2022',
    title: 'Advanced Projects',
    description: 'Created complex web applications with focus on performance and user experience.',
    icon: 'fas fa-rocket',
    color: '#3FDAA4',
    skills: ['TypeScript', 'NextJS', 'TailwindCSS'],
    achievement: 'Launched SaaS platform with 1000+ users'
  },
  {
    year: 'Now',
    title: 'Continuous Evolution',
    description: 'Constantly learning new technologies and pushing the boundaries of my creativity.',
    icon: 'fas fa-infinity',
    color: '#F95738',
    skills: ['Web3', 'AI Integration', 'Advanced Animations'],
    achievement: 'Building innovative digital experiences'
  }
];

const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [activeTab, setActiveTab] = useState('about');
  const [activeCategory, setActiveCategory] = useState('languages');
  
  // Custom animation variants with smooth looping transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        ease: "easeInOut",
        duration: 0.7
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.7, 
        ease: [0.43, 0.13, 0.23, 0.96] 
      }
    }
  };
  
  const highlightVariants = {
    hidden: { width: '0%' },
    visible: { 
      width: '100%',
      transition: { 
        duration: 1.2, 
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };
  
  const tabVariants = {
    inactive: { 
      opacity: 0.7, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    active: { 
      opacity: 1, 
      y: -3,
      color: 'var(--color-accent)',
      transition: { 
        duration: 0.5, 
        ease: [0.43, 0.13, 0.23, 0.96] 
      }
    }
  };
  
  return (
    <section 
      id="about" 
      ref={ref} 
      className="py-24 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute right-0 top-20 w-96 h-96 bg-[var(--color-primary)] rounded-full opacity-5 blur-3xl"></div>
      <div className="absolute left-0 bottom-20 w-72 h-72 bg-[var(--color-accent)] rounded-full opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto px-8 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Interactive section tabs */}
          <motion.div 
            className="flex justify-center mb-16 relative"
            variants={itemVariants}
          >
            <div className="glass-card rounded-full p-1.5 shadow-xl">
              <div className="flex space-x-3">
                {['about', 'skills', 'journey'].map(tab => (
                  <motion.button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 text-lg font-medium rounded-full relative`}
                    variants={tabVariants}
                    initial="inactive"
                    animate={activeTab === tab ? "active" : "inactive"}
                    whileTap={{ scale: 0.97 }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    {activeTab === tab && (
                      <motion.div 
                        className="absolute bottom-0 left-0 right-0 mx-auto h-full w-full bg-[rgba(100,255,218,0.1)] rounded-full -z-10"
                        layoutId="tabHighlight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
          
          <AnimatePresence mode="wait">
            {/* About Me Tab */}
            {activeTab === 'about' && (
              <motion.div
                key="about-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-5 gap-10 items-center"
              >
                <div className="md:col-span-2">
                  <div className="relative">
                    <div className="mask-hexagon overflow-hidden relative w-full max-w-sm mx-auto aspect-square">
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] opacity-20"
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.2, 0.3, 0.2],
                        }}
                        transition={{ 
                          duration: 8, 
                          repeat: Infinity, 
                          ease: "easeInOut",
                          repeatType: "reverse"
                        }}
                      />
                      <img 
                        src="/images/profile.jpg" 
                        alt="Developer profile" 
                        className="object-cover w-full h-full scale-105"
                      />
                    </div>
                    
                    {/* Code snippet overlay */}
                    <motion.div 
                      className="absolute -top-3 -right-3 glass-card p-3 rounded-lg max-w-[200px] overflow-hidden text-xs font-mono"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      <div className="text-[var(--color-primary)]">class <span className="text-[var(--color-accent)]">Developer</span> {`{`}</div>
                      <div className="pl-4">
                        <div className="text-[var(--color-muted)]">// Passionate about code</div>
                        <div className="text-[var(--color-highlight)]">createAwesomeStuff() {`{`}</div>
                        <div className="pl-4 typing-animation-2">return magic;</div>
                        <div className="text-[var(--color-highlight)]">{`}`}</div>
                      </div>
                      <div>{`}`}</div>
                    </motion.div>
                    
                    {/* Floating badges */}
                    <motion.div
                      className="absolute -bottom-6 -left-6 glass-card py-1.5 px-3 rounded-full shadow-lg"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ 
                        duration: 5, 
                        repeat: Infinity, 
                        ease: "easeInOut",
                        repeatType: "reverse" 
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <i className="fas fa-code text-[var(--color-accent)]"></i>
                        <span className="text-sm">Problem Solver</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
                
                <div className="md:col-span-3 space-y-6">
                  <div>
                    <motion.h2 
                      className="text-4xl md:text-5xl font-bold mb-3"
                      variants={itemVariants}
                    >
                      I'm <span className="gradient-text">Pritam</span>
                    </motion.h2>
                    
                    <motion.div 
                      className="h-1 w-24 bg-[var(--color-accent)] rounded mb-6"
                      variants={highlightVariants}
                    />
                    
                    <motion.p 
                      className="text-xl leading-relaxed mb-6 text-[var(--color-light)]"
                      variants={itemVariants}
                    >
                      A <span className="text-[var(--color-primary)]">full-stack developer</span> with a passion for crafting engaging digital experiences that blend creativity with technical precision. I thrive on transforming complex problems into elegant, user-centered solutions.
                    </motion.p>
                    
                    <motion.p 
                      className="text-lg leading-relaxed text-[var(--color-muted)]"
                      variants={itemVariants}
                    >
                      My journey in technology is driven by curiosity and the constant desire to innovate. I approach each project with the goal of delivering exceptional results that not only meet requirements but exceed expectations.
                    </motion.p>
                  </div>
                  
                  {/* Personal details with interactive icons */}
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6"
                    variants={containerVariants}
                  >

                    <motion.div 
                      className="flex items-center gap-4 group"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[rgba(100,255,218,0.1)] border border-[rgba(100,255,218,0.3)] group-hover:bg-[rgba(100,255,218,0.2)] transition-all">
                        <i className="fas fa-graduation-cap text-[var(--color-accent)]"></i>
                      </div>
                      <div>
                        <h4 className="text-sm text-[var(--color-muted)]">Degree</h4>
                        <p className="text-[var(--color-light)]">Computer Science</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-4 group"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[rgba(255,126,103,0.1)] border border-[rgba(255,126,103,0.3)] group-hover:bg-[rgba(255,126,103,0.2)] transition-all">
                        <i className="fas fa-code-branch text-[var(--color-highlight)]"></i>
                      </div>
                      <div>
                        <h4 className="text-sm text-[var(--color-muted)]">Experience</h4>
                        <p className="text-[var(--color-light)]">4+ Years</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex items-center gap-4 group"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[rgba(77,168,255,0.1)] border border-[rgba(77,168,255,0.3)] group-hover:bg-[rgba(77,168,255,0.2)] transition-all">
                        <i className="fas fa-briefcase text-[var(--color-primary)]"></i>
                      </div>
                      <div>
                        <h4 className="text-sm text-[var(--color-muted)]">Freelance</h4>
                        <p className="text-[var(--color-light)]">Available</p>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  {/* Call-to-action button */}
                  <motion.div
                    variants={itemVariants}
                    className="pt-4"
                  >
                    <motion.a 
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium text-[var(--color-darker)] relative overflow-hidden group"
                      style={{ background: 'var(--gradient-secondary)' }}
                      whileHover={{ y: -3, boxShadow: "0 15px 30px -10px rgba(100, 255, 218, 0.3)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span>Let's Talk</span>
                      <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            )}
            
            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <motion.div
                key="skills-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-10"
              >
                {/* Skill categories tabs */}
                <motion.div 
                  className="flex justify-center gap-4 flex-wrap mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {Object.keys(techStack).map(category => (
                    <motion.button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-5 py-2 rounded-md relative font-medium ${activeCategory === category ? 'text-[var(--color-accent)]' : 'text-[var(--color-muted)]'}`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                      {activeCategory === category && (
                        <motion.div 
                          className="absolute bottom-0 left-0 h-0.5 bg-[var(--color-accent)]"
                          layoutId="categoryHighlight"
                          initial={{ width: '0%' }}
                          animate={{ width: '100%' }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
                
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    {techStack[activeCategory as keyof typeof techStack].map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        className="glass-card rounded-xl p-5 hover:shadow-lg transition-all duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        whileHover={{ y: -5, boxShadow: "0 15px 30px -10px rgba(10, 25, 41, 0.3)" }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[rgba(77,168,255,0.1)] rounded-md flex items-center justify-center">
                              <i className={`${skill.icon} text-[var(--color-primary)]`}></i>
                            </div>
                            <h3 className="text-xl font-medium">{skill.name}</h3>
                          </div>
                          <span className="text-[var(--color-accent)]">{skill.level}%</span>
                        </div>
                        
                        <div className="h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden">
                          <motion.div 
                            className="h-full rounded-full"
                            style={{ 
                              background: 'var(--gradient-primary)',
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.level}%` }}
                            transition={{ 
                              duration: 1.5, 
                              delay: 0.3 + index * 0.1,
                              ease: [0.43, 0.13, 0.23, 0.96]
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
                
                <motion.div 
                  className="text-center pt-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-[var(--color-muted)] italic">Always learning new technologies and expanding my skill set.</p>
                </motion.div>
              </motion.div>
            )}
            
            {/* Journey Tab - Redesigned */}
            {activeTab === 'journey' && (
              <motion.div
                key="journey-tab"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                {/* Journey intro */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">My Development <span className="gradient-text">Timeline</span></h2>
                  <div className="h-1 w-24 bg-[var(--color-accent)] rounded mb-6 mx-auto"></div>
                  <p className="max-w-2xl mx-auto text-[var(--color-muted)]">A visual representation of my professional growth and key milestones in my development journey.</p>
                </motion.div>
                
                {/* Journey timeline - modern card design */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 relative">
                  {/* Background shimmer effect */}
                  <motion.div 
                    className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 w-1"
                    style={{
                      background: "linear-gradient(to bottom, rgba(77,168,255,0.1), rgba(77,168,255,0.3), rgba(100,255,218,0.3), rgba(255,126,103,0.3))"
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '0% 100%'],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  />
                  
                  {journeyItems.map((item, index) => {
                    // Determine if the item should be on the left or right
                    const isLeft = index % 2 === 0;
                    const gridPos = isLeft 
                      ? "md:col-span-5 md:col-start-1" 
                      : "md:col-span-5 md:col-start-7";
                    
                    return (
                      <motion.div 
                        key={item.year}
                        className={`${gridPos} relative z-10 md:mb-16`}
                        initial={{ opacity: 0, y: 30, x: isLeft ? -30 : 30 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        transition={{ 
                          duration: 0.7, 
                          delay: index * 0.15,
                          ease: [0.43, 0.13, 0.23, 0.96]
                        }}
                        whileHover={{ 
                          y: -5, 
                          transition: { 
                            duration: 0.3 
                          } 
                        }}
                      >
                        {/* Journey card with gradient border */}
                        <div 
                          className="glass-card rounded-xl p-6 border border-opacity-30 relative overflow-hidden group h-full"
                          style={{ borderColor: item.color }}
                        >
                          {/* Top accent bar */}
                          <div 
                            className="absolute top-0 left-0 w-full h-1"
                            style={{ background: `linear-gradient(to right, ${item.color}50, ${item.color})` }}
                          ></div>
                          
                          {/* Year badge */}
                          <div 
                            className="absolute -top-5 right-5 w-20 h-10 flex items-center justify-center rounded-b-lg shadow-lg text-sm font-bold"
                            style={{ background: item.color }}
                          >
                            <span className="text-white">{item.year}</span>
                          </div>
                          
                          {/* Content */}
                          <div className="pt-4">
                            <div className="flex items-center gap-3 mb-4">
                              <div 
                                className="w-12 h-12 rounded-lg flex items-center justify-center shadow-lg"
                                style={{ background: `${item.color}20`, color: item.color }}
                              >
                                <i className={`${item.icon} text-xl`}></i>
                              </div>
                              <h3 className="text-xl font-bold">{item.title}</h3>
                            </div>
                            
                            <p className="text-[var(--color-muted)] mb-6">{item.description}</p>
                            
                            {/* Key skills */}
                            <div className="mb-4">
                              <h4 className="text-sm text-[var(--color-muted)] uppercase tracking-wider mb-2">Key Skills</h4>
                              <div className="flex flex-wrap gap-2">
                                {item.skills.map((skill, idx) => (
                                  <motion.span 
                                    key={idx}
                                    className="px-3 py-1 rounded-full text-xs font-medium"
                                    style={{ 
                                      background: `${item.color}15`, 
                                      color: item.color,
                                      border: `1px solid ${item.color}30` 
                                    }}
                                    whileHover={{ scale: 1.05 }}
                                  >
                                    {skill}
                                  </motion.span>
                                ))}
                              </div>
                            </div>
                            
                            {/* Achievement highlight */}
                            <div 
                              className="mt-auto text-sm font-medium py-2 px-3 rounded"
                              style={{ background: `${item.color}10` }}
                            >
                              <span className="text-[var(--color-light)]">
                                <i className="fas fa-trophy mr-2" style={{ color: item.color }}></i>
                                {item.achievement}
                              </span>
                            </div>
                          </div>
                          
                          {/* Connection dot to timeline */}
                          <div 
                            className={`hidden md:block absolute top-1/2 ${isLeft ? 'right-[-30px]' : 'left-[-30px]'} w-6 h-6 rounded-full`}
                            style={{ background: item.color, border: '3px solid rgb(20, 20, 30)' }}
                          ></div>
                          
                          {/* Animated highlight on hover */}
                          <motion.div 
                            className="absolute inset-0 opacity-0 group-hover:opacity-100"
                            style={{ 
                              background: `radial-gradient(circle at center, ${item.color}10 0%, transparent 70%)`,
                              pointerEvents: 'none'
                            }}
                            initial={{ scale: 0.8 }}
                            whileHover={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                
                {/* Final element with inspiration quote */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.7 }}
                  className="text-center mt-10 max-w-2xl mx-auto"
                >
                  <div className="glass-card p-6 rounded-xl">
                    <blockquote className="italic text-[var(--color-light)]">
                      "The most important thing is to never stop questioning and learning."
                    </blockquote>
                    <div className="mt-2 font-medium text-[var(--color-accent)]">— My Development Philosophy</div>
                  </div>
                  
                  <motion.div
                    className="mt-8"
                    whileHover={{ y: -3 }}
                  >
                    <a 
                      href="#contact"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-[var(--color-darker)] relative overflow-hidden group"
                      style={{ background: 'var(--gradient-primary)' }}
                    >
                      <span>Ready to collaborate?</span>
                      <i className="fas fa-rocket group-hover:translate-x-1 transition-transform"></i>
                    </a>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      
      <style>
        {`
          .mask-hexagon {
            clip-path: polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%);
          }
          
          .typing-animation-2 {
            border-right: 2px solid var(--color-accent);
            overflow: hidden;
            white-space: nowrap;
            animation: typing 4s steps(22) infinite, blink-caret 0.75s step-end infinite;
          }
          
          @keyframes typing {
            0% { width: 0 }
            20% { width: 100% }
            80% { width: 100% }
            100% { width: 0 }
          }
          
          @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: var(--color-accent) }
          }
        `}
      </style>
    </section>
  );
};

export default AboutSection;
