import React, { useState, useRef, Suspense } from 'react';

import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import {
  ArrowRight, RotateCcw,
  Briefcase, Plus, TrendingUp, Eye, Star, Play
} from 'lucide-react';


/* ═══════════════════════════════════════════════
   IMAGES
 ═══════════════════════════════════════════════ */
const IMG_LEFT = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&fit=crop&crop=face';
const IMG_RIGHT = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&fit=crop&crop=face';
const AV1 = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&q=80&fit=crop&crop=face';
const AV2 = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&q=80&fit=crop&crop=face';



/* ═══════════════════════════════════════════════
   FLOAT BADGE
 ═══════════════════════════════════════════════ */
function FloatBadge({ children, delay = 0, style }) {
  return (
    <motion.div style={style}
      initial={{ opacity: 0, scale: 0.4, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, type: 'spring', stiffness: 230, damping: 18 }}>
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: delay * 0.4 }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   SPARKLE
 ═══════════════════════════════════════════════ */
function Sparkle({ size = 14, delay = 0, style }) {
  return (
    <motion.div style={{ position: 'absolute', pointerEvents: 'none', zIndex: 4, ...style }}
      animate={{ opacity: [0.25, 1, 0.25], scale: [1, 1.5, 1], rotate: [0, 25, 0] }}
      transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay }}>
      <Star size={size} fill="white" color="white" strokeWidth={0} />
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   DECORATIVE DASHED LINES
 ═══════════════════════════════════════════════ */
const DecoLines = () => (
  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }} viewBox="0 0 1440 900" fill="none">
    <motion.path
      d="M270 700C270 790 350 850 450 850"
      stroke="#ffffff"
      strokeWidth="2"
      strokeDasharray="6 6"
      opacity="0.2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    />
    <motion.path
      d="M1300 100C1300 200 1200 220 1100 220C1000 220 950 400 1100 650"
      stroke="#ffffff"
      strokeWidth="2"
      strokeDasharray="6 6"
      opacity="0.2"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, delay: 0.8 }}
    />
    <circle cx="450" cy="850" r="4" fill="#b4ff39" opacity="0.6" />
    <circle cx="1100" cy="650" r="4" fill="#b4ff39" opacity="0.6" />
  </svg>
);



/* ═══════════════════════════════════════════════
   HEADLINE WORD
 ═══════════════════════════════════════════════ */
const wv = {
  hidden: { opacity: 0, y: 80, skewY: 6 },
  visible: (i) => ({
    opacity: 1, y: 0, skewY: 0,
    transition: { delay: 0.1 + i * 0.13, duration: 0.82, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ═══════════════════════════════════════════════
   MAIN EXPORT
 ═══════════════════════════════════════════════ */
export default function SalfordHero() {
  const containerRef = useRef(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 20 });
  const sy = useSpring(my, { stiffness: 45, damping: 20 });
  const c1x = useTransform(sx, [-600, 600], [-18, 18]);
  const c1y = useTransform(sy, [-600, 600], [-12, 12]);
  const c2x = useTransform(sx, [-600, 600], [14, -14]);
  const c2y = useTransform(sy, [-600, 600], [9, -9]);

  const onMove = (e) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left - r.width / 2);
    my.set(e.clientY - r.top - r.height / 2);
  };

  const HS = {   // headline style
    fontFamily: "'Barlow Condensed', Impact, 'Arial Black', sans-serif",
    fontWeight: 900, color: 'white',
    fontSize: 'clamp(60px, 8.5vw, 120px)',
    lineHeight: 0.82, letterSpacing: '-0.03em',
    textTransform: 'uppercase', display: 'inline-block',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        .bd { position: absolute; font-weight: 900; line-height: 1;
          user-select: none; pointer-events: none;
          color: rgba(100,130,255,.15); z-index: 2; }

        .imgfill { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }
        .leaf { color: #b4ff39; line-height:1; }

        .deco-cross {
          position: absolute; color: rgba(255,255,255,0.05);
          font-size: 280px; font-weight: 100; pointer-events: none;
        }

        /* --- RESPONSIVE CSS --- */
        .headline-row { display: flex; align-items: center; width: 100%; justify-content: center; }
        .row-1 { transform: translateX(-80px); }
        .row-3 { transform: translateX(80px); }
        .side-card { z-index: 8; box-shadow: 0 30px 80px rgba(0,0,40,0.5); pointer-events: none; }
        .left-card { position: absolute; left: 6vw; top: 30vh; width: 20vw; max-width: 280px; aspect-ratio: 1; borderRadius: 40px; border: 6px solid rgba(180, 255, 57, 0.6); }
        .right-card { position: absolute; right: 8vw; top: 8vh; width: 15vw; max-width: 200px; height: 240px; borderRadius: 32px; border: 4px solid rgba(255,255,255,0.2); }
        .badge-eye { position: absolute; bottom: 10vh; right: 15vw; }

        @media (max-width: 1400px) {
          .row-1 { transform: translateX(-40px); }
          .row-3 { transform: translateX(40px); }
          .badge-eye { right: 8vw; }
        }

        @media (max-width: 1024px) {
          .row-1, .row-3 { transform: translateX(0); }
          .left-card, .right-card { top: 15vh; opacity: 0.4; }
          .badge-eye { display: none; }
        }

        @media (max-width: 768px) {
           .side-card { display: none; }
           .headline-row { flex-direction: column; gap: 15px !important; text-align: center; transform: none !important; }
           .cta-row { flex-direction: column; gap: 15px !important; width: 100%; }
           .cta-row button { width: 100% !important; padding: 18px 20px !important; }
           .hero-body { padding-top: 80px !important; padding-bottom: 60px !important; }
        }

        @media (max-width: 480px) {
           .headline-text { font-size: 16vw !important; }
           .row-2 { font-size: 20vw !important; }
           .headline-row { gap: 5px !important; }
        }
      `}</style>

      {/* ══ WRAPPER ══ */}
      <div id="home" ref={containerRef} onMouseMove={onMove}
        style={{
          minHeight: '100vh', background: '#1535f0',
          fontFamily: "'Barlow Condensed', Impact, sans-serif",
          overflow: 'hidden', position: 'relative',
        }}>






        {/* ── Subtle radial glow centre ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 52% 48%, rgba(80,100,255,.22) 0%, transparent 70%)',
        }} />

        {/* ── Deco Backgrounds ── */}
        <DecoLines />
        <div className="deco-cross" style={{ top: '-50px', right: '-80px', transform: 'rotate(15deg)' }}>+</div>
        <div className="deco-cross" style={{ bottom: '-120px', left: '-100px', transform: 'rotate(-10deg)' }}>×</div>

        {/* ── Sparkles ── */}
        <Sparkle size={13} style={{ top: 88, left: '31%' }} delay={0} />
        <Sparkle size={10} style={{ bottom: 120, left: 110 }} delay={1.1} />
        <Sparkle size={18} style={{ top: 220, right: '12%' }} delay={1.7} />



        {/* ══ HERO BODY ══ */}
        <div className="hero-body" style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column',
          minHeight: '100vh', paddingTop: 90,
        }}>

          {/* ── MAIN CONTENT AREA ── */}
          <div style={{ flex: 1, position: 'relative', padding: '0 40px' }}>

            {/* ─────── LEFT CARD ─────── */}
            <motion.div className="side-card left-card"
              style={{ x: c1x, y: c1y }}
              initial={{ opacity: 0, scale: 0.8, x: -100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ position: 'absolute', inset: 0, background: '#b4ff39', zIndex: 0 }} />
              <img src={IMG_LEFT} alt="" className="imgfill" style={{ position: 'relative', zIndex: 1 }} />

              {/* Badge on card */}
              <div style={{
                position: 'absolute', top: '10%', left: '10%', zIndex: 5,
                width: 50, height: 50, borderRadius: '50%', background: '#1535f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
              }}>
                <Briefcase size={24} />
              </div>
            </motion.div>

            {/* ─────── RIGHT CARD ─────── */}
            <motion.div className="side-card right-card"
              style={{ x: c2x, y: c2y }}
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.1)', zIndex: 0 }} />
              <img src={IMG_RIGHT} alt="" className="imgfill" style={{ position: 'relative', zIndex: 1, opacity: 0.9 }} />

              {/* Portfolio Pill */}
              <div style={{
                position: 'absolute', bottom: 40, right: -20, zIndex: 10,
                background: 'white', padding: '10px 25px', borderRadius: 40,
                color: '#1535f0', fontWeight: 700, fontSize: 13, boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}>
                Portfolio
              </div>
            </motion.div>

            {/* ─────── HEADLINE BLOCK ─────── */}
            <div style={{
              marginTop: 40,
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              gap: '15px'
            }}>

              {/* ROW 1: BUILD + 500+ */}
              <div className="headline-row row-1" style={{ gap: 20 }}>
                <span className="leaf" style={{ fontSize: 36, display: 'none' }}>❧</span>
                <motion.span 
                  className="headline-text"
                  custom={0} variants={wv} initial="hidden" animate="visible" style={HS}>
                  BUILD
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', background: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1535f0'
                  }}>
                    <Briefcase size={14} />
                  </div>
                  <div style={{
                    background: '#b4ff39', padding: '6px 16px', borderRadius: 60,
                    display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 30px rgba(180,255,57,0.4)'
                  }}>
                    <span style={{ fontSize: 13, fontWeight: 900, color: '#1535f0' }}>500+</span>
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#1535f0', opacity: 0.8 }}>Companies</span>
                    <RotateCcw size={10} />
                  </div>
                </motion.div>
              </div>

              {/* ROW 2: SMARTER */}
              <motion.div
                className="row-2"
                custom={1} variants={wv} initial="hidden" animate="visible"
                style={{ ...HS, fontSize: 'clamp(80px, 12vw, 160px)', lineHeight: 0.85 }}>
                SMARTER
              </motion.div>

              {/* ROW 3: GLOBAL CLIENT + BUSINESS */}
              <div className="headline-row row-3" style={{ gap: 20 }}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ display: 'flex' }}>
                    {[AV1, AV2].map((a, i) => (
                      <img key={i} src={a} style={{
                        width: 36, height: 36, borderRadius: '50%', border: '2.5px solid #1535f0',
                        marginLeft: i > 0 ? -12 : 0
                      }} />
                    ))}
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', border: '2px dashed white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                    }}><Plus size={14} /></div>
                  </div>
                  <div style={{
                    background: '#b4ff39', padding: '6px 18px', borderRadius: 40,
                    fontSize: 10, fontWeight: 800, color: '#1535f0'
                  }}>Global Client</div>
                </motion.div>

                <motion.span custom={2} variants={wv} initial="hidden" animate="visible" style={HS}>
                  BUSINESS
                </motion.span>
                <span className="leaf" style={{ fontSize: 36 }}>❧</span>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{
                  maxWidth: 550, textAlign: 'center', color: 'white', marginTop: 40,
                  fontSize: 16, lineHeight: 1.6, opacity: 0.8, fontWeight: 500,
                  padding: '0 20px'
                }}>
                We help brands scale faster with data-driven marketing, modern design,
                and powerful digital solutions tailored to your goals.
              </motion.p>

              {/* CTA Row */}
              <div className="cta-row" style={{ display: 'flex', alignItems: 'center', gap: 30, marginTop: 60, padding: '0 20px' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '18px 45px', borderRadius: 60, background: '#b4ff39',
                    border: 'none', color: '#1535f0', fontWeight: 900,
                    fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                    boxShadow: '0 20px 50px rgba(180,255,57,0.4)',
                    whiteSpace: 'nowrap'
                  }}>
                  <Play size={18} fill="currentColor" />
                  Start Project
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '18px 45px', borderRadius: 60, background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 700,
                    fontSize: 16, cursor: 'pointer', whiteSpace: 'nowrap'
                  }}>
                  Get Consultation
                </motion.button>
              </div>

              {/* Eye Badge floating link */}
              <FloatBadge delay={1.2} className="badge-eye" style={{ zIndex: 20 }}>
                <div style={{
                  width: 55, height: 55, borderRadius: '50%', background: '#b4ff39',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1535f0',
                  border: '4px solid #1535f0', boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
                }}>
                  <Eye size={24} strokeWidth={3} />
                </div>
              </FloatBadge>


            </div>
          </div>
        </div>

      </div>
    </>
  );
}