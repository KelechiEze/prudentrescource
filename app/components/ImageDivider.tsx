'use client';
import React from 'react';
import { HERO_IMAGES } from '../../constants';

const ImageDivider: React.FC = () => {
  // Use the first image from the Hero carousel
  const image = HERO_IMAGES[0];

  return (
    <section className="w-full h-[500px] md:h-[600px] overflow-hidden relative">
      <img 
        src={image.url} 
        alt={image.alt} 
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    </section>
  );
};

export default ImageDivider;