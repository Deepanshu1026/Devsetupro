import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Mail, Link, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: '#1535f0', color: '#fff', padding: '120px 0 60px', position: 'relative', overflow: 'hidden' }}>

      <style>{`
        @media (max-width: 768px) {
          .footer-watermark { font-size: 50vw !important; top: 10% !important; }
          .footer-headline { font-size: 18vw !important; }
          .footer-cta { padding: 18px 40px !important; width: 100% !important; }
          .footer-links-grid { gap: 40px !important; text-align: center; justify-items: center !important; }
          .footer-bottom { flex-direction: column !important; align-items: center !important; text-align: center !important; }
        }
      `}</style>

      {/* Decorative branding watermark */}
      <div className="footer-watermark" style={{ position: 'absolute', top: '0', left: '50%', transform: 'translateX(-50%)', fontSize: '25vw', fontWeight: 1000, color: 'rgba(255,255,255,0.03)', whiteSpace: 'nowrap', userSelect: 'none', zIndex: 0 }}>
        DEVSETUPRO
      </div>

      <div className="max-w-1440 mx-auto px-6 md:px-10 relative" style={{ zIndex: 10 }}>

        {/* Call to Action Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '120px' }}>
          <motion.h2
            className="footer-headline"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: 'clamp(3rem, 12vw, 8rem)', fontWeight: 1000, fontFamily: 'var(--font-display)', lineHeight: 0.85, textTransform: 'uppercase' }}
          >
            Start <br /><span style={{ color: '#b4ff39' }}>Engagement</span>
          </motion.h2>
          <motion.button
            className="footer-cta"
            whileHover={{ scale: 1.05 }}
            style={{
              background: '#fff',
              color: '#1535f0',
              padding: '24px 60px',
              borderRadius: '100px',
              fontWeight: 900,
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px',
              marginTop: '48px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 40px 100px rgba(0,0,0,0.1)'
            }}
          >
            Initialize Now <ArrowRight size={28} />
          </motion.button>
        </div>

        {/* Links Grid */}
        <div className="footer-links-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '60px', paddingTop: '80px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: '#b4ff39', marginBottom: '20px' }}>
              DEVSETUPRO
            </h3>
            <p style={{ maxWidth: '350px', fontSize: '1rem', opacity: 0.7, lineHeight: 1.6, marginBottom: '32px' }}>
              We architect the world's most resilient digital systems, engineered for scale and dominance.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {[Globe, Mail, Link].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.2, color: '#b4ff39' }}
                  style={{ color: '#fff' }}
                >
                  <Icon size={24} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', color: '#b4ff39', marginBottom: '24px' }}>Capabilities</h4>
            {["Intelligence Strategy", "Dynamic Engineering", "Growth Architecture", "DevOps Dominance"].map((l, i) => (
              <a key={i} href="#" style={{ display: 'block', color: 'rgba(255,255,255,1)', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>{l}</a>
            ))}
          </div>

          <div>
            <h4 style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', color: '#b4ff39', marginBottom: '24px' }}>Engagement</h4>
            {["Success Stories", "The Methodology", "Research Labs", "Institutional Access"].map((l, i) => (
              <a key={i} href="#" style={{ display: 'block', color: 'rgba(255,255,255,1)', textDecoration: 'none', fontSize: '1rem', fontWeight: 600, marginBottom: '12px' }}>{l}</a>
            ))}
          </div>
        </div>

        <div className="footer-bottom" style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '24px' }}>
          <p style={{ opacity: 0.5, fontSize: '0.8rem' }}>© 2026 DEVSETUPRO | ESTABLISHED IN UK</p>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: '#fff', opacity: 0.5, textDecoration: 'none', fontSize: '0.8rem' }}>Privacy Policy</a>
            <a href="#" style={{ color: '#fff', opacity: 0.5, textDecoration: 'none', fontSize: '0.8rem' }}>Institutional Access</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
