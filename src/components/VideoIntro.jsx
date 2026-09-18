'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import CinematicLayer from './CinematicLayer';
import styles from './VideoIntro.module.css';

const VIDEO_SRC = '/hero.mp4';

const scrollToNext = (targetId) => {
  document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
};

const VideoIntro = ({
  tagline = 'AI/ML ENGINEER',
  firstName = 'KIRAN BABU',
  lastName = 'BANDELA',
  subtitle = 'I build intelligent software systems using modern AI, backend engineering, retrieval systems, and tool-integrated workflows.',
  nextSectionId = 'about',
}) => {
  const fgVideoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const rootRef = useRef(null);
  const contentRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoReady, setVideoReady] = useState(false);
  const [showSoundHint, setShowSoundHint] = useState(false);

  useEffect(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg) return;

    const handleCanPlay = () => setVideoReady(true);
    fg.addEventListener('canplay', handleCanPlay);

    const playPromise = fg.play();
    if (playPromise?.catch) playPromise.catch(() => {});
    if (bg) {
      const bgPlay = bg.play();
      if (bgPlay?.catch) bgPlay.catch(() => {});
    }

    return () => fg.removeEventListener('canplay', handleCanPlay);
  }, []);

  useEffect(() => {
    if (!videoReady) return undefined;

    const hintTimer = setTimeout(() => setShowSoundHint(true), 900);
    const hideTimer = setTimeout(() => setShowSoundHint(false), 5500);
    return () => {
      clearTimeout(hintTimer);
      clearTimeout(hideTimer);
    };
  }, [videoReady]);

  useEffect(() => {
    if (!videoReady || !contentRef.current) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.set(contentRef.current, { opacity: 1 });

      tl.fromTo(
        `.${styles.taglineInner}`,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }
      )
        .fromTo(
          `.${styles.nameLineInner}`,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.12 },
          '-=0.35'
        )
        .fromTo(
          `.${styles.subtitleInner}`,
          { y: 24, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        );
    }, rootRef);

    return () => ctx.revert();
  }, [videoReady]);

  const togglePlay = () => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg) return;

    if (isPlaying) {
      fg.pause();
      bg?.pause();
    } else {
      fg.play().catch(() => {});
      bg?.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const fg = fgVideoRef.current;
    if (!fg) return;
    fg.muted = !fg.muted;
    setIsMuted(fg.muted);
    setShowSoundHint(false);
  };

  return (
    <section id="hero" ref={rootRef} className={styles.hero}>
      <div className={styles.bgLayer}>
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src={VIDEO_SRC}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>

      <div className={`${styles.videoLayer} ${videoReady ? styles.videoReady : ''}`}>
        <video
          ref={fgVideoRef}
          className={styles.fgVideo}
          src={VIDEO_SRC}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
          aria-label="Kiran Babu Bandela cinematic introduction"
        />
      </div>

      <div className={styles.overlay} />

      <CinematicLayer className={styles.particleLayer} />

      <div ref={contentRef} className={`${styles.content} ${videoReady ? styles.contentReady : ''}`}>
        <p className={styles.tagline}>
          <span className={styles.taglineInner}>{tagline}</span>
        </p>

        <h1 className={styles.nameStack}>
          <span className={styles.nameLine}>
            <span className={styles.nameLineInner}>{firstName}</span>
          </span>
          <span className={styles.nameLine}>
            <span className={styles.nameLineInner}>{lastName}</span>
          </span>
        </h1>

        <p className={styles.subtitle}>
          <span className={styles.subtitleInner}>{subtitle}</span>
        </p>
      </div>

      <div className={`${styles.soundHint} ${showSoundHint ? styles.soundHintVisible : ''}`}>
        <span className={styles.soundHintDot} />
        <span>Tap for sound</span>
      </div>

      <div className={`${styles.controls} ${videoReady ? styles.controlsReady : ''}`}>
        <button
          type="button"
          className={styles.glassBtn}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </button>
        <button
          type="button"
          className={styles.glassBtn}
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      <button
        type="button"
        className={`${styles.scrollIndicator} ${videoReady ? styles.scrollReady : ''}`}
        onClick={() => scrollToNext(nextSectionId)}
        aria-label="Scroll to explore"
      >
        <span className={styles.scrollLine} />
        <span>Scroll</span>
      </button>
    </section>
  );
};

export default VideoIntro;
