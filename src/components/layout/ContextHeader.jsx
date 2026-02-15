import React from 'react';

const ContextHeader = ({ title, description }) => {
  return (
    <div style={{
      padding: 'var(--space-4) var(--space-4)',
      borderBottom: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-background)'
    }}>
      <h1 style={{
        margin: '0 0 var(--space-1) 0',
        fontSize: '32px',
        color: 'var(--color-text-primary)'
      }}>{title}</h1>
      <p style={{
        margin: 0,
        fontSize: '16px',
        color: '#555',
        fontFamily: 'var(--font-body)'
      }}>{description}</p>
    </div>
  );
};

export default ContextHeader;
