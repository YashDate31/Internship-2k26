import { useEffect, useState } from 'react';
import { User, Mail, Phone, Building2, Edit2, Shield } from 'lucide-react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './Profile.css';

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setFirebaseUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>Loading...</div>;
  }

  // Use real data or fallback
  const user = {
    firstName: firebaseUser?.displayName?.split(' ')[0] || 'Student',
    lastName: firebaseUser?.displayName?.split(' ')[1] || '',
    email: firebaseUser?.email || 'Not provided',
    role: firebaseUser?.email === 'yashdate31@gmail.com' ? 'admin' : 'student',
    mobile: 'Add mobile number',
    college: 'Add your college'
  };

  const initials = firebaseUser?.displayName 
    ? `${user.firstName[0] || ''}${user.lastName[0] || ''}` 
    : (firebaseUser?.email ? firebaseUser.email[0].toUpperCase() : 'U');

  return (
    <div className="profile-page">
      <div className="profile-container">
        
        <div className="profile-header">
          <h1>My Profile</h1>
          <p>Manage your personal information and account settings.</p>
        </div>

        <div className="profile-card">
          <div className="profile-cover"></div>
          
          <div className="profile-avatar-wrapper">
            <div className="profile-avatar">
              {initials}
            </div>
          </div>

          <div className="profile-info">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 className="profile-name">
                  {user.firstName} {user.lastName}
                  <span className="profile-role-badge">{user.role}</span>
                </h2>
                <p className="profile-email">{user.email}</p>
              </div>
              <button 
                className="btn-outline sm" 
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit2 size={16} style={{ marginRight: '0.5rem' }} />
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>

            <div className="profile-details-grid">
              
              <div className="detail-group">
                <span className="detail-label">Full Name</span>
                <div className="detail-value">
                  <User size={18} className="detail-icon" />
                  {isEditing ? (
                    <input type="text" className="auth-input" defaultValue={`${user.firstName} ${user.lastName}`} style={{ padding: '0.25rem' }} />
                  ) : (
                    <span>{user.firstName} {user.lastName}</span>
                  )}
                </div>
              </div>

              <div className="detail-group">
                <span className="detail-label">Email Address</span>
                <div className="detail-value">
                  <Mail size={18} className="detail-icon" />
                  <span style={{ color: 'var(--text-secondary)' }}>{user.email}</span>
                </div>
                {isEditing && <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Email cannot be changed</span>}
              </div>

              <div className="detail-group">
                <span className="detail-label">Mobile Number</span>
                <div className="detail-value">
                  <Phone size={18} className="detail-icon" />
                  {isEditing ? (
                    <input type="tel" className="auth-input" defaultValue={user.mobile} style={{ padding: '0.25rem' }} />
                  ) : (
                    <span>+91 {user.mobile}</span>
                  )}
                </div>
              </div>

              <div className="detail-group">
                <span className="detail-label">College / Institution</span>
                <div className="detail-value">
                  <Building2 size={18} className="detail-icon" />
                  {isEditing ? (
                    <input type="text" className="auth-input" defaultValue={user.college} style={{ padding: '0.25rem' }} />
                  ) : (
                    <span>{user.college}</span>
                  )}
                </div>
              </div>

            </div>

            {isEditing && (
              <div className="profile-actions">
                <button className="btn-primary" onClick={() => setIsEditing(false)}>Save Changes</button>
              </div>
            )}
            
            {!isEditing && (
              <div className="profile-actions" style={{ marginTop: '2rem', flexWrap: 'wrap', gap: '1rem', display: 'flex', alignItems: 'center' }}>
                <button className="btn-outline sm" style={{ color: 'var(--text-secondary)' }}>
                  <Shield size={16} style={{ marginRight: '0.5rem' }} />
                  Change Password
                </button>
                <button 
                  className="btn-outline sm" 
                  style={{ color: 'var(--danger-color)', borderColor: 'rgba(239, 68, 68, 0.2)', marginLeft: 'auto' }}
                  onClick={async () => {
                    localStorage.removeItem('mock_logged_in');
                    await import('firebase/auth').then(({ signOut }) => signOut(auth));
                    window.location.href = '/login';
                  }}
                >
                  Logout
                </button>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
