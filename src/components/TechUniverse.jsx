'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  SiPython,
  SiFastapi,
  SiLangchain,
  SiPytorch,
  SiNextdotjs,
  SiReact,
  SiDocker,
  SiOpenai,
} from 'react-icons/si';
import styles from './TechUniverse.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const INNER_ORBIT = [
  { Icon: SiPython, label: 'Python' },
  { Icon: SiFastapi, label: 'FastAPI' },
  { Icon: SiLangchain, label: 'LangChain' },
  { Icon: SiPytorch, label: 'PyTorch' },
];

const OUTER_ORBIT = [
  { Icon: SiNextdotjs, label: 'Next.js' },
  { Icon: SiReact, label: 'React' },
  { Icon: SiDocker, label: 'Docker' },
  { Icon: SiOpenai, label: 'LLMs' },
];

const OrbitRing = ({ items, radius, duration, reverse, sizeClass }) => (
  <div
    className={`${styles.orbit} ${reverse ? styles.orbitReverse : ''}`}
    style={{ '--radius': `${radius}px`, '--duration': `${duration}s` }}
  >
    {items.map(({ Icon, label }, i) => {
      const angle = (360 / items.length) * i;
      return (
        <div
          key={label}
          className={styles.orbitItem}
          style={{ '--angle': `${angle}deg` }}
        >
          <div className={`${styles.orbitIconInner} ${reverse ? styles.orbitIconInnerReverse : ''} ${sizeClass}`}>
            <span className={styles.orbitIconChip} title={label}>
              <Icon size={22} />
            </span>
          </div>
        </div>
      );
    })}
  </div>
);

const TechUniverse = () => {
  const sectionRef = useRef(null);
  const nameRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        nameRef.current,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        `.${styles.centerFigure}`,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        `.${styles.orbit}`,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          stagger: 0.15,
          delay: 0.35,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="tech-universe" ref={sectionRef} className={styles.universe}>
      <div className={styles.bgGlow} />

      <span ref={nameRef} className={styles.bigName} aria-hidden="true">
        KIRAN
      </span>

      <div className={styles.stage}>
        <div className={styles.energyRing} />
        <div className={styles.energyRingSecondary} />

        <OrbitRing items={INNER_ORBIT} radius={148} duration={22} sizeClass={styles.iconSmall} />
        <OrbitRing items={OUTER_ORBIT} radius={220} duration={34} reverse sizeClass={styles.iconLarge} />

        <div className={styles.centerFigure}>
          <img src="/avatar-still.jpg" alt="" className={styles.centerImage} />
          <div className={styles.centerVignette} />
        </div>
      </div>

      <div className={styles.captionBlock}>
        <p className={styles.eyebrow}>THE ENGINEERING UNIVERSE</p>
        <p className={styles.caption}>
          A stack built for production AI &mdash; agents, retrieval, and interfaces working as one system.
        </p>
      </div>
    </section>
  );
};

export default TechUniverse;
