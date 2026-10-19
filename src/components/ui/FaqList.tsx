"use client";

import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export type Faq = { q: string; a: string };

const FaqItem = ({ q, a, open, onToggle }: Faq & { open: boolean; onToggle: () => void }) => {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Measure the answer once it is laid out, and again on resize, so the
  // max-height transition always animates to the real height rather than to a
  // guessed one.
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const measure = () => setHeight(el.scrollHeight);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [a]);

  return (
    <div className="border-t border-[var(--color-surface-border)] first:border-t-0">
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-6 border-none bg-transparent py-6 text-left text-[var(--color-foreground)]"
      >
        <span className="text-[16.5px] font-medium tracking-[-0.01em]">{q}</span>
        {/* The + rotates 45° to read as an × */}
        <span
          aria-hidden
          className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[var(--color-surface-border)] text-base text-[var(--color-faint)] transition-transform duration-[240ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ transform: open ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-[320ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ maxHeight: open ? height : 0, opacity: open ? 1 : 0 }}
      >
        <div ref={bodyRef}>
          <p className="m-0 mb-[26px] max-w-[600px] text-[15px] leading-[1.7] text-[var(--color-muted)]">{a}</p>
        </div>
      </div>
    </div>
  );
};

/** Single-open accordion inside a rounded card. */
export const FaqList = ({ items, className }: { items: Faq[]; className?: string }) => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-[760px] flex-col rounded-[28px] border border-[var(--color-surface-border)] bg-[var(--color-surface-1)] px-6 sm:px-10',
        className,
      )}
    >
      {items.map((item, i) => (
        <FaqItem
          key={item.q}
          q={item.q}
          a={item.a}
          open={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </div>
  );
};
