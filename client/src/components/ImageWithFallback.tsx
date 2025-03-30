import { useState } from 'react';
import { motion } from 'framer-motion';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  whileHover?: any;
  transition?: any;
}

const ImageWithFallback = ({ 
  src, 
  alt, 
  className = '',
  whileHover,
  transition 
}: ImageWithFallbackProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Temporary placeholder for testing
  const placeholderImage = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 630'%3E%3Crect width='100%25' height='100%25' fill='%23111827'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' font-family='system-ui' font-size='32' fill='%234B5563'%3E${alt}%3C/text%3E%3C/svg%3E`;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 bg-dark/50 flex items-center justify-center">
          <motion.div 
            className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}
      
      {/* Main Image or Fallback */}
      <motion.img
        src={hasError ? placeholderImage : src}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        onLoad={handleLoad}
        onError={handleError}
        whileHover={whileHover}
        transition={transition}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Error Overlay */}
      {hasError && (
        <div className="absolute inset-0 bg-dark/80 flex items-center justify-center text-center p-4">
          <div>
            <div className="text-4xl mb-2">🖼️</div>
            <div className="text-sm text-gray-400">Failed to load image</div>
            <div className="text-xs text-gray-500 mt-1">{alt}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
