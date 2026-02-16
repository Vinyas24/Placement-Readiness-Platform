import React from 'react';
import { User } from 'lucide-react';

const DashboardHeader = () => {
  return (
    <header style={{
      height: '64px',
      backgroundColor: 'var(--color-surface)',
      borderBottom: '1px solid var(--color-border)',
      padding: '0 var(--space-4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <h1 style={{
        fontSize: '20px',
        fontWeight: 600,
        fontFamily: 'var(--font-heading)',
        color: 'var(--color-text-primary)'
      }}>
        Placement Prep
      </h1>
      
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-background)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid var(--color-border)'
      }}>
        <User size={20} color="var(--color-text-tertiary)" />
      </div>
    </header>
  );
};

export default DashboardHeader;
