'use client';

import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import About from '../src/components/About';
import Timeline from '../src/components/Timeline';
import Footer from '../src/components/Footer';
import BackToTop from '../src/components/BackToTop';
import Projects from '../src/components/Projects';
import Skills from '../src/components/Skills';
import Education from '../src/components/Education';
import Contact from '../src/components/Contact';
import Blog from '../src/components/Blog';

export default function Home() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Timeline />
        <Projects />
        <Skills />
        <Education />
        <Blog />
        <Contact />
      </main>
      <Footer />

      <BackToTop />
    </div>
  );
}
