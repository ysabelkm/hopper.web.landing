"use client";

type HopperLogoProps = {
  theme?: 'light' | 'dark';
  className?: string;
  alt?: string;
};

export const HopperLogo = ({ theme = 'dark', className = '', alt = 'Hopper' }: HopperLogoProps) => {
  const src = theme === 'light' ? '/hopper_logo_black.png' : '/hopper_logo_white.png';

  return <img src={src} alt={alt} className={className} draggable={false} />;
};
