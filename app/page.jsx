'use client';

import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import About from '../src/components/About';
import Skills from '../src/components/Skills';
import Achievements from '../src/components/Achievements';
import Projects from '../src/components/Projects';
import Contact from '../src/components/Contact';
import Footer from '../src/components/Footer';
import BackToTop from '../src/components/BackToTop';
import BackgroundIcons from '../src/components/BackgroundIcons';

export default function Home() {
  return (
    <div className="app-container">
      <BackgroundIcons count={60} />
      <div className="bg-glow"></div>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Achievements />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
