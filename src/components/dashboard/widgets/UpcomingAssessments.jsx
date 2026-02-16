import React from 'react';
import Card from '../../ui/Card';
import { Calendar } from 'lucide-react';

const UpcomingAssessments = () => {
  const assessments = [
    { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
    { title: 'System Design Review', time: 'Wed, 2:00 PM' },
    { title: 'HR Interview Prep', time: 'Friday, 11:00 AM' }
  ];

  return (
    <Card title="Upcoming Assessments">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {assessments.map((assessment, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-2)',
              backgroundColor: 'var(--color-background)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)'
            }}
          >
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Calendar size={20} color="var(--color-accent)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
                marginBottom: '2px'
              }}>
                {assessment.title}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--color-text-secondary)'
              }}>
                {assessment.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default UpcomingAssessments;
