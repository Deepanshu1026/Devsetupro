import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, MoveUpRight } from 'lucide-react';

const GetInTouch = () => {
  return (
    <section id="contact" style={{ background: '#050A1A', color: '#fff', padding: '120px 0', position: 'relative' }}>
      <style>{`
        .contact-wrapper {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: start;
        }
        .contact-input {
          width: 100%;
          padding: 18px 24px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 16px;
          color: #fff;
          font-size: 1rem;
          font-family: var(--font-family);
          transition: all 0.3s ease;
          outline: none;
        }
        .contact-input::placeholder {
          color: rgba(255,255,255,0.3);
        }
        .contact-input:focus {
          border-color: #b4ff39;
          background: rgba(255,255,255,0.05);
          box-shadow: 0 0 20px rgba(180, 255, 57, 0.1);
        }
        .contact-select-wrapper {
          position: relative;
        }
        .contact-select-wrapper::after {
          content: '▼';
          position: absolute;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          color: #b4ff39;
          pointer-events: none;
          font-size: 0.8rem;
        }
        @media (max-width: 900px) {
          .contact-wrapper {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .contact-form-row {
            flex-direction: column;
            gap: 24px;
          }
          .contact-form-box {
            padding: 30px 20px !important;
          }
        }
      `}</style>
      
      <div className="max-w-1440 mx-auto px-6 md:px-10">
        <div className="contact-wrapper">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span style={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.8rem', color: '#b4ff39', display: 'block', marginBottom: '16px' }}>
              Initiate Contact
            </span>
            <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)', fontWeight: 900, fontFamily: 'var(--font-display)', lineHeight: 0.9, textTransform: 'uppercase', marginBottom: '40px' }}>
              Let's Build  <br/> The <span style={{ color: '#b4ff39' }}>Future</span>
            </h2>
            
            <p style={{ opacity: 0.7, fontSize: '1.1rem', marginBottom: '48px', maxWidth: '400px', lineHeight: 1.6 }}>
              Whether you need to scale operations, build robust systems, or redefine your digital presence, we're ready to engineer the solution.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(21, 53, 240, 0.4)', border: '1px solid rgba(21, 53, 240, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b4ff39' }}>
                   <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '4px' }}>Global Comms</h4>
                  <a href="mailto:hello@devsetupro.com" style={{ color: '#fff', textDecoration: 'none', fontSize: '1.25rem', fontWeight: 700 }}>hello@devsetupro.com</a>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(21, 53, 240, 0.4)', border: '1px solid rgba(21, 53, 240, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b4ff39' }}>
                   <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.5, marginBottom: '4px' }}>Headquarters</h4>
                  <p style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>London, United Kingdom</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            className="contact-form-box"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              background: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '32px',
              padding: '60px',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              backdropFilter: 'blur(20px)'
            }}
          >
            <form style={{ display: 'flex', flexDirection: 'column', gap: '28px' }} onSubmit={(e) => e.preventDefault()}>
              <div className="contact-form-row" style={{ display: 'flex', gap: '24px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b4ff39', marginBottom: '12px' }}>Your Name</label>
                  <input type="text" className="contact-input" placeholder="John Doe" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b4ff39', marginBottom: '12px' }}>Email Address</label>
                  <input type="email" className="contact-input" placeholder="john@company.com" />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b4ff39', marginBottom: '12px' }}>Subject</label>
                <div className="contact-select-wrapper">
                  <select className="contact-input" style={{ cursor: 'pointer', appearance: 'none', background: 'rgba(255,255,255,0.03)' }}>
                     <option value="" style={{ background: '#050A1A', color: '#fff' }}>Select subject...</option>
                     <option value="1" style={{ background: '#050A1A', color: '#fff' }}>New Project</option>
                     <option value="2" style={{ background: '#050A1A', color: '#fff' }}>Consulting</option>
                     <option value="3" style={{ background: '#050A1A', color: '#fff' }}>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b4ff39', marginBottom: '12px' }}>Message</label>
                <textarea className="contact-input" rows="5" placeholder="Tell us about your objectives..." style={{ resize: 'none' }}></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: '#1535f0',
                  color: '#fff',
                  padding: '20px 32px',
                  borderRadius: '16px',
                  border: 'none',
                  fontSize: '1.1rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '12px',
                  marginTop: '16px',
                  transition: 'background 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#0d28cc'}
                onMouseOut={(e) => e.currentTarget.style.background = '#1535f0'}
              >
                Send Transmission <MoveUpRight size={20} />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
