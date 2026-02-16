import React from 'react';
import Card from '../../components/ui/Card';

const Resources = () => {
  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: 'var(--space-3)' }}>Resources</h1>
      <Card>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Learning resources and study materials will appear here.
        </p>
      </Card>
    </div>
  );
};

export default Resources;
