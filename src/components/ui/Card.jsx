import React from 'react';

const Card = ({ children, title, padding = 'var(--space-3)', style = {} }) => {
  return (
    <div style={{
      backgroundColor: 'var(--color-surface)',
      border: '1px solid var(--color-border)',
      borderRadius: 'var(--radius-md)',
      padding: padding,
      ...style
    }}>
      {title && (
        <h3 style={{
           marginTop: 0,
           marginBottom: 'var(--space-2)',
           fontSize: '18px',
           fontFamily: 'var(--font-heading)'
        }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
};

export default Card;
