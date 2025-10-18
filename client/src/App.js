import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import Dashboard from './components/Dashboard';
import './App.css';

const AuthPage = () => {
  const [mode, setMode] = useState('login'); // 'login', 'register', 'forgot'
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  const handleForgotPassword = () => {
    setMode('forgot');
  };

  const handleBackToLogin = () => {
    setMode('login');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {mode === 'login' && (
          <LoginForm 
            onToggleMode={handleToggleMode} 
            onForgotPassword={handleForgotPassword}
          />
        )}
        {mode === 'register' && (
          <RegisterForm onToggleMode={handleToggleMode} />
        )}
        {mode === 'forgot' && (
          <ForgotPasswordForm onBack={handleBackToLogin} />
        )}
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return user ? children : <Navigate to="/" replace />;
};

const AppContent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route path="/reset-password" element={<ResetPasswordForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;