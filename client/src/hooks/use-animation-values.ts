import { useCallback } from 'react';
import { Variants } from 'framer-motion';

export const useAnimationValues = () => {
  // Stagger container for parent elements
  const staggerContainer: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  // Fade up animation for children
  const fadeInUp: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: (custom = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: custom * 0.1,
      },
    }),
  };

  // Slide from left animation
  const slideInLeft: Variants = {
    hidden: { 
      opacity: 0, 
      x: -50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Slide from right animation
  const slideInRight: Variants = {
    hidden: { 
      opacity: 0, 
      x: 50 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Scale up animation
  const scaleUp: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  // Image variant with morph effect
  const imageVariant: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return {
    staggerContainer,
    fadeInUp,
    slideInLeft,
    slideInRight,
    scaleUp,
    imageVariant
  };
};
