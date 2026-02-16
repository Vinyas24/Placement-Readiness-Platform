import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Video, TrendingUp } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Code,
      title: 'Practice Problems',
      description: 'Solve coding challenges curated for placement interviews'
    },
    {
      icon: Video,
      title: 'Mock Interviews',
      description: 'Simulate real interview scenarios with AI feedback'
    },
    {
      icon: TrendingUp,
      title: 'Track Progress',
      description: 'Monitor your improvement with detailed analytics'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--space-5)',
        textAlign: 'center',
        backgroundColor: 'var(--color-background)'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <h1 style={{
            fontSize: '56px',
            marginBottom: 'var(--space-3)',
            color: 'var(--color-text-primary)'
          }}>
            Ace Your Placement
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'var(--color-text-secondary)',
            marginBottom: 'var(--space-4)',
            lineHeight: 1.8
          }}>
            Practice, assess, and prepare for your dream job
          </p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/dashboard')}
            style={{ fontSize: '16px', padding: '14px 32px' }}
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{
        padding: 'var(--space-5) var(--space-4)',
        backgroundColor: 'var(--color-surface)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-4)'
          }}>
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} style={{ textAlign: 'center', padding: 'var(--space-4)' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    margin: '0 auto var(--space-3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'var(--color-background)',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <Icon size={32} color="var(--color-accent)" />
                  </div>
                  <h3 style={{
                    fontSize: '20px',
                    marginBottom: 'var(--space-2)',
                    fontFamily: 'var(--font-heading)'
                  }}>
                    {feature.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.6
                  }}>
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: 'var(--space-3)',
        textAlign: 'center',
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-text-tertiary)',
        fontSize: '14px'
      }}>
        © 2026 Placement Readiness Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
