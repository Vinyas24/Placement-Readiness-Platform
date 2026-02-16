import React from 'react';

const ProgressBar = ({ value, max, height = 8, showLabel = false }) => {
  const percentage = (value / max) * 100;

  return (
    <div style={{ width: '100%' }}>
      {showLabel && (
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-1)',
          fontSize: '12px',
          color: 'var(--color-text-secondary)'
        }}>
          <span>{value} / {max}</span>
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div style={{
        width: '100%',
        height: `${height}px`,
        backgroundColor: 'var(--color-border)',
        borderRadius: '999px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: 'var(--color-accent)',
          borderRadius: '999px',
          transition: 'width 0.5s ease-in-out'
        }} />
      </div>
    </div>
  );
};

export default ProgressBar;
