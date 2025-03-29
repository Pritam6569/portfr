import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useAnimationValues } from '../hooks/use-animation-values';

const DiscordSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const { toast } = useToast();
  
  const { staggerContainer, fadeInUp, slideInLeft, slideInRight, scaleUp } = useAnimationValues();
  
  const handleCopyDiscordUsername = () => {
    navigator.clipboard.writeText('pritam');
    toast({
      title: "Username Copied!",
      description: "Discord username copied to clipboard.",
    });
  };

  return (
    <section 
      id="discord" 
      ref={ref} 
      className="py-20 relative overflow-hidden"
      style={{ 
        background: `radial-gradient(circle at 70% 30%, rgba(88, 101, 242, 0.15) 0%, rgba(10, 25, 41, 0) 70%)` 
      }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          className="absolute w-64 h-64 rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(88, 101, 242, 0.15) 0%, rgba(10, 25, 41, 0) 70%)',
            top: '20%',
            right: '15%',
            filter: 'blur(40px)'
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="absolute w-72 h-72 rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(114, 137, 218, 0.1) 0%, rgba(10, 25, 41, 0) 70%)',
            bottom: '15%',
            left: '10%',
            filter: 'blur(30px)'
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 8,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Let's Connect on <span className="gradient-discord">Discord</span>
          </motion.h2>
          <motion.div 
            variants={fadeInUp}
            className="h-1 w-24 bg-[#5865F2] mx-auto mb-6"
          />
          <motion.p 
            variants={fadeInUp}
            className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto"
          >
            I'm most active on Discord. Join my server or send me a direct message for collaborations, questions, or just to say hello!
          </motion.p>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          {/* Discord Profile Card */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full max-w-md glass-card p-8 rounded-xl border border-[rgba(88,101,242,0.3)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#5865F2] via-[#7289DA] to-[#4E5CDD]"></div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-[#5865F2] flex items-center justify-center text-white text-xl font-bold overflow-hidden border-4 border-[#36393F]">
                <motion.span
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >P</motion.span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold flex items-center">
                  pritam
                  <span className="ml-2 text-xs text-[#B9BBBE] py-0.5 px-1.5 rounded bg-[rgba(255,255,255,0.1)]">
                    User
                  </span>
                </h3>
                <div className="text-sm text-[#B9BBBE]">Online and ready to connect</div>
              </div>
            </div>
            
            <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-lg mb-6">
              <div className="text-sm font-medium text-[#B9BBBE] mb-2">ABOUT ME</div>
              <div className="text-white">Full-stack developer with a passion for creating interactive and visually stunning web experiences.</div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.03, y: -2, boxShadow: "0 10px 25px -5px rgba(88, 101, 242, 0.5)" }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCopyDiscordUsername}
              className="w-full py-3 rounded-md bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              <motion.span 
                className="absolute inset-0 bg-gradient-to-tr from-[#4752C4] via-[#5865F2] to-[#7289DA] opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.4 }}
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path d="M9.5.5l-3 3 3 3v-2c3.03 0 5.5 2.47 5.5 5.5s-2.47 5.5-5.5 5.5S4.5 13.53 4.5 10.5V8H3v2.5C3 14.09 5.91 17 9.5 17s6.5-2.91 6.5-6.5S13.09 4 9.5 4V2l-3-3V.5z"/>
              </svg>
              Copy Username
            </motion.button>
            
            <div className="mt-4 text-xs text-center text-[#B9BBBE]">
              My Discord username: <span className="text-white">pritam</span>
            </div>
          </motion.div>
          
          {/* Discord Server Card */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full max-w-md glass-card p-8 rounded-xl border border-[rgba(88,101,242,0.3)] relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#4E5CDD] via-[#7289DA] to-[#5865F2]"></div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-lg bg-[#5865F2] flex items-center justify-center text-white text-xl font-bold overflow-hidden border-4 border-[#36393F]">
                <motion.div
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
                  </svg>
                </motion.div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">Pritam's Server</h3>
                <div className="text-sm text-[#B9BBBE]">Join our growing community</div>
              </div>
            </div>
            
            <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-lg mb-6">
              <div className="text-sm font-medium text-[#B9BBBE] mb-2">SERVER PERKS</div>
              <ul className="text-white space-y-2">
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                  </svg>
                  Coding challenges and discussions
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                  </svg>
                  Live coding sessions
                </li>
                <li className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                  </svg>
                  Networking with other developers
                </li>
              </ul>
            </div>
            
            <motion.a
              href="https://discord.gg/zAtZEhhKnn" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -2, boxShadow: "0 10px 25px -5px rgba(88, 101, 242, 0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-md bg-[#5865F2] hover:bg-[#4752C4] text-white font-medium transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
            >
              <motion.span 
                className="absolute inset-0 bg-gradient-to-tr from-[#4752C4] via-[#5865F2] to-[#7289DA] opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.4 }}
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z"/>
              </svg>
              Join Server
            </motion.a>
            
            <div className="mt-4 text-xs text-center text-[#B9BBBE]">
              Server invite: <span className="text-white">discord.gg/zAtZEhhKnn</span>
            </div>
          </motion.div>
        </div>
        
        {/* Floating discord message */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-xs glass-card p-4 rounded-lg border border-[rgba(88,101,242,0.3)] mt-16 mx-auto relative discord-message"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-white font-bold">P</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-[#FFFFFF]">pritam</span>
                <span className="text-xs text-[#B9BBBE]">Today at {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div className="mt-1 text-white typing-animation-discord">
                Hey there! Let's collaborate... <span className="animate-pulse">|</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Discord Features */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20"
        >
          <motion.div 
            variants={scaleUp}
            className="glass-card p-6 rounded-xl border border-[rgba(88,101,242,0.2)] hover:border-[rgba(88,101,242,0.5)] transition-all"
          >
            <div className="w-12 h-12 bg-[rgba(88,101,242,0.2)] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#5865F2" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 7a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm6-7a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 7a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Real-time Collaboration</h3>
            <p className="text-[var(--color-muted)]">Engage in real-time discussions and code sharing within our Discord community.</p>
          </motion.div>
          
          <motion.div 
            variants={scaleUp}
            className="glass-card p-6 rounded-xl border border-[rgba(88,101,242,0.2)] hover:border-[rgba(88,101,242,0.5)] transition-all"
          >
            <div className="w-12 h-12 bg-[rgba(88,101,242,0.2)] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#5865F2" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Join Exclusive Events</h3>
            <p className="text-[var(--color-muted)]">Access exclusive live coding sessions and programming workshops in the server.</p>
          </motion.div>
          
          <motion.div 
            variants={scaleUp}
            className="glass-card p-6 rounded-xl border border-[rgba(88,101,242,0.2)] hover:border-[rgba(88,101,242,0.5)] transition-all"
          >
            <div className="w-12 h-12 bg-[rgba(88,101,242,0.2)] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#5865F2" viewBox="0 0 16 16">
                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Network With Peers</h3>
            <p className="text-[var(--color-muted)]">Connect with like-minded developers and expand your professional network.</p>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Discord floating emotes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 opacity-30"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight + window.innerHeight,
              opacity: 0 
            }}
            animate={{ 
              y: -100, 
              opacity: [0, 0.4, 0],
              rotate: Math.random() * 360
            }}
            transition={{ 
              duration: 15 + Math.random() * 10,
              delay: i * 2, 
              repeat: Infinity,
              repeatDelay: Math.random() * 5
            }}
          >
            {i % 4 === 0 ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#5865F2">
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zM4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM10 8c-.552 0-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5S10.552 8 10 8z"/>
              </svg>
            ) : i % 4 === 1 ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#7289DA">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M4.285 12.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 10.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 9.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z"/>
              </svg>
            ) : i % 4 === 2 ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#99AAB5">
                <path d="M13.596 7.904a.75.75 0 0 1 .626 1.363 4.5 4.5 0 0 1-1.626.859 3.986 3.986 0 0 0-1.283-.252 4.011 4.011 0 0 0-2.75 1.076c.162.413.345.915.345 1.542 0 1.3-.772 2.288-2.156 2.288-1.3 0-2.25-.917-2.25-2.13 0-1.092.845-1.917 1.983-1.977a1.65 1.65 0 0 0 .872-1.121 2.013 2.013 0 0 0-1.39-2.07 1.696 1.696 0 0 0-.369-.04.673.673 0 0 1-.63-.54 5.39 5.39 0 0 1 2.602-1.938.75.75 0 0 1 .628 1.362c-.715.329-1.35.875-1.804 1.539.258.045.52.076.782.092a3.5 3.5 0 0 1 3.051 2.839 3.79 3.79 0 0 1 2.369-2.018c-.561-.31-1.01-.874-1.01-1.528 0-1.126 1.153-1.971 2.478-1.971.6 0 1.092.128 1.532.358Z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#FAA61A">
                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828l.645-1.937zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.734 1.734 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.734 1.734 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.734 1.734 0 0 0 3.407 2.31l.387-1.162zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.156 1.156 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.156 1.156 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732L10.863.1z"/>
              </svg>
            )}
          </motion.div>
        ))}
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .gradient-discord {
          background: linear-gradient(120deg, #5865F2, #7289DA, #99AAB5, #5865F2);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-animation 8s ease infinite;
        }
        
        .discord-message {
          box-shadow: 0 8px 30px rgba(88, 101, 242, 0.15);
          animation: float 5s ease-in-out infinite;
        }
        
        .typing-animation-discord {
          overflow: hidden;
          border-right: none;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0px);
            box-shadow: 0 10px 20px rgba(88, 101, 242, 0.15);
          }
          50% {
            transform: translateY(-8px);
            box-shadow: 0 20px 30px rgba(88, 101, 242, 0.1);
          }
          100% {
            transform: translateY(0px);
            box-shadow: 0 10px 20px rgba(88, 101, 242, 0.15);
          }
        }
        
        .glass-card:hover {
          transform: translateY(-5px);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 15px 30px rgba(88, 101, 242, 0.2);
        }
      `}} />
    </section>
  );
};

export default DiscordSection;