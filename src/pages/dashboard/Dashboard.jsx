import React from 'react';
import Card from '../../components/ui/Card';
import CircularProgress from '../../components/dashboard/widgets/CircularProgress';
import SkillRadarChart from '../../components/dashboard/widgets/SkillRadarChart';
import ContinuePractice from '../../components/dashboard/widgets/ContinuePractice';
import WeeklyGoals from '../../components/dashboard/widgets/WeeklyGoals';
import UpcomingAssessments from '../../components/dashboard/widgets/UpcomingAssessments';

const Dashboard = () => {
  return (
    <div>
      <h1 style={{ 
        fontSize: '32px', 
        marginBottom: 'var(--space-4)',
        fontFamily: 'var(--font-heading)'
      }}>
        Dashboard
      </h1>
      
      {/* Responsive Grid Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: 'var(--space-4)'
      }}>
        {/* Overall Readiness */}
        <Card title="Overall Readiness" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: 'var(--space-4)'
        }}>
          <CircularProgress value={72} max={100} />
        </Card>

        {/* Skill Breakdown */}
        <Card title="Skill Breakdown">
          <SkillRadarChart />
        </Card>

        {/* Continue Practice */}
        <ContinuePractice />

        {/* Weekly Goals */}
        <WeeklyGoals />

        {/* Upcoming Assessments - spans full width on larger screens */}
        <div style={{ gridColumn: 'span 1' }}>
          <UpcomingAssessments />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
