import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './LoginForm.css';

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setError('Invalid reset token');
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    const result = await resetPassword(token, newPassword);
    
    if (result.success) {
      setMessage('Password reset successfully! You can now sign in with your new password.');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  if (!token) {
    return (
      <div className="auth-form">
        <h2>Invalid Reset Link</h2>
        <div className="error-message">This password reset link is invalid or has expired.</div>
        <button 
          type="button" 
          className="submit-btn" 
          onClick={() => navigate('/')}
        >
          Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="auth-form">
      <h2>Reset Password</h2>
      <p className="forgot-password-text">
        Enter your new password below.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Enter new password (min 6 characters)"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm new password"
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {message && <div className="success-message">{message}</div>}

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <div className="form-links">
        <button 
          type="button" 
          className="link-btn" 
          onClick={() => navigate('/')}
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
