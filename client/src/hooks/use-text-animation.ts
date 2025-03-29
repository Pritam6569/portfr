import { useState, useEffect } from 'react';

export const useTextAnimation = (phrases: string[], interval: number = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState(phrases[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % phrases.length;
      setCurrentIndex(nextIndex);
      setCurrentPhrase(phrases[nextIndex]);
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex, interval, phrases]);

  return currentPhrase;
};
