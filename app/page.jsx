'use client';

import Navbar from '../src/components/Navbar';
import Hero from '../src/components/Hero';
import About from '../src/components/About';
import Services from '../src/components/Services';
import Blog from '../src/components/Blog';
import Skills from '../src/components/Skills';
import Achievements from '../src/components/Achievements';
import Projects from '../src/components/Projects';
import Contact from '../src/components/Contact';
import Footer from '../src/components/Footer';
import BackToTop from '../src/components/BackToTop';

export default function Home() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Blog />
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
