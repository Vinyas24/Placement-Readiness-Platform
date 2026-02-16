import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';

const SkillRadarChart = () => {
  const data = [
    { skill: 'DSA', value: 75 },
    { skill: 'System Design', value: 60 },
    { skill: 'Communication', value: 80 },
    { skill: 'Resume', value: 85 },
    { skill: 'Aptitude', value: 70 }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={data}>
        <PolarGrid stroke="var(--color-border)" />
        <PolarAngleAxis 
          dataKey="skill" 
          tick={{ fill: 'var(--color-text-secondary)', fontSize: 12 }}
        />
        <PolarRadiusAxis 
          angle={90} 
          domain={[0, 100]}
          tick={{ fill: 'var(--color-text-tertiary)', fontSize: 10 }}
        />
        <Radar
          name="Skills"
          dataKey="value"
          stroke="var(--color-accent)"
          fill="var(--color-accent)"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default SkillRadarChart;
