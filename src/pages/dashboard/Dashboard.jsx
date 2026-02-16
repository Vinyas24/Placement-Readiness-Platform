import React from 'react';
import Card from '../../components/ui/Card';

const Dashboard = () => {
  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: 'var(--space-3)' }}>Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
        <Card title="Problems Solved">
          <p style={{ fontSize: '36px', fontWeight: 700, color: 'var(--color-accent)' }}>42</p>
        </Card>
        <Card title="Assessments Taken">
          <p style={{ fontSize: '36px', fontWeight: 700, color: 'var(--color-accent)' }}>8</p>
        </Card>
        <Card title="Success Rate">
          <p style={{ fontSize: '36px', fontWeight: 700, color: 'var(--color-success)' }}>87%</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
