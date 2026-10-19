import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

/** The rounded gray surface used for cards across the redesign. */
export const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div
    className={cn(
      'rounded-[28px] border border-[var(--color-surface-border)] bg-[var(--color-surface-1)]',
      className,
    )}
  >
    {children}
  </div>
);
