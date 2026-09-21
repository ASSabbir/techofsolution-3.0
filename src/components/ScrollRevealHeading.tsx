'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface ScrollRevealHeadingProps {
  /** Full heading text/sentence. */
  text: string;
  /** Words (case/punctuation-insensitive) that should sweep in as the accent color instead of the base color. */
  highlightWords?: string[];
  /** Tailwind classes for the outer wrapper. */
  className?: string;
  /** Tailwind classes for the <h1>/<p> itself — control size, weight, line-height here. */
  textClassName?: string;
  /** Rendered tag — 'h1' by default, use 'p' for body-sized reveal text. */
  as?: 'h1' | 'h2' | 'p';
  /** Base (unrevealed) text color. Defaults to a dim zinc so chars visibly sweep to full color. */
  baseColor?: string;
  /** Fully-revealed text color. */
  revealColor?: string;
  /** Accent color applied only to highlightWords. */
  accentColor?: string;
}

export default function ScrollRevealHeading({
  text,
  highlightWords = [],
  className = '',
  textClassName = 'text-4xl   lg:text-6xl font-medium leading-[1.15]',
  as = 'h1',
  baseColor = '#52525b', // zinc-600
  revealColor = '#fafafs', // zinc-50
  accentColor = '#21707F', // blue-400
}: ScrollRevealHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const Tag = as;

  useGSAP(
    () => {
      if (!headingRef.current) return;

      const normalizedHighlights = highlightWords.map((w) =>
        w.toLowerCase().replace(/[^\w]/g, '')
      );

      // Split into lines -> words -> chars. We do this in JS (not CSS) because
      // GSAP needs individual char/line nodes to animate independently.
      const split = new SplitType(headingRef.current, {
        types: 'lines,words,chars',
        tagName: 'span',
      });

      // Wrap every line in an overflow-hidden mask so the line can slide up
      // from underneath it — this is the "awwards" reveal, not just a fade.
      split.lines?.forEach((line) => {
        const mask = document.createElement('span');
        mask.style.display = 'block';
        mask.style.overflow = 'hidden';
        line.parentNode?.insertBefore(mask, line);
        mask.appendChild(line);
        gsap.set(line, { display: 'inline-block', willChange: 'transform, filter' });
      });

      gsap.set(split.chars, { color: baseColor });

      // Collect chars belonging to highlighted words so we can color them separately.
      const highlightChars: Element[] = [];
      split.words?.forEach((word) => {
        const key = (word.textContent || '').toLowerCase().replace(/[^\w]/g, '');
        if (normalizedHighlights.includes(key)) {
          word.querySelectorAll('.char').forEach((c) => highlightChars.push(c));
        }
      });
      const highlightSet = new Set(highlightChars);
      const plainChars = (split.chars || []).filter((c) => !highlightSet.has(c));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 88%',
          end: 'bottom 78%',
          scrub: 1,
          
        },
      });

      // 1) Lines rise out of their masks with a soft blur-focus settle.
      tl.from(
        split.lines,
        {
          yPercent: 115,
          filter: 'blur(18px)',
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out',
        },
        0
      );

      // 2) Regular chars sweep from dim -> full color, slightly behind the line reveal.
      tl.to(
        plainChars,
        {
          color: revealColor,
          duration: 0.5,
          stagger: 0.022,
          ease: 'none',
        },
        0.18
      );

      // 3) Highlighted words sweep to the accent color on the same timing.
      if (highlightChars.length) {
        tl.to(
          highlightChars,
          {
            color: accentColor,
            duration: 0.5,
            stagger: 0.022,
            ease: 'none',
          },
          0.18
        );
      }

      return () => {
        split.revert();
      };
    },
    { scope: containerRef, dependencies: [text, highlightWords.join('|')] }
  );

  return (
    <div ref={containerRef} className={className}>
      <Tag ref={headingRef as never} className='text-3xl  md:text-5xl lg:text-6xl  py-  text-wrap font-medium leading-[1.25]'>
        {text}
      </Tag>
    </div>
  );
}