import React from 'react';
import Card from '../../ui/Card';
import ProgressBar from './ProgressBar';

const WeeklyGoals = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activeDays = [true, true, false, true, true, false, false]; // Example: active on Mon, Tue, Thu, Fri

  return (
    <Card title="Weekly Goals">
      <div style={{ marginBottom: 'var(--space-3)' }}>
        <div style={{
          fontSize: '14px',
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          marginBottom: 'var(--space-2)'
        }}>
          Problems Solved: 12/20 this week
        </div>
        <ProgressBar value={12} max={20} showLabel={false} />
      </div>

      <div style={{
        display: 'flex',
        gap: 'var(--space-1)',
        justifyContent: 'space-between'
      }}>
        {days.map((day, index) => (
          <div key={day} style={{ textAlign: 'center' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: activeDays[index] ? 'var(--color-accent)' : 'var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '4px',
              transition: 'all var(--transition-fast)'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: activeDays[index] ? 'white' : 'transparent'
              }} />
            </div>
            <div style={{
              fontSize: '10px',
              color: activeDays[index] ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
              fontWeight: activeDays[index] ? 600 : 400
            }}>
              {day}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default WeeklyGoals;
