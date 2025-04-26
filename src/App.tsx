import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import EmployerDashboard from './pages/EmployerDashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobseeker" element={<JobSeekerDashboard />} />
          <Route path="/employer" element={<EmployerDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;