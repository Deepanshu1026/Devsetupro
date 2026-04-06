import React from 'react';
import { motion } from 'framer-motion';

const Stats = () => {
  const stats = [
    { label: 'Revenue Generated', value: '$450M+' },
    { label: 'Success Rate', value: '98%' },
    { label: 'Years Experience', value: '12+' },
    { label: 'Active Clients', value: '250+' }
  ];

  return (
    <div style={{ background: 'var(--bg-secondary)', padding: '50px 5%', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{ textAlign: 'center' }}
          >
            <h3 className="text-gradient" style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '8px' }}>{stat.value}</h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '0.85rem' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Stats;
