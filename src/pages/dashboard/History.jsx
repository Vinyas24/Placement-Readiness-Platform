import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory, clearHistory } from '../../utils/storageUtils';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { Trash2, Calendar, Briefcase, Building } from 'lucide-react';

const History = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleClear = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const handleView = (id) => {
    navigate('/dashboard/results', { state: { analysisId: id } });
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <h1 style={{ fontSize: '24px', margin: 0 }}>Analysis History</h1>
        {history.length > 0 && (
          <Button variant="secondary" onClick={handleClear} style={{ color: '#ef4444', borderColor: '#ef4444' }}>
            <Trash2 size={16} /> Clear History
          </Button>
        )}
      </div>

      {history.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: 'var(--space-5)' }}>
          <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
            No analysis history found.
          </p>
          <Button onClick={() => navigate('/dashboard')}>
            Create New Analysis
          </Button>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {history.map((item) => (
            <Card 
              key={item.id} 
              onClick={() => handleView(item.id)}
              style={{ cursor: 'pointer', transition: 'transform 0.2s', ':hover': { transform: 'translateY(-2px)' } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '18px', marginBottom: '4px' }}>{item.role}</h3>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Building size={14} /> {item.company}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={14} /> {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold', 
                    color: item.readinessScore >= 70 ? 'var(--color-success)' : 
                           item.readinessScore >= 50 ? 'var(--color-warning)' : '#ef4444'
                  }}>
                    {item.readinessScore}%
                  </div>
                  <span style={{ fontSize: '12px', color: 'var(--color-text-tertiary)' }}>Readiness</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
