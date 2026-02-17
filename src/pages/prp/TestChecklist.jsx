import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { CheckSquare, Square, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react';

const CHECKLIST_ITEMS = [
  { id: 'jd-validation', label: 'JD required validation works', hint: 'Try submitting empty JD on Dashboard.' },
  { id: 'short-jd', label: 'Short JD warning shows for <200 chars', hint: 'Enter "Hiring dev" and analyze.' },
  { id: 'skills-extract', label: 'Skills extraction groups correctly', hint: 'Verify Output has "Languages", "Web" etc.' },
  { id: 'round-mapping', label: 'Round mapping changes based on company + skills', hint: 'Compare "Google" vs "Startup".' },
  { id: 'deterministic-score', label: 'Score calculation is deterministic', hint: 'Same JD should give same base score.' },
  { id: 'live-score', label: 'Skill toggles update score live', hint: 'Click skills and watch the pie chart.' },
  { id: 'persistence', label: 'Changes persist after refresh', hint: 'Refresh results page.' },
  { id: 'history', label: 'History saves and loads correctly', hint: 'Check if new entry appears in History.' },
  { id: 'export', label: 'Export buttons copy the correct content', hint: 'Paste into Notepad to verify.' },
  { id: 'no-errors', label: 'No console errors on core pages', hint: 'Open DevTools (F12) to check.' }
];

const STORAGE_KEY = 'prp_test_checklist';

const TestChecklist = () => {
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse checklist state', e);
      }
    }
  }, []);

  const toggleItem = (id) => {
    setCheckedItems(prev => {
      const updated = { ...prev, [id]: !prev[id] };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const handleReset = () => {
    if (window.confirm('Reset all progress?')) {
      setCheckedItems({});
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const isComplete = completedCount === CHECKLIST_ITEMS.length;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '40px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: 'var(--space-2)' }}>Pre-Flight Checklist</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
        Verify all features before unlocking the final ship screen.
      </p>

      <Card padding="var(--space-5)">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
          <div>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: isComplete ? 'var(--color-success)' : 'var(--color-text-primary)' }}>
              Tests Passed: {completedCount} / {CHECKLIST_ITEMS.length}
            </span>
            {!isComplete && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', fontSize: '14px', marginTop: '4px' }}>
                <AlertTriangle size={14} /> Fix issues before shipping.
              </div>
            )}
          </div>
          <Button variant="secondary" onClick={handleReset} style={{ fontSize: '12px' }}>
            <RotateCcw size={14} /> Reset
          </Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {CHECKLIST_ITEMS.map((item) => (
            <div 
              key={item.id}
              onClick={() => toggleItem(item.id)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px',
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: checkedItems[item.id] ? 'rgba(75, 127, 82, 0.05)' : 'var(--color-surface)',
                border: `1px solid ${checkedItems[item.id] ? 'var(--color-success)' : 'var(--color-border)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ marginTop: '2px', color: checkedItems[item.id] ? 'var(--color-success)' : 'var(--color-text-tertiary)' }}>
                {checkedItems[item.id] ? <CheckSquare size={20} /> : <Square size={20} />}
              </div>
              <div>
                <div style={{ fontWeight: 500, fontSize: '16px', color: checkedItems[item.id] ? 'var(--color-text-primary)' : 'var(--color-text-secondary)' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', marginTop: '2px' }}>
                  💡 {item.hint}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 'var(--space-5)', textAlign: 'right' }}>
           <Button 
             onClick={() => navigate('/prp/08-ship')}
             disabled={!isComplete}
             style={{ 
               opacity: isComplete ? 1 : 0.5,
               cursor: isComplete ? 'pointer' : 'not-allowed'
             }}
           >
             Proceed to Ship <ArrowRight size={18} />
           </Button>
        </div>
      </Card>
    </div>
  );
};

export default TestChecklist;
