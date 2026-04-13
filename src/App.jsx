import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import GetInTouch from './components/GetInTouch';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="App" style={{ overflowX: 'hidden' }}>
      <ParticleBackground />
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      <main style={{ background: '#050A1A' }}>
        <Hero />
        <Services />
        <Portfolio />
        <Testimonials />
      </main>
      <Footer />
      <GetInTouch isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}

export default App;
