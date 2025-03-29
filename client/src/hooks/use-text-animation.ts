import { useState, useEffect } from 'react';

export const useTextAnimation = (phrases: string[], interval: number = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  useEffect(() => {
    // Fade-out and fade-in animation sequence
    const cyclePhrase = () => {
      // Start fade-out
      setIsTransitioning(true);
      
      // After fade-out, change the phrase
      setTimeout(() => {
        const nextIndex = (currentIndex + 1) % phrases.length;
        setCurrentIndex(nextIndex);
        setCurrentPhrase(phrases[nextIndex]);
        
        // Start fade-in
        setIsTransitioning(false);
      }, 400); // Fade-out duration (400ms)
    };
    
    const timer = setInterval(cyclePhrase, interval);
    
    return () => {
      clearInterval(timer);
    };
  }, [currentIndex, interval, phrases]);
  
  // Return both the current phrase and the transition state
  return currentPhrase;
};
