import React, { useState, useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from 'framer-motion';
import {
  Search, Menu, X, ArrowRight, RotateCcw,
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
   STAR FIELD  (Three.js)
═══════════════════════════════════════════════ */
function StarField() {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
  useFrame((_, dt) => {
    ref.current.rotation.x -= dt / 14;
    ref.current.rotation.y -= dt / 18;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ffffff" size={0.0032}
          sizeAttenuation depthWrite={false} opacity={0.5} />
      </Points>
    </group>
  );
}

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
   NAVBAR
═══════════════════════════════════════════════ */
const NAV_LINKS = ['Home', 'Services', 'Portfolio', 'Testimonials'];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* ── Desktop / Scrolled nav ── */}


      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: .35, ease: [.22, 1, .36, 1] }}
            style={{
              position: 'fixed', inset: 0, zIndex: 1100,
              background: '#1535f0', display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
            <button onClick={() => setOpen(false)}
              style={{
                position: 'absolute', top: 20, right: 24,
                background: 'rgba(255,255,255,.1)', border: 'none',
                color: 'white', cursor: 'pointer', borderRadius: '50%',
                width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
              <X size={22} />
            </button>
            {NAV_LINKS.map((link, i) => (
              <motion.button key={link} onClick={() => { setActive(link); setOpen(false); }}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .05 + i * .07, ease: [.22, 1, .36, 1], duration: .45 }}
                style={{
                  background: 'none', border: 'none', color: 'white', cursor: 'pointer',
                  fontSize: 48, fontFamily: "'Barlow Condensed', Impact, sans-serif",
                  fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-.01em',
                  opacity: .9, lineHeight: 1.1,
                }}>
                {link}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: .28, type: 'spring' }}
              style={{
                marginTop: 32, padding: '14px 36px', borderRadius: 50,
                background: '#b4ff39', border: 'none', color: '#111',
                fontSize: 16, fontFamily: "'Barlow', sans-serif", fontWeight: 800,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10,
              }}>
              Get in Touch <ArrowRight size={18} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`.s-hamburger { display: none !important; } @media(max-width:768px){ .s-hamburger { display: flex !important; } }`}</style>
    </>
  );
}

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
    fontSize: 'clamp(80px, 12.5vw, 160px)',
    lineHeight: 0.88, letterSpacing: '-0.02em',
    textTransform: 'uppercase', display: 'inline-block',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body { overflow-x: hidden; }

        /* bg deco arrows */
        .bd { position: absolute; font-weight: 900; line-height: 1;
          user-select: none; pointer-events: none;
          color: rgba(100,130,255,.22); z-index: 2; }

        /* image fill */
        .imgfill { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }

        /* leaf glyph */
        .leaf { color: #b4ff39; line-height:1; }

        /* Description left-aligned under left content */
        @media (max-width:900px) {
          .hero-content { padding-left: 12px !important; padding-right: 12px !important; }
          .left-card { left: 10px !important; width: 120px !important; }
          .right-card { right: 10px !important; width: 130px !important; }
        }
      `}</style>

      {/* ══ WRAPPER ══ */}
      <div id="home" ref={containerRef} onMouseMove={onMove}
        style={{
          minHeight: '100vh', background: '#1535f0',
          fontFamily: "'Barlow Condensed', Impact, sans-serif",
          overflow: 'hidden', position: 'relative',
        }}>

        {/* ── Three.js background ── */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <Canvas camera={{ position: [0, 0, 1] }}>
            <Suspense fallback={null}><StarField /></Suspense>
          </Canvas>
        </div>

        {/* ── Subtle radial glow centre ── */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 70% 60% at 52% 48%, rgba(80,100,255,.18) 0%, transparent 70%)',
        }} />

        {/* ── BG deco arrows ── */}
        <span className="bd" style={{ top: 14, right: 22, fontSize: 38, opacity: .32, transform: 'rotate(-8deg)' }}>↗</span>
        <span className="bd" style={{ top: 14, right: 62, fontSize: 26, opacity: .2 }}>↗</span>
        <span className="bd" style={{ bottom: 28, right: 22, fontSize: 34, opacity: .28, transform: 'rotate(10deg)' }}>←</span>
        <span className="bd" style={{ bottom: 58, right: 60, fontSize: 22, opacity: .18 }}>←</span>

        {/* ── Sparkles ── */}
        <Sparkle size={13} style={{ top: 88, left: '31%' }} delay={0} />
        <Sparkle size={10} style={{ bottom: 64, left: 76 }} delay={1.1} />
        <Sparkle size={12} style={{ top: 200, right: '36%' }} delay={1.7} />
        <Sparkle size={8} style={{ top: 320, left: '22%' }} delay={0.6} />

        {/* ══ NAVBAR ══ */}
        <Navbar />

        {/* ══ HERO BODY ══ */}
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column',
          minHeight: '100vh', paddingTop: 76,
        }}>

          {/* ── MAIN CONTENT AREA ── */}
          <div style={{ flex: 1, position: 'relative', padding: '30px 36px 0' }}>

            {/* ─────── LEFT CARD ─────── */}
            <motion.div className="left-card"
              style={{
                position: 'absolute', left: 36, top: 40,
                width: 168, height: 250, borderRadius: 24, overflow: 'hidden',
                border: '3px solid rgba(255,255,255,.18)',
                boxShadow: '0 20px 60px rgba(0,0,30,.4), 0 0 0 1px rgba(255,255,255,.08)',
                background: '#28c820',
                x: c1x, y: c1y, zIndex: 8,
              }}
              initial={{ opacity: 0, x: -60, rotate: -4 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: .2, duration: .9, ease: [.22, 1, .36, 1] }}>
              {/* green radial bg */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 110%, #42e038 0%, #28c820 55%, #1aa015 100%)',
              }} />
              <img src={IMG_LEFT} alt="Marketing professional" className="imgfill"
                style={{ position: 'relative', zIndex: 2, opacity: .92 }} />
            </motion.div>

            {/* Lightbulb badge on left card */}
            <FloatBadge delay={0.6} style={{
              position: 'absolute', left: 22, top: 265, zIndex: 20,
              width: 36, height: 36, borderRadius: '50%',
              background: '#b4ff39', border: '2.5px solid #1535f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#1535f0',
              boxShadow: '0 4px 16px rgba(180,255,57,.4)',
            }}>
              {/* bulb svg */}
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18h6M10 22h4M12 2a7 7 0 0 1 7 7c0 2.5-1.3 4.7-3.3 6H8.3C6.3 13.7 5 11.5 5 9a7 7 0 0 1 7-7z" />
              </svg>
            </FloatBadge>

            {/* ─────── RIGHT CARD ─────── */}
            <motion.div className="right-card"
              style={{
                position: 'absolute', right: 36, top: 20,
                width: 178, height: 210, borderRadius: 24, overflow: 'hidden',
                border: '3px solid rgba(255,255,255,.22)',
                boxShadow: '0 20px 60px rgba(0,0,30,.4), 0 0 0 1px rgba(255,255,255,.08)',
                background: '#2244cc',
                x: c2x, y: c2y, zIndex: 8,
              }}
              initial={{ opacity: 0, x: 60, rotate: 4 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ delay: .2, duration: .9, ease: [.22, 1, .36, 1] }}>
              <div style={{
                position: 'absolute', inset: 0,
                background: 'radial-gradient(ellipse at 50% 110%, #3a60f0 0%, #2244cc 55%, #1530a8 100%)',
              }} />
              <img src={IMG_RIGHT} alt="Marketing specialist" className="imgfill"
                style={{ position: 'relative', zIndex: 2, filter: 'saturate(.9)' }} />
            </motion.div>

            {/* Portfolio badge */}
            <FloatBadge delay={0.55} style={{
              position: 'absolute', right: 32, top: 8, zIndex: 22,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: '50%',
                background: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,.2)',
              }}>
                <TrendingUp size={16} color="#1535f0" strokeWidth={2.5} />
              </div>
              <div style={{
                background: 'white', borderRadius: 50,
                padding: '7px 18px', fontSize: 13, fontWeight: 700,
                color: '#1535f0', fontFamily: "'Barlow',sans-serif",
                boxShadow: '0 4px 14px rgba(0,0,0,.2)',
              }}>
                Portfolio
              </div>
            </FloatBadge>

            {/* Eye badge bottom-right */}
            <FloatBadge delay={0.75} style={{
              position: 'absolute', right: 72, bottom: 130, zIndex: 20,
              width: 42, height: 42, borderRadius: '50%',
              background: '#b4ff39', border: '3px solid #1535f0',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1535f0',
              boxShadow: '0 4px 20px rgba(180,255,57,.4)',
            }}>
              <Eye size={18} strokeWidth={2.5} />
            </FloatBadge>

            {/* Arrow beside eye badge */}
            <motion.span
              animate={{ x: [-5, 5, -5] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', right: 122, bottom: 144, zIndex: 5,
                color: 'rgba(180,210,255,.5)', fontSize: 26, fontWeight: 900,
              }}>←</motion.span>

            {/* ─────── HEADLINE BLOCK ─────── */}
            <div style={{ paddingLeft: 222, paddingRight: 230 }}>

              {/* Row 1 — leaf BUILD badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 0 }}>

                {/* Leaf left */}
                <motion.span className="leaf"
                  initial={{ opacity: 0, x: -22 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: .18, duration: .5 }}
                  style={{ fontSize: 38, marginRight: -6 }}>❧</motion.span>

                <motion.span custom={0} variants={wv} initial="hidden" animate="visible" style={HS}>
                  BUILD
                </motion.span>

                {/* 500+ badge */}
                <motion.div
                  initial={{ opacity: 0, scale: .55 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: .44, type: 'spring', stiffness: 210, damping: 16 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                  {/* briefcase circle */}
                  <div style={{
                    width: 50, height: 50, borderRadius: '50%',
                    background: 'rgba(255,255,255,.12)', border: '2.5px solid #b4ff39',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b4ff39',
                    backdropFilter: 'blur(4px)',
                  }}>
                    <Briefcase size={22} strokeWidth={2.5} />
                  </div>
                  {/* pill */}
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    background: '#b4ff39', borderRadius: 50, padding: '10px 18px',
                    fontFamily: "'Barlow',sans-serif", whiteSpace: 'nowrap',
                    boxShadow: '0 6px 24px rgba(180,255,57,.35)',
                  }}>
                    <span style={{ fontSize: 20, fontWeight: 900, color: '#111' }}>500+</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#333', opacity: .85 }}>Companies</span>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: 28, height: 28, borderRadius: '50%', background: '#1535f0',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b4ff39',
                      }}>
                      <RotateCcw size={13} strokeWidth={2.5} />
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* Row 2 — SMARTER */}
              <motion.div custom={1} variants={wv} initial="hidden" animate="visible">
                <span style={HS}>SMARTER</span>
              </motion.div>

              {/* Row 3 — avatars Global Client BUSINESS leaf */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 0 }}>

                {/* Avatar + Global Client */}
                <motion.div
                  initial={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: .52, type: 'spring', stiffness: 185, damping: 16 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                  {/* stacked avatars */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {[AV1, AV2].map((src, i) => (
                      <div key={i} style={{
                        width: 34, height: 34, borderRadius: '50%',
                        border: '2.5px solid #1535f0',
                        marginLeft: i === 0 ? 0 : -11,
                        overflow: 'hidden', background: '#4466cc',
                        boxShadow: '0 2px 8px rgba(0,0,30,.3)',
                      }}>
                        <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ))}
                  </div>
                  {/* plus */}
                  <div style={{
                    width: 30, height: 30, borderRadius: '50%',
                    border: '2px solid rgba(255,255,255,.55)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
                  }}>
                    <Plus size={15} strokeWidth={2.5} />
                  </div>
                  {/* Global Client pill */}
                  <div style={{
                    background: '#b4ff39', borderRadius: 50,
                    padding: '8px 18px', fontSize: 14, fontWeight: 800,
                    color: '#111', fontFamily: "'Barlow',sans-serif",
                    whiteSpace: 'nowrap',
                    boxShadow: '0 6px 24px rgba(180,255,57,.35)',
                  }}>
                    Global Client
                  </div>
                </motion.div>

                <motion.span custom={2} variants={wv} initial="hidden" animate="visible" style={HS}>
                  BUSINESS
                </motion.span>

                {/* Leaf right */}
                <motion.span className="leaf"
                  initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: .4, duration: .5 }}
                  style={{ fontSize: 36, marginLeft: -4 }}>❧</motion.span>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: .72, duration: .55 }}
                style={{
                  marginTop: 28, color: 'white', fontSize: 14,
                  fontFamily: "'Barlow',sans-serif", fontWeight: 400,
                  lineHeight: 1.75, maxWidth: 340, opacity: .82,
                }}>
                We help brands scale faster with data-driven marketing, modern design,
                and powerful digital solutions tailored to your goals, helping you reach
                more customers and grow consistently.
              </motion.p>
            </div>
          </div>

          {/* ══ CTA ROW ══ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .88, duration: .5 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '28px 36px 48px', paddingLeft: 258,
              position: 'relative', zIndex: 10,
            }}>

            {/* play triangle */}
            <div style={{
              width: 0, height: 0,
              borderTop: '12px solid transparent',
              borderBottom: '12px solid transparent',
              borderLeft: '22px solid #b4ff39',
            }} />

            <motion.button
              whileHover={{ scale: 1.07, background: '#c9ff45' }}
              whileTap={{ scale: .95 }}
              style={{
                padding: '13px 30px', borderRadius: 50,
                background: '#b4ff39', border: 'none', color: '#111',
                fontSize: 15, fontFamily: "'Barlow',sans-serif", fontWeight: 800,
                cursor: 'pointer', letterSpacing: '.03em',
                display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: '0 8px 28px rgba(180,255,57,.4)',
              }}>
              <Play size={14} fill="#111" strokeWidth={0} />
              Start Project
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, background: 'rgba(255,255,255,.1)' }}
              whileTap={{ scale: .95 }}
              style={{
                padding: '13px 30px', borderRadius: 50,
                border: '1.5px solid rgba(255,255,255,.65)',
                background: 'transparent', color: 'white', fontSize: 15,
                fontFamily: "'Barlow',sans-serif", fontWeight: 600,
                cursor: 'pointer', letterSpacing: '.03em',
              }}>
              Get Consultation
            </motion.button>

            {/* animated star accent */}
            <motion.div
              animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
              style={{ marginLeft: 16, color: '#b4ff39', opacity: .7 }}>
              <Star size={20} fill="#b4ff39" strokeWidth={0} />
            </motion.div>
          </motion.div>
        </div>

      </div>
    </>
  );
}