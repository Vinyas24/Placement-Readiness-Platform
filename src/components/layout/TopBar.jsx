import React from 'react';

const TopBar = ({ projectName = "KodNest Premium", step = 1, totalSteps = 5, status = "In Progress" }) => {
  const statusColors = {
    "Not Started": "var(--color-text-primary)",
    "In Progress": "var(--color-warning)",
    "Shipped": "var(--color-success)"
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 'var(--space-2) var(--space-4)',
      borderBottom: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-surface)',
      height: '64px'
    }}>
      <div style={{ fontWeight: 600, fontSize: '14px' }}>{projectName}</div>
      <div style={{ fontSize: '14px', color: '#666' }}>Step {step} / {totalSteps}</div>
      <div style={{
        fontSize: '12px',
        fontWeight: 600,
        padding: '4px 8px',
        borderRadius: 'var(--radius-sm)',
        backgroundColor: '#eee',
        color: statusColors[status] || 'black'
      }}>
        {status}
      </div>
    </div>
  );
};

export default TopBar;
