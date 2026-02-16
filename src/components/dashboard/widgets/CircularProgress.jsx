import React from 'react';

const CircularProgress = ({ value, max = 100, size = 200, strokeWidth = 16 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;
  const dashOffset = circumference - progress;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      gap: 'var(--space-2)'
    }}>
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 1s ease-in-out'
            }}
          />
        </svg>
        {/* Center text */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '48px',
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            color: 'var(--color-text-primary)'
          }}>
            {value}
          </div>
          <div style={{
            fontSize: '14px',
            color: 'var(--color-text-tertiary)',
            marginTop: '4px'
          }}>
            / {max}
          </div>
        </div>
      </div>
      <div style={{
        fontSize: '16px',
        fontWeight: 600,
        color: 'var(--color-text-secondary)'
      }}>
        Readiness Score
      </div>
    </div>
  );
};

export default CircularProgress;
