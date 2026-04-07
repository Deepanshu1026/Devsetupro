import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
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
    fontSize: 'clamp(100px, 15vw, 190px)',
    lineHeight: 0.82, letterSpacing: '-0.03em',
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
          color: rgba(100,130,255,.15); z-index: 2; }

        /* image fill */
        .imgfill { width:100%; height:100%; object-fit:cover; object-position:top center; display:block; }

        /* leaf glyph */
        .leaf { color: #b4ff39; line-height:1; }

        /* Cross decoration */
        .deco-cross {
          position: absolute; color: rgba(255,255,255,0.05);
          font-size: 280px; font-weight: 100; pointer-events: none;
        }

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
        <div style={{
          position: 'relative', zIndex: 10,
          display: 'flex', flexDirection: 'column',
          minHeight: '100vh', paddingTop: 120,
        }}>

          {/* ── MAIN CONTENT AREA ── */}
          <div style={{ flex: 1, position: 'relative', padding: '0 40px' }}>

            {/* ─────── LEFT CARD ─────── */}
            <motion.div className="left-card"
              style={{
                position: 'absolute', left: 80, top: 240,
                width: 280, height: 280, borderRadius: 40, overflow: 'hidden',
                border: '6px solid rgba(180, 255, 57, 0.6)',
                boxShadow: '0 30px 80px rgba(0,0,40,0.5)',
                x: c1x, y: c1y, zIndex: 8,
              }}
              initial={{ opacity: 0, scale: 0.8, x: -100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ position: 'absolute', inset: 0, background: '#b4ff39', zIndex: 0 }} />
              <img src={IMG_LEFT} alt="" className="imgfill" style={{ position: 'relative', zIndex: 1 }} />

              {/* Badge on card */}
              <div style={{
                position: 'absolute', top: 20, left: 20, zIndex: 5,
                width: 50, height: 50, borderRadius: '50%', background: '#1535f0',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
              }}>
                <Briefcase size={24} />
              </div>
            </motion.div>

            {/* ─────── RIGHT CARD ─────── */}
            <motion.div className="right-card"
              style={{
                position: 'absolute', right: 100, top: 40,
                width: 200, height: 240, borderRadius: 32, overflow: 'hidden',
                border: '4px solid rgba(255,255,255,0.2)',
                boxShadow: '0 30px 80px rgba(0,0,40,0.5)',
                x: c2x, y: c2y, zIndex: 8,
              }}
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.1)', zIndex: 0 }} />
              <img src={IMG_RIGHT} alt="" className="imgfill" style={{ position: 'relative', zIndex: 1, opacity: 0.9 }} />

              {/* Portfolio Pill */}
              <div style={{
                position: 'absolute', bottom: 40, right: -40, zIndex: 10,
                background: 'white', padding: '10px 25px', borderRadius: 40,
                color: '#1535f0', fontWeight: 700, fontSize: 13, boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
              }}>
                Portfolio
              </div>
            </motion.div>

            {/* ─────── HEADLINE BLOCK ─────── */}
            <div style={{
              marginTop: 40,
              display: 'flex', flexDirection: 'column', alignItems: 'center'
            }}>

              {/* ROW 1: BUILD + 500+ */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 30, transform: 'translateX(-120px)' }}>
                <span className="leaf" style={{ fontSize: 50 }}>❧</span>
                <motion.span custom={0} variants={wv} initial="hidden" animate="visible" style={HS}>
                  BUILD
                </motion.span>

                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring' }}
                  style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                  <div style={{
                    width: 60, height: 60, borderRadius: '50%', background: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1535f0'
                  }}>
                    <Briefcase size={28} />
                  </div>
                  <div style={{
                    background: '#b4ff39', padding: '12px 30px', borderRadius: 60,
                    display: 'flex', alignItems: 'center', gap: 15, boxShadow: '0 10px 40px rgba(180,255,57,0.4)'
                  }}>
                    <span style={{ fontSize: 24, fontWeight: 900, color: '#1535f0' }}>500+</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#1535f0', opacity: 0.8 }}>Companies</span>
                    <RotateCcw size={16} />
                  </div>
                </motion.div>
              </div>

              {/* ROW 2: SMARTER */}
              <motion.div
                custom={1} variants={wv} initial="hidden" animate="visible"
                style={{ ...HS, fontSize: 'clamp(140px, 22vw, 260px)', marginTop: -30, marginBottom: -30 }}>
                SMARTER
              </motion.div>

              {/* ROW 3: GLOBAL CLIENT + BUSINESS */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 25, transform: 'translateX(100px)' }}>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
                  <div style={{ display: 'flex' }}>
                    {[AV1, AV2].map((a, i) => (
                      <img key={i} src={a} style={{
                        width: 45, height: 45, borderRadius: '50%', border: '3px solid #1535f0',
                        marginLeft: i > 0 ? -15 : 0
                      }} />
                    ))}
                    <div style={{
                      width: 45, height: 45, borderRadius: '50%', border: '2px dashed white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white'
                    }}><Plus size={16} /></div>
                  </div>
                  <div style={{
                    background: '#b4ff39', padding: '8px 20px', borderRadius: 40,
                    fontSize: 12, fontWeight: 800, color: '#1535f0'
                  }}>Global Client</div>
                </motion.div>

                <motion.span custom={2} variants={wv} initial="hidden" animate="visible" style={HS}>
                  BUSINESS
                </motion.span>
                <span className="leaf" style={{ fontSize: 50 }}>❧</span>
              </div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                style={{
                  maxWidth: 550, textAlign: 'center', color: 'white', marginTop: 40,
                  fontSize: 16, lineHeight: 1.6, opacity: 0.8, fontWeight: 500
                }}>
                We help brands scale faster with data-driven marketing, modern design,
                and powerful digital solutions tailored to your goals.
              </motion.p>

              {/* CTA Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 45 }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    padding: '18px 45px', borderRadius: 60, background: '#b4ff39',
                    border: 'none', color: '#1535f0', fontWeight: 900,
                    fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 12,
                    boxShadow: '0 20px 50px rgba(180,255,57,0.4)'
                  }}>
                  <Play size={18} fill="currentColor" />
                  Start Project
                </motion.button>
                <button style={{
                  padding: '18px 45px', borderRadius: 60, background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 700,
                  fontSize: 16, cursor: 'pointer'
                }}>Get Consultation</button>
              </div>

              {/* Eye Badge floating link */}
              <FloatBadge delay={1.2} style={{ position: 'absolute', bottom: 100, right: 300 }}>
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