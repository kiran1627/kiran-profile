'use client';

import dynamic from 'next/dynamic';
import Navbar from '../src/components/Navbar';
import About from '../src/components/About';
import Footer from '../src/components/Footer';
import BackToTop from '../src/components/BackToTop';
import Projects from '../src/components/Projects';
import Skills from '../src/components/Skills';
import Contact from '../src/components/Contact';
import Blog from '../src/components/Blog';

// Lazy load heavy components (Three.js, GSAP, video)
const SceneEnvironment = dynamic(
  () => import('../src/components/three/SceneEnvironment'),
  { ssr: false }
);

const VideoHero = dynamic(
  () => import('../src/components/cinematic/VideoHero'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="app-container">
      {/* Cinematic Video Hero — fullscreen intro */}
      <VideoHero />

      {/* 3D Background Layer */}
      <SceneEnvironment />

      {/* UI Layer */}
      <Navbar />
      <main>
        <About />
        <Projects />
        <Skills />
        <Blog />
        <Contact />
      </main>
      <Footer />

      {/* Floating UI */}
      <BackToTop />
    </div>
  );
}




