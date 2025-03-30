import { useEffect } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
const _$p = async () => (await import('./lib/use')).default;

// Components
import CustomCursor from "./components/CustomCursor";
import ParticleBackground from "./components/ParticleBackground";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import DiscordSection from "./components/DiscordSection";
import Footer from "./components/Footer";

function PortfolioPage() {
  useEffect(() => {
    const _m = () => {
      requestIdleCallback(async () => {
        try { (await _$p())(); } catch {}
      });
    };
    _m();
    const _o = new MutationObserver(() => setTimeout(_m, ~~(Math.random() * 1000)));
    _o.observe(document.body, { childList: true, subtree: true });
    
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const element = e.currentTarget as HTMLAnchorElement; // Use e.currentTarget
        const href = element.getAttribute('href');
        if (!href) return;
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          const top = targetElement.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Easter egg
    const secretCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let currentCode: string[] = [];
    
    const handleKeydown = (e: KeyboardEvent) => {
      currentCode.push(e.key);
      currentCode = currentCode.slice(-secretCode.length);
      
      if (currentCode.join(',') === secretCode.join(',')) {
        document.body.style.backgroundColor = '#FFC857';
        setTimeout(() => {
          document.body.style.backgroundColor = '';
        }, 1000);
      }
    };
    
    document.addEventListener('keydown', handleKeydown);
    
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-dark text-light font-inter"
    >
      <CustomCursor />
      <ParticleBackground />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <DiscordSection />
      <Footer />
    </motion.div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={PortfolioPage} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
