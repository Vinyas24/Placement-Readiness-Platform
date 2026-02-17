import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Rocket, Lock, CheckCircle } from 'lucide-react';

const STORAGE_KEY = 'prp_test_checklist';

const Ship = () => {
  const navigate = useNavigate();
  const [locked, setLocked] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const checkedItems = JSON.parse(saved);
        // Hardcoded list length matching CHECKLIST_ITEMS in TestChecklist.jsx
        // Ideally should be shared constant, but for this specific request simplicity:
        const count = Object.values(checkedItems).filter(Boolean).length;
        if (count >= 10) {
          setLocked(false);
        }
      } catch (e) {
         console.error('Failed to verify checklist for shipping', e);
      }
    }
  }, []);

  if (locked) {
    return (
      <div style={{ maxWidth: '600px', margin: '100px auto', textAlign: 'center' }}>
        <Card padding="var(--space-5)">
          <div style={{ color: '#ef4444', marginBottom: 'var(--space-3)' }}>
            <Lock size={48} />
          </div>
          <h2 style={{ fontSize: '24px', marginBottom: 'var(--space-2)' }}>Deployment Locked</h2>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
            You must verify all 10 functionality tests before shipping.
          </p>
          <Button onClick={() => navigate('/prp/07-test')}>
            Go to Checklist
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', paddingTop: '40px' }}>
      <div style={{ marginBottom: '40px', color: 'var(--color-success)' }}>
         <Rocket size={64} />
      </div>
      
      <h1 style={{ fontSize: '36px', marginBottom: 'var(--space-3)' }}>Ready for Takeoff!</h1>
      <p style={{ fontSize: '18px', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto 40px auto' }}>
        The Placement Readiness Platform is hardened, verified, and ready for candidates.
        Great work on the QA process.
      </p>

      <Card padding="var(--space-5)" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
          <CheckCircle size={24} color="var(--color-success)" />
          <span style={{ fontSize: '18px', fontWeight: 500 }}>All Systems Go</span>
        </div>
        <div style={{ fontSize: '14px', color: 'var(--color-text-tertiary)' }}>
           Version 1.0.0 • Validated
        </div>
      </Card>

      <div style={{ marginTop: '40px' }}>
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
           Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default Ship;
