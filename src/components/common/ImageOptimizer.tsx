import React from 'react';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}

const ImageOptimizer: React.FC<ImageOptimizerProps> = ({
  src,
  alt,
  sizes = '100vw',
  className
}) => {
  return (
    <picture>
      <source
        type="image/webp"
        srcSet={`
          ${src}?format=webp&w=640 640w,
          ${src}?format=webp&w=768 768w,
          ${src}?format=webp&w=1024 1024w,
          ${src}?format=webp&w=1280 1280w
        `}
        sizes={sizes}
      />
      <source
        type="image/jpeg"
        srcSet={`
          ${src}?w=640 640w,
          ${src}?w=768 768w,
          ${src}?w=1024 1024w,
          ${src}?w=1280 1280w
        `}
        sizes={sizes}
      />
      <img
        src={`${src}?w=1280`}
        alt={alt}
        className={className}
        loading="lazy"
      />
    </picture>
  );
};

export default ImageOptimizer;