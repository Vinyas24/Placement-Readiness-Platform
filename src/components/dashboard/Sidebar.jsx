import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Code, FileText, BookOpen, User } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/dashboard/practice', label: 'Practice', icon: Code },
    { path: '/dashboard/assessments', label: 'Assessments', icon: FileText },
    { path: '/dashboard/history', label: 'History', icon: BookOpen },
    { path: '/dashboard/resources', label: 'Resources', icon: BookOpen },
    { path: '/dashboard/profile', label: 'Profile', icon: User }
  ];

  return (
    <aside style={{
      width: '240px',
      backgroundColor: 'var(--color-surface)',
      borderRight: '1px solid var(--color-border)',
      padding: 'var(--space-3)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-1)'
    }}>
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/dashboard'}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-2)',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
              backgroundColor: isActive ? 'var(--color-background)' : 'transparent',
              fontWeight: isActive ? 600 : 400,
              fontSize: '14px',
              transition: 'all var(--transition-fast)'
            })}
          >
            <Icon size={20} />
            {item.label}
          </NavLink>
        );
      })}
    </aside>
  );
};

export default Sidebar;
