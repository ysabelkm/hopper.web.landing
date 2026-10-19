"use client";

import Image from 'next/image';
import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Eyebrow, Pill } from './ui/Pill';
import { useTheme, Theme } from '../hooks/useTheme';
import { useMeshCanvas } from '../hooks/useMeshCanvas';
import { cn } from '../lib/utils';

type Post = {
  category: string;
  minutes: number;
  title: string;
  summary: string;
  /** `null` renders the striped accent placeholder. */
  cover: string | null;
  /** Unset until the post exists; the card then renders without a link. */
  href?: string;
};

// Placeholder posts from the design handoff — replace once posts are backed by
// a CMS or MDX and a post template exists.
const POSTS: Post[] = [
  {
    category: 'Engineering',
    minutes: 6,
    title: 'How a message hops: inside Hopper’s mesh relay',
    summary: 'What happens between tapping send and the other phone buzzing, one hop at a time.',
    cover: '/images/ruralareas.jpg',
  },
  {
    category: 'Product',
    minutes: 4,
    title: 'Safety codes: verifying who you’re talking to',
    summary: 'A short walkthrough of the handshake and why you scan a code in person.',
    cover: '/images/campuses.jpg',
  },
  {
    category: 'Stories',
    minutes: 5,
    title: 'Chatting on campus without Wi-Fi',
    summary: 'How students use Hopper when the network gives up.',
    cover: '/images/festivals.jpg',
  },
  {
    category: 'Company',
    minutes: 3,
    title: 'Why Hopper costs ₦867 a month',
    summary: 'The thinking behind one plan, both platforms, every feature.',
    cover: null,
  },
];

const PostCard = ({ post, lead }: { post: Post; lead: boolean }) => {
  const body: ReactNode = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[var(--color-surface-1)]">
        {post.cover ? (
          <Image src={post.cover} alt="" fill sizes="(min-width: 1024px) 574px, 100vw" className="object-cover" />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background:
                'repeating-linear-gradient(135deg, color-mix(in oklab, var(--color-brand-blue) 14%, transparent) 0 10px, transparent 10px 20px)',
            }}
          />
        )}
      </div>
      <div className="flex items-center gap-3.5 text-[11px] font-semibold uppercase tracking-[0.2em]">
        <span className="text-[var(--color-brand-blue)]">{post.category}</span>
        <span className="text-[var(--color-faint)]">{post.minutes} min read</span>
      </div>
      <h2
        className={cn(
          'm-0 font-display font-semibold leading-[1.15] tracking-[-0.03em]',
          lead ? 'text-[26px] sm:text-[30px]' : 'text-[22px] sm:text-[24px]',
        )}
      >
        {post.title}
      </h2>
      <p className="m-0 max-w-[520px] text-[15px] leading-[1.6] text-[var(--color-muted)]">{post.summary}</p>
    </>
  );

  const cls = 'flex flex-col gap-[18px]';
  return post.href ? (
    <a href={post.href} className={cn(cls, 'group')}>
      {body}
    </a>
  ) : (
    <article className={cls}>{body}</article>
  );
};

export const BlogPage = ({ initialTheme = 'light' }: { initialTheme?: Theme }) => {
  const { theme, toggleTheme } = useTheme(initialTheme);
  const canvasRef = useMeshCanvas();

  return (
    <main className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)] transition-colors duration-500 ease-in-out">
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Header over the mesh, as on the other page heroes. */}
      <section className="relative overflow-hidden px-5 pt-[140px] pb-12 sm:px-8 md:pt-[170px] md:pb-16">
        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 block h-full w-full" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 52% 60% at 26% 56%, color-mix(in oklab, var(--color-background) 94%, transparent) 0%, transparent 78%)',
          }}
        />
        <div className="relative mx-auto max-w-[1180px]">
          <div className="max-w-[760px]">
            <span className="block animate-[hopFade_900ms_ease_160ms_both]">
              <Eyebrow className="mb-6">Blog</Eyebrow>
            </span>
            <h1 className="m-0 animate-[hopRise_1000ms_cubic-bezier(0.16,1,0.3,1)_240ms_both] font-display text-[clamp(40px,6.4vw,96px)] font-semibold leading-[1.02] tracking-[-0.05em]">
              Notes from <Pill className="px-[0.22em]">the mesh.</Pill>
            </h1>
          </div>
        </div>
      </section>

      <section className="px-5 pt-4 pb-[100px] sm:px-8 md:pt-6">
        <div className="mx-auto max-w-[1180px]">

          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] gap-x-8 gap-y-16">
            {POSTS.map((post, i) => (
              <PostCard key={post.title} post={post} lead={i === 0} />
            ))}
          </div>
        </div>
      </section>

      <Footer theme={theme} />
    </main>
  );
};
