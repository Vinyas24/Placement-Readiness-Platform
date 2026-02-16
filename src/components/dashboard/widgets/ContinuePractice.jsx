import React from 'react';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import ProgressBar from './ProgressBar';

const ContinuePractice = () => {
  return (
    <Card title="Continue Practice">
      <div style={{ marginBottom: 'var(--space-3)' }}>
        <div style={{
          fontSize: '18px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-1)'
        }}>
          Dynamic Programming
        </div>
        <div style={{
          fontSize: '14px',
          color: 'var(--color-text-secondary)',
          marginBottom: 'var(--space-2)'
        }}>
          Last practiced 2 hours ago
        </div>
      </div>
      
      <ProgressBar value={3} max={10} showLabel={true} />
      
      <Button 
        variant="primary" 
        style={{ marginTop: 'var(--space-3)', width: '100%' }}
      >
        Continue
      </Button>
    </Card>
  );
};

export default ContinuePractice;
