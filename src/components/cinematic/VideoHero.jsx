'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import CinematicLayer from './CinematicLayer';
import styles from './VideoHero.module.css';

const VIDEO_SRC = '/hero.mp4';

// Inline SVGs for media controls
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const VolumeOnIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
  </svg>
);

const VolumeOffIcon = () => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
  </svg>
);

export default function VideoHero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true); // Must start muted for successful direct autoplay!

  const fgVideoRef = useRef(null);
  const bgVideoRef = useRef(null);
  const heroRef = useRef(null);
  const fadeWrapperRef = useRef(null);
  
  const contentPanelRef = useRef(null);
  const textReveal1 = useRef(null);
  const textReveal2 = useRef(null);
  const taglineRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const scrollRef = useRef(null);

  // ─── Play Direct Experience on Mount with Auto-Unmute ───
  useEffect(() => {
    // 1. Try unmuted autoplay first (succeeds if browser has already unlocked audio context)
    if (fgVideoRef.current) {
      fgVideoRef.current.muted = false;
      fgVideoRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // Fall back to muted autoplay to prevent browser blocking the video playback
          if (fgVideoRef.current) {
            fgVideoRef.current.muted = true;
            fgVideoRef.current.play()
              .then(() => {
                setIsPlaying(true);
                setIsMuted(true);
              })
              .catch((err) => {
                console.log("Muted autoplay started:", err);
              });
          }
        });
    }
    if (bgVideoRef.current) {
      bgVideoRef.current.play().catch(() => {});
    }

    // 2. Global event listener to automatically unmute on first user interaction
    const handleFirstInteraction = () => {
      if (fgVideoRef.current && fgVideoRef.current.muted) {
        fgVideoRef.current.muted = false;
        setIsMuted(false);
      }
      // Remove all listeners immediately after first unlock
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('mousedown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { passive: true });
    window.addEventListener('touchstart', handleFirstInteraction, { passive: true });
    window.addEventListener('mousedown', handleFirstInteraction, { passive: true });
    window.addEventListener('keydown', handleFirstInteraction, { passive: true });

    // 3. Choreograph GSAP Entrance Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power4.out' }
      });

      // Fade wrapper elements in smoothly
      tl.to(fadeWrapperRef.current, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.inOut',
      });

      // Floating glassmorphism content panel slides in
      tl.fromTo(
        contentPanelRef.current,
        { opacity: 0, x: -60, scale: 0.98 },
        { opacity: 1, x: 0, scale: 1, duration: 1.2 },
        '-=0.4'
      );

      // Tagline reveals
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.7'
      );

      // Name text reveals with dramatic mask slide up
      tl.fromTo(
        [textReveal1.current, textReveal2.current],
        { opacity: 0, y: 55, filter: 'blur(8px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.1, stagger: 0.12 },
        '-=0.6'
      );

      // Description paragraph fades in
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      );

      // CTA Buttons slide upward
      tl.fromTo(
        ctaRef.current?.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        '-=0.5'
      );

      // Scroll indicator fades in
      tl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.2'
      );

    }, heroRef.current);

    return () => {
      ctx.revert();
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('mousedown', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  // ─── Sync BG Ambient Video with FG Video ──────────
  useEffect(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;

    const syncTime = () => {
      if (Math.abs(fg.currentTime - bg.currentTime) > 0.15) {
        bg.currentTime = fg.currentTime;
      }
    };

    fg.addEventListener('seeked', syncTime);
    fg.addEventListener('playing', syncTime);

    return () => {
      fg.removeEventListener('seeked', syncTime);
      fg.removeEventListener('playing', syncTime);
    };
  }, []);

  // ─── Play / Pause ─────────────────────────────────
  const togglePlay = useCallback(() => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg) return;

    if (fg.paused) {
      fg.play();
      bg?.play();
      setIsPlaying(true);
    } else {
      fg.pause();
      bg?.pause();
      setIsPlaying(false);
    }
  }, []);

  // ─── Mute / Unmute ────────────────────────────────
  const toggleMute = useCallback(() => {
    const fg = fgVideoRef.current;
    if (!fg) return;

    fg.muted = !fg.muted;
    setIsMuted(fg.muted);
  }, []);

  // ─── Video Ended Handler (Stop & Scroll Down) ─────
  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false);
    // Stop the video on last frame
    if (fgVideoRef.current) {
      fgVideoRef.current.pause();
    }
    // Automatically smooth-scroll to the next section (#about)
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // ─── Smooth Scroll triggers ───────────────────────
  const scrollToId = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ─── Cinematic Full-Screen Video Hero ───────── */}
      <section
        ref={heroRef}
        className={styles.heroSection}
        id="video-hero"
        aria-label="Cinematic Fullscreen Video Hero"
      >
        <div 
          ref={fadeWrapperRef} 
          className={styles.heroFadeWrapper}
          style={{ opacity: 0 }}
        >
          {/* Ambient Blurred Background Video (Add depth and saturation glow) */}
          <div className={styles.ambientBlurWrapper}>
            <video
              ref={bgVideoRef}
              className={styles.ambientVideo}
              src={VIDEO_SRC}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
            />
          </div>

          {/* Immersive Full-Screen Primary Video */}
          <div className={styles.fullscreenVideoWrapper}>
            <video
              ref={fgVideoRef}
              className={styles.fullscreenVideo}
              src={VIDEO_SRC}
              autoPlay
              playsInline
              muted={isMuted}
              preload="auto"
              onEnded={handleVideoEnded}
            />
          </div>

          {/* Tap to Unmute Badge */}
          {isMuted && (
            <button
              className={styles.tapToUnmute}
              onClick={toggleMute}
              aria-label="Tap for sound"
            >
              <div className={styles.unmutePulseDot} />
              <span>TAP FOR SOUND</span>
            </button>
          )}

          {/* Dark Semi-transparent & Cinematic Gradient Overlays */}
          <div className={styles.overlayStack}>
            <div className={styles.darkGradientBase} />
            <div className={styles.overlayLeft} />
            <div className={styles.overlayBottom} />
            <div className={styles.overlayVignette} />
          </div>

          {/* 3D Cinematic Floating Particles */}
          <CinematicLayer />

          {/* Floating Left-Aligned Glassmorphism Panel */}
          <div className={styles.overlayContainer}>
            <div ref={contentPanelRef} className={styles.glassPanel}>
              
              <div ref={taglineRef} className={styles.tagline}>
                AI ENGINEER &amp; FULL STACK DEVELOPER
              </div>

              <h1 className={styles.nameHeader}>
                <div className={styles.nameRow}>
                  <span ref={textReveal1} className={styles.revealText}>KIRAN BABU</span>
                </div>
                <div className={styles.nameRow}>
                  <span ref={textReveal2} className={styles.revealText}>BANDELA</span>
                </div>
              </h1>

              <p ref={descRef} className={styles.description}>
                Building intelligent systems, scalable applications, and AI-powered digital experiences.
              </p>

              <div ref={ctaRef} className={styles.actionsBox}>
                <button onClick={() => scrollToId('projects')} className={styles.btnPrimary}>
                  Explore Work
                </button>
                <a href="/Kiran_Resume.pdf" className={styles.btnSecondary} target="_blank" rel="noreferrer">
                  Download Resume
                </a>
                <button onClick={() => scrollToId('contact')} className={styles.btnGlass}>
                  Contact Me
                </button>
              </div>

            </div>
          </div>

          {/* Floating Media Player HUD Controls in Bottom Right Corner */}
          <div className={styles.hudOverlay}>
            <div className={styles.hudHeader}>
              <span className={styles.hudBadge}>IMMERSIVE FEED</span>
              <span className={styles.hudDot} />
            </div>

            <div className={styles.hudControls}>
              <button
                className={styles.hudBtn}
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause Feed' : 'Play Feed'}
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              <button
                className={styles.hudBtn}
                onClick={toggleMute}
                aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeOffIcon /> : <VolumeOnIcon />}
              </button>
            </div>
          </div>

        </div>

        {/* Scroll Down Indicator */}
        <div
          ref={scrollRef}
          className={styles.scrollIndicator}
          onClick={() => scrollToId('about')}
          role="button"
          tabIndex={0}
          aria-label="Scroll to explore"
          onKeyDown={(e) => e.key === 'Enter' && scrollToId('about')}
        >
          <div className={styles.scrollLine}>
            <div className={styles.scrollLinePulse} />
          </div>
          <span className={styles.scrollLabel}>SCROLL TO EXPLORE</span>
        </div>
      </section>
    </>
  );
}
