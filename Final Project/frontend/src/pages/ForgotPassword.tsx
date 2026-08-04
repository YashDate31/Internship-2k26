import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, AlertCircle, CheckCircle2, ArrowLeft } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';
import './Login.css'; // Reusing base auth styles
import './ForgotPassword.css';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSent(true);
    }, 1000);
  };

  if (sent) {
    return (
      <AuthLayout
        title="Check your inbox 📬"
        subtitle="Password reset link sent"
        rightPaneImage="/logo1.png"
        rightPaneText={<>Get back on track with<br/><span className="highlight">College Sahayak</span></>}
      >
        <div className="success-card">
          <div className="success-icon-wrapper">
            <CheckCircle2 size={40} className="success-icon" />
          </div>
          <div className="success-text">
            <p className="primary">
              We've sent a password reset link to <br/>
              <span className="highlight">{email}</span>
            </p>
            <p className="secondary">
              Click the link in the email to set a new password. The link will expire in 1 hour.
            </p>
          </div>
          <div className="success-tip">
            <strong>Tip:</strong> If you don't see it, check your <strong>spam or junk folder</strong>.
          </div>
          <button
            type="button"
            onClick={() => { setSent(false); setEmail(''); }}
            className="btn-outline auth-submit mt-4"
          >
            Try a different email
          </button>
          <div className="back-link-wrapper" style={{ marginTop: '2rem' }}>
            <Link to="/login" className="back-link">
              <ArrowLeft size={16} />
              Back to Sign In
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your email and we'll send you a reset link"
      rightPaneImage="/logo1.png"
      rightPaneText={<>Get back on track with<br/><span className="highlight">College Sahayak</span></>}
    >
      {error && (
        <div className="auth-alert error">
          <AlertCircle className="icon" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="auth-form" noValidate>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label htmlFor="forgot-email" className="auth-label">Email Address</label>
          <div className="input-wrapper mt-1">
            <div className="input-icon">
              <Mail size={18} />
            </div>
            <input
              id="forgot-email"
              type="email"
              autoComplete="email"
              className="auth-input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary auth-submit group"
        >
          {isLoading ? (
            <>
              <span className="spinner" />
              Sending reset link…
            </>
          ) : (
            <>
              Send Reset Link
              <ArrowRight size={18} className="arrow-icon" />
            </>
          )}
        </button>
      </form>

      <div className="back-link-wrapper" style={{ marginTop: '2.5rem' }}>
        <Link to="/login" className="back-link">
          <ArrowLeft size={16} />
          Back to Sign In
        </Link>
      </div>
    </AuthLayout>
  );
}
