"use client";

import React from 'react';

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode;
};

export const HowItWorksLink = ({ children, ...props }: Props) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    try {
      if (typeof window !== 'undefined' && window.location.pathname === '/') {
        // if on landing page, smooth scroll instead of full navigation
        e.preventDefault();
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        else window.location.href = '/#how-it-works';
      }
    } catch (err) {
      // fallback: allow navigation
    }

    // call any user-provided onClick as well
    if (typeof props.onClick === 'function') props.onClick(e as any);
  };

  return (
    <a href="/how-it-works" {...props} onClick={handleClick}>
      {children}
    </a>
  );
};
