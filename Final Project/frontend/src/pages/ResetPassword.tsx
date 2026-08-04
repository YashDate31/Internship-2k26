import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Eye, EyeOff, AlertCircle, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';
import './Login.css'; // Reusing base auth styles
import './ResetPassword.css';

function getPasswordStrength(password: string): { level: number; label: string; color: string } {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score === 0 || password.length === 0) return { level: 0, label: '', color: '' };
  if (score === 1) return { level: 1, label: 'Weak', color: '#ef4444' };
  if (score === 2) return { level: 2, label: 'Fair', color: '#f97316' };
  if (score === 3) return { level: 3, label: 'Good', color: '#eab308' };
  return { level: 4, label: 'Strong', color: '#22c55e' };
}

const strengthWidths = ['0%', '25%', '50%', '75%', '100%'];
const strengthColors = ['', 'var(--danger-color)', 'var(--warning-color)', 'var(--warning-color)', 'var(--success-color)'];

export function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  
  // For UI mockup purposes, we'll assume they have a valid token
  const hasToken = true; 

  const navigate = useNavigate();
  const strength = getPasswordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Please enter a new password.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (strength.level < 2) {
      setError('Please choose a stronger password (mix uppercase, numbers, and symbols).');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
    }, 1000);
  };

  if (success) {
    return (
      <AuthLayout title="Password updated! 🎉" subtitle="Your account is now secured" rightPaneImage="/logo1.png" rightPaneText={<>Security first with<br/><span className="highlight">College Sahayak</span></>}>
        <div className="success-card">
          <div className="success-icon-wrapper">
            <ShieldCheck size={40} className="success-icon" />
          </div>
          <div className="success-text">
            <p className="primary">Your password has been successfully updated.</p>
            <p className="secondary">You can now sign in with your new password.</p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="btn-primary auth-submit mt-4 group"
          >
            Continue to Sign In
            <ArrowRight size={18} className="arrow-icon" />
          </button>
        </div>
      </AuthLayout>
    );
  }

  if (!hasToken) {
    return (
      <AuthLayout title="Invalid reset link" subtitle="This link may have expired" rightPaneImage="/logo1.png" rightPaneText={<>Oops! Let's try again</>}>
        <div className="success-card">
          <div className="success-icon-wrapper" style={{ backgroundColor: 'var(--warning-light)' }}>
            <AlertCircle size={40} style={{ color: 'var(--warning-color)' }} />
          </div>
          <div className="success-text">
            <p className="primary">This password reset link is invalid or has expired.</p>
            <p className="secondary">Reset links expire after 1 hour for security.</p>
          </div>
          <button
            onClick={() => navigate('/forgot-password')}
            className="btn-primary auth-submit mt-4 group"
          >
            Request New Reset Link
            <ArrowRight size={18} className="arrow-icon" />
          </button>
          <div className="back-link-wrapper mt-4">
            <Link to="/login" className="back-link">Back to Sign In</Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Set new password"
      subtitle="Create a strong, unique password for your account"
      rightPaneImage="/logo1.png"
      rightPaneText={<>Keep your account safe<br/>and secure</>}
    >
      {error && (
        <div className="auth-alert error">
          <AlertCircle className="icon" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        {/* New password */}
        <div className="form-group mb-4">
          <label htmlFor="reset-password" className="auth-label">New Password</label>
          <div className="input-wrapper mt-1">
            <div className="input-icon">
              <Lock size={18} />
            </div>
            <input
              id="reset-password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className="auth-input"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="password-toggle"
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {/* Strength meter */}
          {password && (
            <div className="strength-meter">
              <div className="strength-bar-bg">
                <div
                  className="strength-bar-fill"
                  style={{
                    width: strengthWidths[strength.level],
                    backgroundColor: strengthColors[strength.level],
                  }}
                />
              </div>
              <p className="strength-text" style={{ color: strengthColors[strength.level] }}>
                {strength.label} password
              </p>
            </div>
          )}
        </div>

        {/* Confirm password */}
        <div className="form-group mb-4">
          <label htmlFor="reset-confirm-password" className="auth-label">Confirm New Password</label>
          <div className="input-wrapper mt-1">
            <div className="input-icon">
              <Lock size={18} />
            </div>
            <input
              id="reset-confirm-password"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className="auth-input"
              placeholder="Repeat your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="password-toggle"
            >
              {showConfirmPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>
          {confirmPassword && password === confirmPassword && (
            <p className="match-text">
              <CheckCircle2 size={12} /> Passwords match
            </p>
          )}
        </div>

        <div className="password-reqs">
          <p className="reqs-title">Password requirements:</p>
          <ul className="reqs-list">
            <li className={password.length >= 8 ? 'valid' : ''}>✓ At least 8 characters</li>
            <li className={/[A-Z]/.test(password) ? 'valid' : ''}>✓ One uppercase letter</li>
            <li className={/[0-9]/.test(password) ? 'valid' : ''}>✓ One number</li>
            <li className={/[^A-Za-z0-9]/.test(password) ? 'valid' : ''}>✓ One special character</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary auth-submit group mt-4"
        >
          {isLoading ? (
            <>
              <span className="spinner" />
              Updating password…
            </>
          ) : (
            <>
              Update Password
              <ArrowRight size={18} className="arrow-icon" />
            </>
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
