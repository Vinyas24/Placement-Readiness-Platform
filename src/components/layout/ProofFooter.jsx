import React, { useState } from 'react';

const ProofItem = ({ label }) => {
  const [checked, setChecked] = useState(false);
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => setChecked(!checked)}
        style={{ accentColor: 'var(--color-accent)' }}
      />
      {label}
    </label>
  );
};

const ProofFooter = () => {
  return (
    <div style={{
      display: 'flex',
      gap: 'var(--space-4)',
      padding: 'var(--space-2) var(--space-4)',
      borderTop: '1px solid var(--color-border)',
      backgroundColor: 'var(--color-surface)',
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '48px',
      alignItems: 'center',
      fontSize: '14px'
    }}>
      <span style={{ fontWeight: 600, marginRight: 'var(--space-2)' }}>Validation:</span>
      <ProofItem label="UI Built" />
      <ProofItem label="Logic Working" />
      <ProofItem label="Test Passed" />
      <ProofItem label="Deployed" />
    </div>
  );
};

export default ProofFooter;
