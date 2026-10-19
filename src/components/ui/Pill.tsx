import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

/** The tilted blue headline highlight — see `.hop-pill` in index.css. */
export const Pill = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span className={cn('hop-pill', className)}>{children}</span>
);

/** Small uppercase accent label that sits above section headings. */
export const Eyebrow = ({ children, className }: { children: ReactNode; className?: string }) => (
  <span
    className={cn(
      'block text-[10.5px] font-semibold uppercase tracking-[0.34em] text-[var(--color-brand-blue)]',
      className,
    )}
  >
    {children}
  </span>
);
