import { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { Eyebrow } from './Pill';

/** Eyebrow, heading and optional subline — centred by default, as on the landing. */
export const SectionHeader = ({
  eyebrow,
  title,
  sub,
  align = 'center',
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  sub?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) => (
  <div className={cn('max-w-[680px]', align === 'center' ? 'mx-auto text-center' : 'text-left', className)}>
    <Eyebrow className="mb-[22px]">{eyebrow}</Eyebrow>
    <h2 className="m-0 font-display text-[clamp(32px,4.6vw,62px)] font-semibold leading-[1.04] tracking-[-0.04em]">
      {title}
    </h2>
    {sub && <p className="m-0 mt-[18px] text-[17px] leading-[1.6] text-[var(--color-muted)]">{sub}</p>}
  </div>
);
