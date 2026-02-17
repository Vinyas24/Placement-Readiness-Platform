import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAnalysisById, getHistory, updateAnalysis } from '../../utils/storageUtils';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { ArrowLeft, CheckCircle, Circle, Download, Copy, PlayCircle, Building, Info, MapPin } from 'lucide-react';

const Results = () => {
  const [analysis, setAnalysis] = useState(null);
  const [skillConfidence, setSkillConfidence] = useState({});
  const [currentScore, setCurrentScore] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  // Load Initial Data
  useEffect(() => {
    let data = null;
    const stateId = location.state?.analysisId;

    if (stateId) {
      data = getAnalysisById(stateId);
    } else {
      const history = getHistory();
      if (history.length > 0) {
        data = history[0];
      }
    }

    if (data) {
      setAnalysis(data);
      setSkillConfidence(data.skillConfidenceMap || {});
      // Support new schema (finalScore) and legacy (currentScore/readinessScore)
      setCurrentScore(data.finalScore ?? data.currentScore ?? data.readinessScore);
    }
  }, [location.state]);

  // Handle Skill Toggle
  const toggleSkill = (skill) => {
    if (!analysis) return;

    const newConfidence = { ...skillConfidence };
    if (newConfidence[skill] === 'know') {
      delete newConfidence[skill];
    } else {
      newConfidence[skill] = 'know';
    }

    setSkillConfidence(newConfidence);

    // Recalculate Score
    // New Schema uses 'baseScore'. Legacy uses 'readinessScore'.
    const base = analysis.baseScore ?? analysis.readinessScore;

    const allSkills = Object.values(analysis.extractedSkills).flat();
    const totalSkills = allSkills.length;
    
    const knownCount = Object.values(newConfidence).filter(v => v === 'know').length;
    const practiceCount = totalSkills - knownCount;

    let newScore = base + (2 * knownCount) - (2 * practiceCount);
    newScore = Math.max(0, Math.min(100, newScore));
    setCurrentScore(newScore);

    updateAnalysis(analysis.id, {
      skillConfidenceMap: newConfidence,
      finalScore: newScore,
      currentScore: newScore // Keep legacy sync
    });
  };

  // Export Tools
  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${label} copied to clipboard!`);
    });
  };

  const downloadTxt = () => {
    if (!analysis) return;
    const date = new Date(analysis.createdAt).toLocaleDateString();
    let content = `PLACEMENT READINESS REPORT\nGenerated on: ${date}\n`;
    content += `Role: ${analysis.role}\nCompany: ${analysis.company}\n`;
    content += `Readiness Score: ${currentScore}/100\n\n`;
    
    if (analysis.companyIntel) {
      content += `--- COMPANY INTEL ---\n`;
      content += `Industry: ${analysis.companyIntel.industry}\n`;
      content += `Size: ${analysis.companyIntel.size}\n`;
      content += `Focus: ${analysis.companyIntel.focus}\n\n`;
    }

    content += `--- ROUND MAPPING ---\n`;
    if (analysis.roundMapping) {
      analysis.roundMapping.forEach(r => {
        content += `${r.round}: ${r.name} (${r.type})\n`;
        content += `  Desc: ${r.description}\n`;
        content += `  Why: ${r.whyItMatters}\n`;
      });
      content += '\n';
    }

    content += `--- SKILLS ---\n`;
    Object.entries(analysis.extractedSkills).forEach(([cat, skills]) => {
      content += `${cat}: ${skills.join(', ')}\n`;
    });

    content += `\n--- 7-DAY PLAN ---\n`;
    analysis.plan.forEach(p => {
      content += `${p.day} (${p.focus}):\n`;
      p.tasks.forEach(t => content += `  - ${t}\n`);
    });

    content += `\n--- QUESTIONS ---\n`;
    analysis.questions.forEach((q, i) => content += `${i+1}. ${q}\n`);

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `readiness_report_${analysis.company || 'general'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const weakSkills = useMemo(() => {
    if (!analysis) return [];
    const allSkills = Object.values(analysis.extractedSkills).flat();
    return allSkills.filter(s => skillConfidence[s] !== 'know').slice(0, 3);
  }, [analysis, skillConfidence]);

  if (!analysis) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  const chartData = [
    { name: 'Readiness', value: currentScore },
    { name: 'Gap', value: 100 - currentScore }
  ];
  const COLORS = ['var(--color-accent)', '#e0e0e0'];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '40px' }}>
      
      {/* Header & Export Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Button variant="secondary" onClick={() => navigate('/dashboard/history')}>
             <ArrowLeft size={16} /> Back
          </Button>
          <h1 style={{ fontSize: '24px', margin: 0 }}>Results: {analysis.role}</h1>
        </div>
        
        <div style={{ display: 'flex', gap: '8px' }}>
           <Button variant="secondary" onClick={downloadTxt} title="Download Report">
             <Download size={16} /> TXT
           </Button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }}>
        
        {/* Left Column: Score & Company Intel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          {/* Live Score */}
          <Card>
            <h3 style={{ marginBottom: 'var(--space-3)' }}>Live Readiness</h3>
            <div style={{ height: '200px', position: 'relative' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={180}
                    endAngle={0}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div style={{
                position: 'absolute',
                top: '60%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center'
              }}>
                <span style={{ fontSize: '32px', fontWeight: 'bold', display: 'block' }}>{currentScore}%</span>
              </div>
            </div>
            <p style={{ fontSize: '12px', textAlign: 'center', color: 'var(--color-text-secondary)' }}>
              Adjusts as you mark skills "Known".
            </p>
          </Card>

          {/* Company Intel */}
          {analysis.companyIntel && (
            <Card>
              <h3 style={{ marginBottom: 'var(--space-2)' }}>Company Intel</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                <Building size={16} /> 
                <span style={{ fontWeight: 600 }}>{analysis.companyIntel.name}</span>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.03)', padding: '8px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Industry</div>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>{analysis.companyIntel.industry}</div>
                </div>
                <div style={{ backgroundColor: 'rgba(0,0,0,0.03)', padding: '8px', borderRadius: '4px' }}>
                  <div style={{ fontSize: '10px', color: 'var(--color-text-tertiary)', textTransform: 'uppercase' }}>Size Type</div>
                  <div style={{ fontSize: '13px', fontWeight: 500 }}>{analysis.companyIntel.size}</div>
                </div>
              </div>

              <div style={{ fontSize: '13px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                <strong style={{ color: 'var(--color-text-primary)' }}>Focus:</strong> {analysis.companyIntel.focus}
              </div>

              {analysis.companyIntel.isDemo && (
                <div style={{ marginTop: '12px', fontSize: '11px', color: '#9CA3AF', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Info size={12} /> Heuristic-based demo logic.
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Right Column: Skills & Round Timeline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
           
           {/* Interactive Skills */}
           <Card>
            <h3 style={{ marginBottom: 'var(--space-3)' }}>Skill Assessment</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {Object.entries(analysis.extractedSkills).map(([category, skills]) => (
                skills.length > 0 && (
                  <div key={category}>
                    <strong style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>
                      {category}
                    </strong>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                      {skills.map(skill => {
                        const isKnown = skillConfidence[skill] === 'know';
                        return (
                          <button 
                            key={skill}
                            onClick={() => toggleSkill(skill)}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              backgroundColor: isKnown ? 'rgba(75, 127, 82, 0.1)' : 'rgba(0,0,0,0.03)',
                              color: isKnown ? 'var(--color-success)' : 'var(--color-text-secondary)',
                              border: `1px solid ${isKnown ? 'var(--color-success)' : 'var(--color-border)'}`,
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '14px',
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                            }}
                          >
                            {isKnown ? <CheckCircle size={14} /> : <Circle size={14} />}
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )
              ))}
               {Object.keys(analysis.extractedSkills).length === 0 && <p>No specific technical skills detected.</p>}
            </div>
          </Card>

          {/* Round Mapping Timeline */}
          {analysis.roundMapping && (
            <Card>
              <h3 style={{ marginBottom: 'var(--space-3)' }}>Hiring Process Roadmap</h3>
              <div style={{ position: 'relative', paddingLeft: '16px' }}>
                {/* Vertical Line */}
                <div style={{ 
                  position: 'absolute', 
                  left: '23px', 
                  top: '10px', 
                  bottom: '30px', 
                  width: '2px', 
                  backgroundColor: 'var(--color-border)' 
                }} />

                {analysis.roundMapping.map((round, index) => (
                  <div key={index} style={{ marginBottom: '24px', position: 'relative', paddingLeft: '24px' }}>
                    {/* Dot */}
                    <div style={{ 
                      position: 'absolute', 
                      left: '0', 
                      top: '0', 
                      width: '16px', 
                      height: '16px', 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--color-surface)', 
                      border: '2px solid var(--color-accent)',
                      zIndex: 1
                    }} />
                    
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '16px', color: 'var(--color-text-primary)' }}>
                      {round.round}: {round.name}
                    </h4>
                    <span style={{ 
                      fontSize: '12px', 
                      backgroundColor: 'rgba(99, 102, 241, 0.1)', 
                      color: 'var(--color-accent)', 
                      padding: '2px 8px', 
                      borderRadius: '4px',
                      marginBottom: '8px',
                      display: 'inline-block'
                    }}>
                      {round.type}
                    </span>
                    <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      {round.description}
                    </p>
                    <div style={{ fontSize: '13px', color: 'var(--color-text-tertiary)', fontStyle: 'italic', borderLeft: '2px solid #e5e5e5', paddingLeft: '8px' }}>
                      💡 {round.whyItMatters}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

        </div>
      </div>

      {/* Action Next Box */}
      <div style={{ 
        backgroundColor: '#f0f9ff', 
        border: '1px solid #bae6fd', 
        padding: 'var(--space-3)', 
        borderRadius: 'var(--radius-md)',
        marginBottom: 'var(--space-4)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)'
      }}>
        <div style={{ backgroundColor: '#0ea5e9', color: 'white', padding: '10px', borderRadius: '50%' }}>
          <PlayCircle size={24} />
        </div>
        <div>
          <h4 style={{ margin: '0 0 4px 0', color: '#0369a1' }}>Recommended Next Step</h4>
          <p style={{ margin: 0, fontSize: '14px', color: '#0c4a6e' }}>
            {weakSkills.length > 0 
              ? `Prioritize learning ${weakSkills.join(', ')}. Start Day 1 of your plan now.`
              : `You're well prepared! Start reviewing Mock Interview questions.`
            }
          </p>
        </div>
      </div>

       {/* Plan Section with Copy */}
       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-5)', marginBottom: 'var(--space-3)' }}>
        <h2 style={{ fontSize: '20px', margin: 0 }}>7-Day Preparation Plan</h2>
        <Button variant="secondary" onClick={() => copyToClipboard(JSON.stringify(analysis.plan, null, 2), 'Plan')} style={{ fontSize: '12px', padding: '6px 12px' }}>
          <Copy size={12} /> Copy Plan
        </Button>
      </div>
      <div style={{ marginBottom: 'var(--space-5)' }}>
        {analysis.plan.map((dayPlan, index) => (
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

      {/* Questions with Copy */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
        <h2 style={{ fontSize: '20px', margin: 0 }}>Likely Interview Questions</h2>
        <Button variant="secondary" onClick={() => copyToClipboard(analysis.questions.join('\n'), 'Questions')} style={{ fontSize: '12px', padding: '6px 12px' }}>
          <Copy size={12} /> Copy Questions
        </Button>
      </div>
      <Card>
        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          {analysis.questions.map((q, idx) => (
            <li key={idx} style={{ marginBottom: '12px', fontSize: '15px' }}>
              {q}
            </li>
          ))}
        </ul>
      </Card>
      
      {/* Checklist with Copy */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)', marginTop: 'var(--space-5)' }}>
        <h2 style={{ fontSize: '20px', margin: 0 }}>Round-wise Checklist</h2>
        <Button 
          variant="secondary" 
          onClick={() => {
            let text = '';
            Object.entries(analysis.checklist).forEach(([r, items]) => {
              text += `${r}:\n`;
              items.forEach(i => text += `  [ ] ${i}\n`);
              text += '\n';
            });
            copyToClipboard(text, 'Checklist');
          }}
          style={{ fontSize: '12px', padding: '6px 12px' }}
        >
          <Copy size={12} /> Copy Checklist
        </Button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-4)', marginBottom: 'var(--space-5)' }}>
        {Object.entries(analysis.checklist).map(([round, items]) => (
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
    </div>
  );
};

export default Results;
