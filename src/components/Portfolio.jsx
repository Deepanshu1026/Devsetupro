import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const ITEMS = [
  {
    title: "Eco-System 2026",
    tag: "High-Freq Operations",
    img: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200",
    id: "01"
  },
  {
    title: "Global Resilience",
    tag: "Market Intelligence",
    img: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=1200",
    id: "02"
  },
  {
    title: "Retail Dominance",
    tag: "Commerce Architecture",
    img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
    id: "03"
  }
];

const Portfolio = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });

  // Map the horizontal scroll to finish closer to the section end to avoid trailing empty space
  const x = useTransform(scrollYProgress, [0, 0.9], ["0%", "-68%"]);

  return (
    <section
      id="portfolio"
      ref={targetRef}
      style={{
        background: '#050A1A',
        height: '120vh', // Reduced from 400vh to avoid large empty scroll space
        position: 'relative',
        marginBottom: '-1px'
      }}
    >
      <style>{`
        .portfolio-pin-layer {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .scroller-tile {
          min-width: 70vw; /* Reduced from 85vw to feel less "huge" */
          height: 60vh;   /* Reduced from 70vh to prevent screen takeover */
          margin: 0 30px;
        }
        .archive-bg-text {
          font-size: 12vw;
          top: 15%;
          left: 5%;
        }
        @media (max-width: 1024px) {
          .scroller-tile {
            min-width: 85vw;
          }
        }
        @media (max-width: 768px) {
          #portfolio {
            height: auto !important;
            padding: 60px 20px !important;
          }
          .portfolio-pin-layer {
            position: relative !important;
            height: auto !important;
            flex-direction: column !important;
            padding: 0 !important;
          }
          .scroller-content {
            flex-direction: column !important;
            transform: none !important;
            padding: 0 !important;
            gap: 30px !important;
          }
          .scroller-tile {
            min-width: 100% !important;
            height: 350px !important;
            margin: 0 !important;
          }
          .heading-tile {
             min-width: 100% !important;
             height: auto !important;
             padding: 0 0 40px 0 !important;
             text-align: center;
          }
          .heading-tile h2 {
             font-size: 50px !important;
          }
          .archive-bg-text {
             display: none !important;
          }
        }
      `}</style>

      <div className="portfolio-pin-layer">

        <motion.div className="scroller-content" style={{ x, display: 'flex', gap: '10px', padding: '0 5%' }}>

          {/* Header Tile */}
          <div className="heading-tile" style={{
            minWidth: '400px',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 10,
            paddingRight: '40px'
          }}>
            <span className="archive-bg-text" style={{
              fontWeight: 900,
              lineHeight: 1,
              color: 'rgba(255,255,255,0.03)',
              fontFamily: 'var(--font-display)',
              position: 'absolute',
              zIndex: 0,
              pointerEvents: 'none',
              textTransform: 'uppercase'
            }}>
              ARCHIVE
            </span>
            <div style={{ position: 'relative', zIndex: 10 }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-lime)', textTransform: 'uppercase', letterSpacing: '0.2em', display: 'block', marginBottom: '16px' }}>
                02 — Portfolio
              </span>
              <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#fff', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: '24px' }}>
                Selected <br /> Proofs
              </h2>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '1.5px', background: 'rgba(255,255,255,0.2)' }} />
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', fontWeight: 500 }}>
                  Dominating Markets since 2018
                </p>
              </div>
            </div>
          </div>

          {/* Project Tiles */}
          {ITEMS.map((item, idx) => (
            <motion.div
              key={idx}
              className="scroller-tile"
              style={{
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '32px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.06)'
              }}
            >
              <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />

              <div className="tile-content" style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(5, 10, 26, 0.95) 0%, transparent 60%)',
                padding: '40px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start'
              }}>
                <span style={{ fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--accent-lime)', marginBottom: '10px', letterSpacing: '0.1em' }}>
                  CASE STUDY — {item.id}
                </span>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '20px' }}>
                  <div>
                    <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.8rem)', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#fff', textTransform: 'uppercase', lineHeight: 1, marginBottom: '8px' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '1rem' }}>{item.tag}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, background: '#fff', color: '#000' }}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      border: '1.5px solid #fff',
                      color: '#fff',
                      background: 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <ArrowUpRight size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}

        </motion.div>
      </div>

      {/* Connection Layer - Cleaned up to avoid the "empty" look */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '80px' }} />
    </section>
  );
};

export default Portfolio;
