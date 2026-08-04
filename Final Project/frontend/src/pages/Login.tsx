import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';
import { auth, googleProvider } from '../lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import './Login.css';

const GoogleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginRight: '10px' }}>
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const syncUserToBackend = async (token: string) => {
    try {
      await fetch('http://localhost:5000/api/users/sync', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error('Failed to sync user to backend:', err);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      await syncUserToBackend(token);
      
      localStorage.setItem('mock_logged_in', 'true');
      if (result.user.email === 'yashdate31@gmail.com') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Google sign-in failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Log in to access your tasks, stay organized and get things done smarter."
      rightPaneImage="/logo1.png"
      rightPaneText={
        <>
          Stay on top of your academic<br/>tasks and deadlines<br/>with <span className="highlight">College Sahayak</span>
        </>
      }
    >
      {/* Error alert */}
      {error && (
        <div className="auth-alert error">
          <AlertCircle className="icon" />
          <p>{error}</p>
        </div>
      )}

      {/* Social Login Button */}
      <div className="social-login" style={{ marginTop: '2rem' }}>
        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="btn-primary auth-submit"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px', fontSize: '1.1rem', backgroundColor: '#fff', color: '#333', border: '1px solid #ddd' }}
          title="Sign in with Google"
        >
          {isLoading ? (
            <span className="spinner" style={{ borderColor: '#333', borderTopColor: 'transparent' }} />
          ) : (
            <>
              <GoogleIcon />
              Continue with Google
            </>
          )}
        </button>
      </div>

    </AuthLayout>
  );
}
