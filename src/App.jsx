import React, { useState } from 'react';
import AppLayout from './components/layout/AppLayout';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import Card from './components/ui/Card';

function App() {
  const [inputValue, setInputValue] = useState('');

  return (
    <AppLayout
      projectName="KodNest Premium"
      step={1}
      totalSteps={5}
      status="In Progress"
      title="Define Your Data Model"
      description="Structure the core entities for your application before proceeding to logic."
    >
      {/* Primary Workspace (70%) */}
      <div style={{
        flex: '0 0 70%',
        padding: 'var(--space-4)',
        overflowY: 'auto',
        borderRight: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-background)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Card title="Entity Configuration" style={{ marginBottom: 'var(--space-4)' }}>
            <p style={{ marginBottom: 'var(--space-3)', color: 'var(--color-text-secondary)' }}>
              Define the properties for your user entity. Ensure all fields are correctly typed.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
               <Input label="Entity Name" placeholder="e.g. User" value="User" readOnly />
               <Input label="Table Name" placeholder="e.g. users" value="users" readOnly />
            </div>
            <div style={{ marginTop: 'var(--space-3)' }}>
              <Input 
                label="Description" 
                placeholder="Describe the purpose of this entity..." 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
              <Button variant="primary">Save Configuration</Button>
              <Button variant="secondary">Cancel</Button>
            </div>
          </Card>

          <Card title="System Preview" style={{ minHeight: '200px', display: 'flex', flexDirection: 'column' }}>
             <div style={{ 
               flex: 1, 
               display: 'flex', 
               alignItems: 'center', 
               justifyContent: 'center', 
               border: '2px dashed var(--color-border)', 
               borderRadius: 'var(--radius-sm)',
               backgroundColor: 'var(--color-surface-secondary)',
               margin: 'var(--space-1) 0'
             }}>
                <span style={{ color: 'var(--color-text-tertiary)' }}>Visual preview will appear here</span>
             </div>
          </Card>
        </div>
      </div>

      {/* Secondary Panel (30%) */}
      <div style={{
        flex: '0 0 30%',
        padding: 'var(--space-3)',
        backgroundColor: 'var(--color-surface)',
        overflowY: 'auto'
      }}>
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-2)' }}>
            Step Explanation
          </h4>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>
            In this step, you are defining the schema for your database. The system will automatically generate migrations based on this config.
          </p>
        </div>

        <div style={{ marginBottom: 'var(--space-4)' }}>
           <h4 style={{ fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-2)' }}>
            AI Assistant
          </h4>
          <div style={{ 
            backgroundColor: 'var(--color-surface-secondary)', 
            padding: 'var(--space-2)', 
            borderRadius: 'var(--radius-md)', 
            fontSize: '13px', 
            color: 'var(--color-text-primary)',
            border: '1px solid var(--color-border)',
            marginBottom: 'var(--space-2)'
          }}>
            Try adding a field called "isActive" directly to the schema if you need soft deletes.
          </div>
           <Button variant="secondary" style={{ width: '100%', justifyContent: 'center' }}>Copy Prompt</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
           <Button variant="secondary" style={{ width: '100%', justifyContent: 'center' }}>Build in Lovable</Button>
           <Button variant="secondary" style={{ width: '100%', justifyContent: 'center' }}>It Worked</Button>
           <Button variant="secondary" style={{ width: '100%', justifyContent: 'center', borderColor: 'var(--color-warning)', color: 'var(--color-warning)' }}>Error Reporting</Button>
        </div>
      </div>
    </AppLayout>
  );
}

export default App;
