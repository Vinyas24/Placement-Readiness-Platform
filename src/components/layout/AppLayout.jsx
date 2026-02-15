import React from 'react';
import TopBar from './TopBar';
import ContextHeader from './ContextHeader';
import ProofFooter from './ProofFooter';

const AppLayout = ({ children, title, description, step, totalSteps, status }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopBar step={step} totalSteps={totalSteps} status={status} />
      <ContextHeader title={title} description={description} />
      
      <div style={{
        display: 'flex',
        flex: 1,
        height: 'calc(100vh - 64px - 100px - 48px)', // Approximate available height
        overflow: 'hidden'
      }}>
        {children}
      </div>

      <ProofFooter />
    </div>
  );
};

export default AppLayout;
