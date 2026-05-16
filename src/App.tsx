/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './pages/Hero';
import About from './pages/About';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

/**
 * Main App component.
 * Assembles all sections into a single-page modern landing page for EME Móveis.
 */
export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Sticky Navigation */}
      <Navbar />

      <main className="flex-grow">
        {/* Each section has an ID that matches Navbar links */}
        <Hero />
        <About />
        <Portfolio />
        <Contact />
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}

