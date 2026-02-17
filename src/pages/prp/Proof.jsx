import React, { useState, useEffect } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { CheckCircle, Circle, Copy, ExternalLink, ShieldCheck, Trophy } from 'lucide-react';

const STORAGE_KEY_LINKS = 'prp_final_submission';
const STORAGE_KEY_CHECKLIST = 'prp_test_checklist';

const STEPS = [
  { id: 1, label: 'Project Setup & Structure' },
  { id: 2, label: 'Analysis Engine Logic' },
  { id: 3, label: 'Results & Charts UI' },
  { id: 4, label: 'Interactive Readiness Score' },
  { id: 5, label: 'History Persistence' },
  { id: 6, label: 'Company Intel & Round Mapping' },
  { id: 7, label: 'Reliability Testing (Checklist)' },
  { id: 8, label: 'Proof of Work (Deployment)' }
];

const Proof = () => {
  const [links, setLinks] = useState({
    lovable: '',
    github: '',
    deployed: ''
  });
  const [checklistComplete, setChecklistComplete] = useState(false);
  const [errors, setErrors] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load links
    const savedLinks = localStorage.getItem(STORAGE_KEY_LINKS);
    if (savedLinks) {
      try { return setLinks(JSON.parse(savedLinks)); } catch (e) { console.error(e); }
    }

    // Check checklist status
    const savedChecklist = localStorage.getItem(STORAGE_KEY_CHECKLIST);
    if (savedChecklist) {
      try {
        const items = JSON.parse(savedChecklist);
        // Assuming 10 items based on previous requirement
        const count = Object.values(items).filter(Boolean).length;
        setChecklistComplete(count >= 10);
      } catch (e) { console.error(e); }
    }
  }, []);

  const validateUrl = (url) => {
    if (!url) return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setLinks(prev => {
      const updated = { ...prev, [name]: value };
      localStorage.setItem(STORAGE_KEY_LINKS, JSON.stringify(updated));
      return updated;
    });

    if (validateUrl(value)) {
      setErrors(prev => ({ ...prev, [name]: null }));
    } else if (value) {
      setErrors(prev => ({ ...prev, [name]: 'Invalid URL format' }));
    }
  };

  const areLinksValid = 
    validateUrl(links.lovable) && 
    validateUrl(links.github) && 
    validateUrl(links.deployed);

  const isShipped = checklistComplete && areLinksValid;

  const handleCopy = () => {
    const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deployed}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '60px' }}>
      
      {/* Header Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
        <div>
          <h1 style={{ fontSize: '28px', margin: 0 }}>Proof of Work</h1>
          <p style={{ color: 'var(--color-text-secondary)', marginTop: '4px' }}>
            Final verification and submission packet.
          </p>
        </div>
        <div style={{ 
          padding: '8px 16px', 
          borderRadius: '99px', 
          backgroundColor: isShipped ? 'rgba(16, 185, 129, 0.1)' : 'rgba(107, 114, 128, 0.1)',
          color: isShipped ? 'var(--color-success)' : 'var(--color-text-secondary)',
          fontWeight: 'bold',
          border: `1px solid ${isShipped ? 'var(--color-success)' : 'var(--color-border)'}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {isShipped ? <ShieldCheck size={18} /> : <Circle size={18} />}
          {isShipped ? 'SHIPPED' : 'IN PROGRESS'}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 'var(--space-5)' }}>
        
        {/* Left Column: steps */}
        <Card title="Step Completion">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {STEPS.map((step) => {
              // Logic for status
              let completed = true; // Default 1-6
              if (step.id === 7) completed = checklistComplete;
              if (step.id === 8) completed = areLinksValid;

              return (
                <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px' }}>
                   <div style={{ color: completed ? 'var(--color-success)' : 'var(--color-text-tertiary)' }}>
                     {completed ? <CheckCircle size={18} /> : <Circle size={18} />}
                   </div>
                   <span style={{ 
                     color: completed ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                     textDecoration: completed ? 'none' : 'none'
                   }}>
                     {step.label}
                   </span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Right Column: Artifacts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <Card title="Artifact Submission">
             <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
               <Input 
                 label="Lovable Project Link *"
                 name="lovable"
                 placeholder="https://lovable.dev/..."
                 value={links.lovable}
                 onChange={handleLinkChange}
                 error={errors.lovable}
               />
               <Input 
                 label="GitHub Repository Link *"
                 name="github"
                 placeholder="https://github.com/..."
                 value={links.github}
                 onChange={handleLinkChange}
                 error={errors.github}
               />
               <Input 
                 label="Deployed Application URL *"
                 name="deployed"
                 placeholder="https://vercel.app/..."
                 value={links.deployed}
                 onChange={handleLinkChange}
                 error={errors.deployed}
               />
             </div>
          </Card>

          {isShipped && (
            <Card style={{ backgroundColor: 'rgba(16, 185, 129, 0.05)', border: '1px solid var(--color-success)' }}>
               <div style={{ textAlign: 'center', padding: 'var(--space-2)' }}>
                  <div style={{ color: 'var(--color-success)', marginBottom: 'var(--space-2)' }}>
                    <Trophy size={32} />
                  </div>
                  <h3 style={{ fontSize: '18px', color: 'var(--color-success)', marginBottom: '8px' }}>
                    You built a real product.
                  </h3>
                  <p style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
                    "Not a tutorial. Not a clone.<br/>
                    A structured tool that solves a real problem.<br/>
                    This is your proof of work."
                  </p>
                  
                  <Button onClick={handleCopy} style={{ width: '100%' }}>
                     {copied ? 'Copied!' : (
                       <>
                         <Copy size={16} /> Copy Final Submission
                       </>
                     )}
                  </Button>
               </div>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
};

export default Proof;
