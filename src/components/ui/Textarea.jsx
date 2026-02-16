import React from 'react';

const Textarea = ({ label, placeholder, error, rows = 12, ...props }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: 'var(--space-2)' }}>
      {label && (
        <label style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text-primary)' }}>
          {label}
        </label>
      )}
      <textarea
        style={{
          padding: '12px',
          borderRadius: 'var(--radius-md)',
          border: `1px solid ${error ? 'var(--color-accent)' : 'var(--color-border)'}`,
          fontSize: '14px',
          outline: 'none',
          backgroundColor: 'white',
          transition: 'border-color var(--transition-fast)',
          width: '100%',
          fontFamily: 'inherit',
          resize: 'vertical',
          minHeight: '150px'
        }}
        placeholder={placeholder}
        rows={rows}
        onFocus={(e) => !error && (e.target.style.borderColor = '#555')}
        onBlur={(e) => !error && (e.target.style.borderColor = 'var(--color-border)')}
        {...props}
      />
      {error && <span style={{ fontSize: '12px', color: 'var(--color-accent)' }}>{error}</span>}
    </div>
  );
};

export default Textarea;
