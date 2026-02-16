import React from 'react';
import Card from '../../components/ui/Card';

const Assessments = () => {
  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: 'var(--space-3)' }}>Assessments</h1>
      <Card>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Your assessments and mock interviews will appear here.
        </p>
      </Card>
    </div>
  );
};

export default Assessments;
