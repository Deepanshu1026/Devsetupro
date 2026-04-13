import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Search } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
];

export default function Navbar({ onOpenContact }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('Home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Barlow:wght@400;500;600;700;800&display=swap');

        .salford-nav *,
        .salford-nav *::before,
        .salford-nav *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .salford-nav {
          position: fixed; top: 0; left: 0; width: 100%; z-index: 1000;
          font-family: 'Barlow', sans-serif;
          transition: background 0.35s ease, box-shadow 0.35s ease, padding 0.35s ease;
        }

        .salford-nav.scrolled {
          background: rgba(21, 53, 240, 0.82);
          backdrop-filter: blur(14px) saturate(1.4);
          -webkit-backdrop-filter: blur(14px) saturate(1.4);
          box-shadow: 0 4px 32px rgba(0,0,20,0.28);
        }

        .salford-nav.top {
          background: transparent;
        }

        .nav-inner {
          max-width: 1440px; margin: 0 auto;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 40px;
          transition: height 0.35s ease;
        }

        .nav-logo {
          color: #b4ff39; font-weight: 900; font-size: 17px;
          letter-spacing: .06em; font-family: 'Barlow', sans-serif;
          text-decoration: none; white-space: nowrap;
          text-transform: uppercase;
        }
        .nav-logo span { color: white; margin-right: 2px; }

        /* Desktop links pill */
        .nav-links-pill {
          display: flex; align-items: center; gap: 36px;
          background: rgba(255,255,255,.1);
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 50px;
          padding: 10px 28px;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
        }

        .nav-link {
          color: white; text-decoration: none; font-size: 14px;
          font-weight: 500; letter-spacing: .02em; opacity: .85;
          cursor: pointer; background: none; border: none;
          transition: opacity .18s;
          position: relative; padding-bottom: 2px;
        }
        .nav-link:hover { opacity: 1; }
        .nav-link.active { opacity: 1; }

        /* active underline */
        .nav-link-underline {
          position: absolute; bottom: -2px; left: 0; right: 0;
          height: 2px; background: #b4ff39; border-radius: 2px;
        }

        /* Search button */
        .nav-search {
          width: 38px; height: 38px; border-radius: 50%;
          background: #b4ff39; border: none;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: #1535f0; flex-shrink: 0;
          transition: transform .18s, background .18s;
        }
        .nav-search:hover { transform: scale(1.1); background: #c9ff45; }

        /* CTA button */
        .nav-cta {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 22px; border-radius: 50px;
          border: 1.5px solid rgba(255,255,255,.65);
          background: transparent; color: white;
          font-size: 13px; font-family: 'Barlow', sans-serif;
          font-weight: 600; cursor: pointer; letter-spacing: .03em;
          white-space: nowrap;
          transition: background .2s, border-color .2s, transform .18s;
        }
        .nav-cta:hover {
          background: rgba(255,255,255,.12);
          border-color: rgba(255,255,255,.9);
          transform: scale(1.04);
        }

        /* Hamburger */
        .nav-hamburger {
          display: none; background: none; border: none;
          color: white; cursor: pointer; padding: 4px;
          border-radius: 8px; transition: background .18s;
        }
        .nav-hamburger:hover { background: rgba(255,255,255,.12); }

        /* Mobile menu overlay */
        .mobile-overlay {
          position: fixed; inset: 0; z-index: 999;
          background: #1535f0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 0;
        }

        .mobile-link {
          color: white; text-decoration: none;
          font-size: clamp(32px, 8vw, 52px);
          font-family: 'Barlow Condensed', 'Impact', sans-serif;
          font-weight: 900; text-transform: uppercase;
          letter-spacing: -.01em; line-height: 1.1;
          opacity: .9; cursor: pointer; background: none; border: none;
          transition: color .18s, opacity .18s;
          padding: 8px 0;
        }
        .mobile-link:hover { color: #b4ff39; opacity: 1; }

        .mobile-divider {
          width: 40px; height: 2px; background: rgba(255,255,255,.15);
          border-radius: 2px; margin: 4px 0;
        }

        .mobile-cta {
          margin-top: 36px;
          display: flex; align-items: center; gap: 10px;
          padding: 14px 36px; border-radius: 50px;
          background: #b4ff39; border: none; color: #111;
          font-size: 16px; font-family: 'Barlow', sans-serif;
          font-weight: 800; cursor: pointer; letter-spacing: .03em;
          transition: background .18s, transform .18s;
        }
        .mobile-cta:hover { background: #c9ff45; transform: scale(1.04); }

        /* Mobile close */
        .mobile-close {
          position: absolute; top: 22px; right: 36px;
          background: rgba(255,255,255,.1); border: none;
          color: white; cursor: pointer; border-radius: 50%;
          width: 40px; height: 40px;
          display: flex; align-items: center; justify-content: center;
          transition: background .18s;
        }
        .mobile-close:hover { background: rgba(255,255,255,.2); }

        /* sparkle deco in mobile menu */
        .mobile-deco {
          position: absolute; color: rgba(180,255,57,.25);
          font-size: 80px; font-weight: 900; line-height: 1;
          user-select: none; pointer-events: none;
        }

        @media (max-width: 768px) {
          .nav-links-pill { display: none; }
          .nav-cta        { display: none; }
          .nav-hamburger  { display: flex; }
          .nav-inner      { padding: 0 20px; }
        }
      `}</style>

      {/* ── Nav bar ── */}
      <nav className={`salford-nav ${scrolled ? 'scrolled' : 'top'}`}>
        <motion.div
          className="nav-inner"
          animate={{ height: scrolled ? 64 : 76 }}
          transition={{ duration: .35, ease: 'easeOut' }}
        >
          {/* Logo */}
          <motion.a
            href="#"
            className="nav-logo"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .55, ease: 'easeOut' }}
          >
            DEVSETUPRO
          </motion.a>

          {/* Desktop links */}
          <motion.div
            className="nav-links-pill"
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .55, delay: .1, ease: 'easeOut' }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`nav-link ${active === link.label ? 'active' : ''}`}
                onClick={() => setActive(link.label)}
              >
                {link.label}
                {active === link.label && (
                  <motion.span
                    className="nav-link-underline"
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </motion.div>

          {/* Right controls */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: 10 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: .55, delay: .15, ease: 'easeOut' }}
          >
            <button className="nav-search" aria-label="Search">
              <Search size={16} strokeWidth={2.5} />
            </button>
            <button className="nav-cta" onClick={onOpenContact}>
              Get in Touch <ArrowRight size={15} strokeWidth={2.5} />
            </button>
            {/* Hamburger — visible on mobile */}
            <button
              className="nav-hamburger"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>
          </motion.div>
        </motion.div>
      </nav>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: .38, ease: [.22, 1, .36, 1] }}
          >
            {/* deco corners */}
            <span className="mobile-deco" style={{ top: 10, right: 10 }}>↗</span>
            <span className="mobile-deco" style={{ bottom: 20, left: 10 }}>↙</span>

            {/* Close button */}
            <motion.button
              className="mobile-close"
              onClick={() => setIsOpen(false)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: .9 }}
            >
              <X size={22} />
            </motion.button>

            {/* Links */}
            {NAV_LINKS.map((link, i) => (
              <React.Fragment key={link.label}>
                <motion.a
                  href={link.href}
                  className="mobile-link"
                  onClick={() => { setActive(link.label); setIsOpen(false); }}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: .06 + i * .07, duration: .45, ease: [.22, 1, .36, 1] }}
                >
                  {link.label}
                </motion.a>
                {i < NAV_LINKS.length - 1 && <div className="mobile-divider" />}
              </React.Fragment>
            ))}

            {/* CTA */}
            <motion.button
              className="mobile-cta"
              onClick={() => { setIsOpen(false); onOpenContact && onOpenContact(); }}
              initial={{ opacity: 0, scale: .85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: .28, type: 'spring', stiffness: 200, damping: 18 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: .96 }}
            >
              Get in Touch <ArrowRight size={18} strokeWidth={2.5} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}