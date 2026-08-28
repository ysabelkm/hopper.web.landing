"use client";

import { useState } from 'react';
import { cn } from '../lib/utils';

export type PanelRow = {
  num: string;
  title: string;
  desc: string;
  /** Optional uppercase technical line under the description (how-it-works). */
  detail?: string;
  /** Image for the sticky panel; `null` renders the hatched placeholder. */
  img: string | null;
  /** Caption shown inside the placeholder when `img` is null. */
  placeholder?: string;
};

type StickyPanelListProps = {
  rows: PanelRow[];
  /** Photos fill the tile; app mockups sit contained on the panel floor. */
  fit?: 'cover' | 'contain';
  /** How-it-works uses a slightly roomier grid than the landing use cases. */
  variant?: 'steps' | 'segments';
};

/**
 * A hairline-divided list beside a sticky panel: hovering a row cross-fades the
 * matching layer in. Every layer is mounted and absolutely positioned so the
 * transition is a pure opacity swap with nothing to load on hover.
 */
export const StickyPanelList = ({ rows, fit = 'cover', variant = 'steps' }: StickyPanelListProps) => {
  const [active, setActive] = useState(0);
  const isSteps = variant === 'steps';

  return (
    <div
      className={cn(
        'grid items-start gap-14 lg:gap-x-[60px]',
        isSteps ? 'lg:grid-cols-[1.15fr_0.85fr]' : 'lg:grid-cols-[1.1fr_0.9fr]',
      )}
    >
      <div className="flex flex-col">
        {rows.map((row, i) => (
          <div
            key={row.num}
            onMouseEnter={() => setActive(i)}
            className={cn(
              'grid cursor-default grid-cols-[24px_1fr] gap-3 border-t border-[var(--color-surface-border)] px-1 sm:grid-cols-[36px_1fr] sm:gap-4',
              isSteps ? 'py-[30px]' : 'py-[26px]',
            )}
          >
            <span className={cn('text-[11px] tracking-[0.1em] text-[var(--color-faint)]', isSteps ? 'pt-[7px]' : 'pt-[5px]')}>
              {row.num}
            </span>
            <div>
              <div
                className={cn(
                  'font-display font-medium tracking-[-0.02em]',
                  isSteps ? 'mb-[9px] text-[22px]' : 'mb-2 text-[21px]',
                )}
              >
                {row.title}
              </div>
              <div
                className={cn(
                  'text-[14.5px] leading-[1.6] text-[var(--color-muted)]',
                  isSteps ? 'mb-3.5 max-w-[430px] leading-[1.65]' : 'max-w-[420px]',
                )}
              >
                {row.desc}
              </div>
              {row.detail && (
                <div className="text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-faint)]">{row.detail}</div>
              )}
            </div>
          </div>
        ))}
        <div className="border-t border-[var(--color-surface-border)]" />
      </div>

      <div
        className={cn(
          'relative hidden aspect-[4/5] overflow-hidden rounded-[20px] border border-[var(--color-surface-border)] bg-[var(--color-surface-1)] lg:sticky lg:block',
          isSteps ? 'lg:top-[130px]' : 'lg:top-[120px]',
        )}
      >
        {rows.map((row, i) => (
          <div
            key={row.num}
            aria-hidden
            className="absolute inset-0 transition-opacity duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: active === i ? 1 : 0,
              ...(row.img
                ? {
                    backgroundImage: `url(${row.img})`,
                    backgroundSize: fit,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: fit === 'contain' ? 'center bottom' : 'center',
                  }
                : {
                    display: 'grid',
                    placeItems: 'center',
                    backgroundImage:
                      'repeating-linear-gradient(135deg, var(--color-ghost) 0 10px, transparent 10px 20px)',
                  }),
            }}
          >
            {!row.img && (
              <span className="text-[10.5px] uppercase tracking-[0.2em] text-[var(--color-faint)]">
                {row.placeholder}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
