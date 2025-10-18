import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Your Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      
      <div className="dashboard-content">
        <div className="welcome-card">
          <h2>Hello {user?.email}!</h2>
          <p>You have successfully signed in to your account.</p>
          <div className="user-info">
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>User ID:</strong> {user?.id}</p>
            <p><strong>Member since:</strong> {new Date(user?.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="dashboard-features">
          <h3>Features Available:</h3>
          <ul>
            <li>✅ Secure authentication with JWT</li>
            <li>✅ Email-based login</li>
            <li>✅ Password reset functionality</li>
            <li>✅ User profile management</li>
            <li>✅ Protected routes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
