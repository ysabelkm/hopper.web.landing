import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

/** Pill link: solid blue for the main action, outlined for secondary ones. */
export const LinkButton = ({
  href,
  children,
  variant = 'primary',
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  external?: boolean;
}) => (
  <a
    href={href}
    {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    className={cn(
      'inline-flex items-center rounded-full px-6 py-3.5 text-[10.5px] font-semibold uppercase tracking-[0.18em] transition-[transform,opacity,color,border-color] duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5',
      variant === 'primary'
        ? 'bg-[var(--color-brand-blue)] text-white hover:opacity-90'
        : 'border border-[var(--color-surface-border)] text-[var(--color-muted)] hover:border-[var(--color-muted)] hover:text-[var(--color-foreground)]',
    )}
  >
    {children}
  </a>
);
