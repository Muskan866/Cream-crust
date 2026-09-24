import React, { useState } from 'react';
import { Cake } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Bakery item',
  className = '',
  containerClassName = 'w-full h-full',
  fallbackTitle,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#F4EFEA] ${containerClassName}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover block transition-transform duration-500 ${className}`}
          {...props}
        />
      ) : (
        <div className="w-full h-full min-h-[140px] flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#FDF9F3] to-[#EFE7DE] text-[#7A6858] text-center">
          <div className="w-12 h-12 rounded-full bg-[#E5DACD] flex items-center justify-center mb-2 shadow-inner">
            <Cake className="w-6 h-6 text-[#8B6B55]" />
          </div>
          <span className="text-xs font-serif text-[#4A3B32] font-semibold tracking-wide">
            {fallbackTitle || alt}
          </span>
          <span className="text-[10px] text-[#9A8778] mt-0.5 tracking-wider uppercase">
            Artisanal Recipe
          </span>
        </div>
      )}
    </div>
  );
};
