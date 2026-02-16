import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAnalysisById, getHistory } from '../../utils/storageUtils';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowLeft, CheckCircle, Calendar, Briefcase, Building } from 'lucide-react';

const Results = () => {
  const [analysis, setAnalysis] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Try to get ID from navigation state
    const stateId = location.state?.analysisId;
    
    if (stateId) {
      const data = getAnalysisById(stateId);
      if (data) {
        setAnalysis(data);
        return;
      }
    }

    // 2. Fallback: Get latest from history
    const history = getHistory();
    if (history.length > 0) {
      setAnalysis(history[0]);
    } else {
      // No history at all
      setAnalysis(null);
    }
  }, [location.state]);

  if (!analysis) {
    return (
      <div style={{ textAlign: 'center', padding: 'var(--space-5)' }}>
        <h2>No Analysis Found</h2>
        <p>Go back to the dashboard to analyze a job description.</p>
        <Button onClick={() => navigate('/dashboard')} style={{ marginTop: 'var(--space-3)' }}>
          Back to Dashboard
        </Button>
      </div>
    );
  }

  const { company, role, readinessScore, extractedSkills, checklist, plan, questions } = analysis;

  // Chart Data
  const data = [
    { name: 'Readiness', value: readinessScore },
    { name: 'Gap', value: 100 - readinessScore }
  ];
  const COLORS = ['var(--color-accent)', '#e0e0e0'];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ marginBottom: 'var(--space-4)', display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <Button variant="secondary" onClick={() => navigate('/dashboard')}>
           <ArrowLeft size={16} /> Back
        </Button>
        <div>
          <h1 style={{ fontSize: '24px', margin: 0 }}>Analysis Results</h1>
          <p style={{ color: 'var(--color-text-secondary)', margin: 0 }}>
            {role} @ {company}
          </p>
        </div>
      </div>

      {/* Top Section: Score & Skills */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
        
        {/* Score Card */}
        <Card>
          <h3 style={{ marginBottom: 'var(--space-3)' }}>Readiness Score</h3>
          <div style={{ height: '200px', position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  startAngle={180}
                  endAngle={0}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div style={{
              position: 'absolute',
              top: '60%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '32px', fontWeight: 'bold', display: 'block' }}>{readinessScore}%</span>
              <span style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>Ready</span>
            </div>
          </div>
        </Card>

        {/* Skills Card */}
        <Card>
          <h3 style={{ marginBottom: 'var(--space-3)' }}>Extracted Skills</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {Object.entries(extractedSkills).map(([category, skills]) => (
              skills.length > 0 && (
                <div key={category}>
                  <strong style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>
                    {category}
                  </strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                    {skills.map(skill => (
                      <span key={skill} style={{
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        color: 'var(--color-accent)',
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '14px'
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )
            ))}
            {Object.keys(extractedSkills).length === 0 && <p>No specific technical skills detected.</p>}
          </div>
        </Card>
      </div>

      {/* 4 Round Checklist */}
      <h2 style={{ fontSize: '20px', marginBottom: 'var(--space-3)' }}>Interview Rounds Checklist</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
        {Object.entries(checklist).map(([round, items]) => (
          <Card key={round}>
            <h3 style={{ fontSize: '16px', marginBottom: 'var(--space-2)', color: 'var(--color-accent)' }}>{round}</h3>
            <ul style={{ paddingLeft: '20px', margin: 0 }}>
              {items.map((item, idx) => (
                <li key={idx} style={{ marginBottom: '8px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* 7 Day Plan */}
      <h2 style={{ fontSize: '20px', marginBottom: 'var(--space-3)' }}>7-Day Preparation Plan</h2>
      <div style={{ marginBottom: 'var(--space-5)' }}>
        {plan.map((dayPlan, index) => (
          <div key={index} style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-3)',
            marginBottom: 'var(--space-2)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600 }}>{dayPlan.day}</span>
              <span style={{ color: 'var(--color-accent)', fontWeight: 500 }}>{dayPlan.focus}</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
              {dayPlan.tasks.map((task, idx) => (
                <li key={idx}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Interview Questions */}
      <h2 style={{ fontSize: '20px', marginBottom: 'var(--space-3)' }}>Likely Interview Questions</h2>
      <Card>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {questions.map((q, idx) => (
            <li key={idx} style={{ marginBottom: '12px', fontSize: '15px' }}>
              {q}
            </li>
          ))}
        </ul>
      </Card>

    </div>
  );
};

export default Results;
