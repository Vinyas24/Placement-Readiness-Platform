import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { analyzeJobDescription } from '../../utils/analysisUtils';
import { saveAnalysis } from '../../utils/storageUtils';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Textarea from '../../components/ui/Textarea';
import Card from '../../components/ui/Card';
import { Sparkles, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    jdText: ''
  });
  const [errors, setErrors] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.jdText.trim()) {
      newErrors.jdText = 'Job Description is required for analysis';
    } else if (formData.jdText.length < 50) {
      newErrors.jdText = 'Job Description is too short. Please provide more details.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAnalyze = async () => {
    if (!validate()) return;
    
    setIsAnalyzing(true);
    
    // Simulate a small delay for "processing" feel
    setTimeout(() => {
      try {
        const result = analyzeJobDescription(
          formData.jdText, 
          formData.company, 
          formData.role
        );
        
        const saved = saveAnalysis(result);
        
        if (saved) {
          navigate('/dashboard/results', { state: { analysisId: result.id } });
        } else {
          alert('Failed to save analysis. Please try again.');
        }
      } catch (error) {
        console.error('Analysis failed:', error);
        alert('An error occurred during analysis.');
      } finally {
        setIsAnalyzing(false);
      }
    }, 800);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: 'var(--space-4)' }}>
        <h1 style={{ fontSize: '28px', marginBottom: 'var(--space-2)' }}>
          Job Readiness Analysis
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', fontSize: '16px' }}>
          Paste a job description below to get a personalized preparation plan and readiness score.
        </p>
      </div>

      <Card style={{ padding: 'var(--space-4)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
          <Input
            label="Company Name (Optional)"
            placeholder="e.g. Google, Amazon, Startup..."
            name="company"
            value={formData.company}
            onChange={handleChange}
          />
          <Input
            label="Role Title (Optional)"
            placeholder="e.g. Frontend Developer, SDE-1..."
            name="role"
            value={formData.role}
            onChange={handleChange}
          />
        </div>

        <Textarea
          label="Job Description / Skills Required *"
          placeholder="Paste the full job description here..."
          name="jdText"
          value={formData.jdText}
          onChange={handleChange}
          error={errors.jdText}
          rows={15}
        />

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-3)' }}>
          <Button 
            onClick={handleAnalyze} 
            disabled={isAnalyzing}
            style={{ 
              padding: '12px 32px', 
              fontSize: '16px',
              opacity: isAnalyzing ? 0.7 : 1
            }}
          >
            {isAnalyzing ? (
              'Analyzing...'
            ) : (
              <>
                <Sparkles size={18} /> Analyze Readiness <ArrowRight size={18} />
              </>
            )}
          </Button>
        </div>
      </Card>
      
      <div style={{ marginTop: 'var(--space-4)', textAlign: 'center', fontSize: '14px', color: 'var(--color-text-tertiary)' }}>
        <p>
          Analysis uses local heuristics. No data is sent to external servers.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
