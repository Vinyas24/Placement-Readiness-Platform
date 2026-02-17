import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from './pages/dashboard/Dashboard';
import Practice from './pages/dashboard/Practice';
import Assessments from './pages/dashboard/Assessments';
import Resources from './pages/dashboard/Resources';
import Profile from './pages/dashboard/Profile';
import Results from './pages/dashboard/Results';
import History from './pages/dashboard/History';
import TestChecklist from './pages/prp/TestChecklist';
import Ship from './pages/prp/Ship';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="results" element={<Results />} />
          <Route path="history" element={<History />} />
          <Route path="practice" element={<Practice />} />
          <Route path="assessments" element={<Assessments />} />
          <Route path="resources" element={<Resources />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/prp/07-test" element={<TestChecklist />} />
        <Route path="/prp/08-ship" element={<Ship />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
