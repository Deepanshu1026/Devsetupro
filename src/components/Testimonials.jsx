import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, ArrowRight } from 'lucide-react';

const REVIEWS = [
  {
    name: "Alex Thorne",
    role: "Director @ FutureCorp",
    text: "Devsetupro engineered a strategic advantage we didn't think was possible in our industry.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
  },
  {
    name: "Elena Rossi",
    role: "CEO @ NovaSystems",
    text: "Precision and architectural excellence defined every step of our engagement.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena"
  },
  {
    name: "Marcus Cole",
    role: "Head of Growth @ Zenith",
    text: "The intelligence systems implemented here scaled our revenue by 40% in just two quarters.",
    img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus"
  }
];

const Testimonials = () => {
  return (
    <section id="testimonials" style={{ background: '#fff', padding: '80px 0', color: '#1535f0', overflow: 'hidden', position: 'relative' }}>
      <div className="max-w-1440 mx-auto px-6 md:px-10">

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '60px' }}>
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.75rem', color: '#050A1A', marginBottom: '12px' }}
          >
            Global Voices
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 900, fontFamily: 'var(--font-display)', textTransform: 'uppercase', lineHeight: 0.9 }}
          >
            Verified <br /><span style={{ color: '#b4ff39', WebkitTextStroke: '1.5px #1535f0' }}>Dominance</span>
          </motion.h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {REVIEWS.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              style={{
                background: '#fcfcfc',
                padding: '32px',
                borderRadius: '32px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '340px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.02)',
                border: '1px solid rgba(0,0,0,0.02)'
              }}
            >
              <div style={{ position: 'absolute', top: '24px', right: '24px', opacity: 0.08 }}>
                <Quote size={48} fill="#1535f0" />
              </div>

              <div>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '20px' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#1535f0" color="#1535f0" />)}
                </div>
                <p style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', color: '#050A1A', fontWeight: 600, lineHeight: 1.5, marginBottom: '32px' }}>
                  "{review.text}"
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  background: '#1535f0',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: '2.5px solid #fff'
                }}>
                  <img src={review.img} alt={review.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#1535f0', display: 'block', lineHeight: 1.2 }}>{review.name}</h4>
                  <p style={{ fontSize: '0.75rem', color: 'rgba(21, 53, 240, 0.6)', fontWeight: 600 }}>{review.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Link for connectivity */}
        <div style={{ marginTop: '60px', textAlign: 'center' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{
              background: '#1535f0',
              color: '#fff',
              padding: '16px 40px',
              borderRadius: '100px',
              fontWeight: 800,
              fontSize: '0.85rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 15px 30px rgba(21, 53, 240, 0.15)'
            }}
          >
            Success Stories <ArrowRight size={18} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
