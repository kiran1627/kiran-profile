'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;
function ensureRegistered() {
  if (!registered && typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

/**
 * Shared GSAP ScrollTrigger reveal hook.
 * Applies a fade + slide-up + stagger reveal to every direct child
 * matching `selector` inside the returned ref's element.
 *
 * Usage:
 *   const sectionRef = useScrollReveal({ selector: '.reveal-item', stagger: 0.12 });
 *   <section ref={sectionRef}>...</section>
 */
export default function useScrollReveal({
  selector = '[data-reveal]',
  y = 40,
  duration = 1,
  stagger = 0.1,
  ease = 'power3.out',
  start = 'top 80%',
  once = true,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    ensureRegistered();
    const root = ref.current;
    if (!root) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = root.querySelectorAll(selector);
    if (!targets.length) return;

    if (reduceMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: root,
        start,
        once,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selector, y, duration, stagger, ease, start, once]);

  return ref;
}
