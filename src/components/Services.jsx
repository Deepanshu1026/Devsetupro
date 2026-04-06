import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { BarChart3, Globe, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

const SERVICES = [
  {
    title: "Intelligence Architecture",
    tags: ["Data Modeling", "Systems Strategy"],
    desc: "We don't just build apps; we architect intelligence systems that drive global operations.",
    icon: <BarChart3 size={28} />
  },
  {
    title: "Brand Resonance",
    tags: ["Market Psychology", "Identity"],
    desc: "Rigorous brand engineering designed to resonate with high-value institutional audiences.",
    icon: <Globe size={28} />
  },
  {
    title: "Performance DevOps",
    tags: ["Scale", "Reliability", "24/7"],
    desc: "High-frequency infrastructure that maintains dominance in volatile market environments.",
    icon: <Zap size={28} />
  }
];

const Services = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.98, 1]);

  return (
    <section 
      id="services" 
      ref={targetRef}
      style={{ 
        background: '#b4ff39', 
        padding: '80px 0', 
        color: '#1535f0', 
        position: 'relative', 
        zIndex: 5,
        borderRadius: '60px 60px 0 0',
        marginTop: '-100px',
        minHeight: '80vh'
      }}
    >
      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 40px;
        }
        .service-card {
           min-height: auto !important;
        }
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .sticky-col {
            position: relative !important;
            top: 0 !important;
            margin-bottom: 24px;
          }
        }
        @media (max-width: 640px) {
          .service-card {
            padding: 30px 24px !important;
            text-align: center;
          }
          .icon-box {
            margin: 0 auto 16px !important;
          }
          .btn-box {
            justify-content: center !important;
          }
        }
      `}</style>

      <div className="max-w-1440 mx-auto px-6 md:px-10">
        <div className="services-grid">
          
          {/* Left Column */}
          <div className="sticky-col" style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
            <motion.div style={{ scale }}>
              <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.7rem', display: 'block', marginBottom: '12px' }}>
                 01 — Core Systems
              </span>
              <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 3.5rem)', fontWeight: 900, fontFamily: 'var(--font-display)', lineHeight: 0.9, textTransform: 'uppercase' }}>
                Engineering <br /> Advantage
              </h2>
              <div style={{ width: '40px', height: '3px', background: '#1535f0', marginTop: '20px' }} />
              <p style={{ marginTop: '24px', fontSize: '1rem', fontWeight: 500, lineHeight: 1.5, opacity: 0.8, maxWidth: '400px' }}>
                We provide the structural foundations for the world's most ambitious digital brands.
              </p>
              
              <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 {["Data-First Logic", "High-Fidelity Scale", "Global Resilience"].map((item, i) => (
                   <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.8rem' }}>
                      <CheckCircle2 size={14} /> {item}
                   </div>
                 ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
             {SERVICES.map((item, idx) => (
               <motion.div
                 key={idx}
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.5, delay: idx * 0.05 }}
                 viewport={{ once: true, margin: "-50px" }}
                 style={{ 
                   background: '#fff', 
                   padding: '32px 40px', 
                   borderRadius: '32px', 
                   display: 'grid', 
                   gridTemplateColumns: 'min-content 1fr',
                   gap: '30px',
                   boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                   border: '1px solid rgba(21, 53, 240, 0.05)'
                 }}
               >
                 <div className="icon-box" style={{ 
                   width: '56px', 
                   height: '56px', 
                   background: '#1535f0', 
                   color: '#b4ff39', 
                   borderRadius: '50%', 
                   display: 'flex', 
                   alignItems: 'center', 
                   justifyContent: 'center',
                   flexShrink: 0
                 }}>
                   {item.icon}
                 </div>
                 <div>
                   <div className="btn-box" style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                      {item.tags.map((tag, i) => (
                        <span key={i} style={{ fontSize: '0.55rem', fontWeight: 800, textTransform: 'uppercase', background: 'rgba(21, 53, 240, 0.05)', padding: '3px 8px', borderRadius: '100px' }}>
                           {tag}
                        </span>
                      ))}
                   </div>
                   <h3 style={{ fontSize: '1.6rem', fontWeight: 900, fontFamily: 'var(--font-display)', textTransform: 'uppercase', marginBottom: '12px', lineHeight: 1 }}>
                     {item.title}
                   </h3>
                   <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.7, marginBottom: '20px', maxWidth: '500px' }}>
                     {item.desc}
                   </p>
                   <div className="btn-box" style={{ display: 'flex' }}>
                    <button style={{ 
                      background: 'transparent', 
                      border: '1.2px solid #1535f0', 
                      color: '#1535f0', 
                      padding: '8px 16px', 
                      borderRadius: '100px', 
                      fontWeight: 800, 
                      fontSize: '0.7rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}>
                      Architecture <ArrowRight size={12} />
                    </button>
                   </div>
                 </div>
               </motion.div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
