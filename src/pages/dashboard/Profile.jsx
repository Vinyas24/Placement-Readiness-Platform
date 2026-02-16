import React from 'react';
import Card from '../../components/ui/Card';

const Profile = () => {
  return (
    <div>
      <h1 style={{ fontSize: '32px', marginBottom: 'var(--space-3)' }}>Profile</h1>
      <Card>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Your profile information will appear here.
        </p>
      </Card>
    </div>
  );
};

export default Profile;
