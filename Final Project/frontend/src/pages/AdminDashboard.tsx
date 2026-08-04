import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { BookOpen, LogOut, PlusCircle, Upload, CheckCircle, List, FileText, Check, Trash2, Clock, Users, Database } from 'lucide-react';
import './AdminDashboard.css';

interface Material {
  id: string;
  title: string;
  description: string;
  category: string;
  branch: string;
  semester: string;
  subject_code: string;
  drive_link: string;
  created_at: string;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upload' | 'pending'>('pending');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [pendingMaterials, setPendingMaterials] = useState<Material[]>([]);
  const [allMaterialsCount, setAllMaterialsCount] = useState(0);
  const [fetchingPending, setFetchingPending] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Lab Manual',
    branch: '',
    semester: '',
    subjectCode: '',
    examSession: 'Summer',
    driveLink: '',
    imageLink: ''
  });

  const fetchPendingMaterials = async () => {
    setFetchingPending(true);
    try {
      const res = await fetch('http://localhost:5000/api/materials');
      const data = await res.json();
      if (Array.isArray(data)) {
        const pending = data.filter((item: Material) => item.title.startsWith('[PENDING]'));
        setPendingMaterials(pending);
        setAllMaterialsCount(data.length - pending.length);
      }
    } catch (err) {
      console.error("Failed to fetch pending materials");
    } finally {
      setFetchingPending(false);
    }
  };

  useEffect(() => {
    fetchPendingMaterials();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');

      const token = await user.getIdToken();

      let finalSemester = formData.semester;
      if (formData.category === 'Question Paper' || formData.category === 'Model Answer') {
        finalSemester = `${formData.semester} (${formData.examSession})`;
      }

      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        branch: formData.branch,
        semester: finalSemester,
        subjectCode: formData.subjectCode,
        driveLink: formData.driveLink,
        imageLink: formData.imageLink
      };

      const response = await fetch('http://localhost:5000/api/materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add material');
      }

      setSuccess(true);
      setFormData({
        title: '',
        description: '',
        category: 'Lab Manual',
        branch: '',
        semester: '',
        subjectCode: '',
        examSession: 'Summer',
        driveLink: '',
        imageLink: ''
      });
      fetchPendingMaterials();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, currentTitle: string) => {
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();

      const response = await fetch(`http://localhost:5000/api/materials/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title: currentTitle })
      });

      if (!response.ok) throw new Error('Failed to approve');
      fetchPendingMaterials();
    } catch (err) {
      alert(err);
    }
  };

  const handleReject = async (id: string) => {
    if (!window.confirm("Are you sure you want to reject and delete this material?")) return;
    try {
      const user = auth.currentUser;
      if (!user) throw new Error('Not authenticated');
      const token = await user.getIdToken();

      const response = await fetch(`http://localhost:5000/api/materials/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to reject');
      fetchPendingMaterials();
    } catch (err) {
      alert(err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="admin-wrapper" style={{ minHeight: '100vh', backgroundColor: '#f8fafc', paddingBottom: '3rem' }}>
      <header className="admin-header" style={{ backgroundColor: 'white', borderBottom: '1px solid var(--border-color)', padding: '1rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ backgroundColor: 'var(--primary-color)', color: 'white', padding: '0.5rem', borderRadius: '0.5rem' }}>
              <BookOpen size={24} />
            </div>
            <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700, color: '#1e293b' }}>Admin Portal</h1>
          </div>
          <button className="btn btn-outline" style={{ color: '#ef4444', borderColor: '#fee2e2' }} onClick={handleLogout}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <main className="container" style={{ marginTop: '2rem' }}>
        {/* Stats Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '1rem', borderRadius: '0.75rem' }}>
              <Clock size={28} />
            </div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Pending Approvals</p>
              <h3 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>{pendingMaterials.length}</h3>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ backgroundColor: '#e0e7ff', color: 'var(--primary-color)', padding: '1rem', borderRadius: '0.75rem' }}>
              <Database size={28} />
            </div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Total Active Materials</p>
              <h3 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>{allMaterialsCount}</h3>
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '1rem', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '1rem', borderRadius: '0.75rem' }}>
              <Users size={28} />
            </div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>Total Students</p>
              <h3 style={{ margin: 0, fontSize: '1.75rem', fontWeight: 700, color: '#1e293b' }}>Live</h3>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <button 
            onClick={() => setActiveTab('pending')}
            style={{ padding: '0.75rem 1.5rem', background: 'none', border: 'none', borderBottom: activeTab === 'pending' ? '3px solid var(--primary-color)' : '3px solid transparent', color: activeTab === 'pending' ? 'var(--primary-color)' : 'var(--text-secondary)', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <List size={18} /> Review Pending ({pendingMaterials.length})
          </button>
          <button 
            onClick={() => setActiveTab('upload')}
            style={{ padding: '0.75rem 1.5rem', background: 'none', border: 'none', borderBottom: activeTab === 'upload' ? '3px solid var(--primary-color)' : '3px solid transparent', color: activeTab === 'upload' ? 'var(--primary-color)' : 'var(--text-secondary)', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <PlusCircle size={18} /> Upload Directly
          </button>
        </div>

        {activeTab === 'pending' && (
          <div style={{ backgroundColor: 'white', borderRadius: '1rem', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>Student Submissions Awaiting Approval</h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Review and approve documents submitted by students.</p>
            </div>
            <div style={{ padding: '1.5rem' }}>
              {fetchingPending ? (
                <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>Loading pending submissions...</p>
              ) : pendingMaterials.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
                  <CheckCircle size={48} style={{ color: '#10b981', margin: '0 auto 1rem', opacity: 0.2 }} />
                  <h3 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b' }}>All Caught Up!</h3>
                  <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)' }}>There are no pending materials to review right now.</p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                  {pendingMaterials.map(mat => (
                    <div key={mat.id} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: '0.75rem', backgroundColor: '#f8fafc' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <span style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: '#fef3c7', color: '#d97706', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                            {mat.category}
                          </span>
                          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', color: '#1e293b' }}>
                            {mat.title.replace('[PENDING]', '').trim()}
                          </h3>
                          <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, color: 'var(--primary-color)' }}>{mat.subject_code}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><BookOpen size={14} /> {mat.branch}</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><FileText size={14} /> {mat.semester}</span>
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button 
                            onClick={() => handleReject(mat.id)}
                            style={{ padding: '0.5rem 1rem', backgroundColor: 'white', border: '1px solid #fca5a5', color: '#ef4444', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}
                          >
                            <Trash2 size={16} /> Reject
                          </button>
                          <button 
                            onClick={() => handleApprove(mat.id, mat.title)}
                            style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', border: '1px solid #059669', color: 'white', borderRadius: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}
                          >
                            <Check size={16} /> Approve
                          </button>
                        </div>
                      </div>
                      <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
                        <a href={mat.drive_link} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', fontSize: '0.875rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          View Document Link &rarr;
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'upload' && (
          <div style={{ backgroundColor: 'white', borderRadius: '1rem', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#1e293b' }}>Upload Material Directly</h2>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Items uploaded here bypass the review process and go live instantly.</p>
            </div>
            <div style={{ padding: '1.5rem' }}>
              <form onSubmit={handleSubmit} className="admin-form">
                {error && <div className="alert-error">{error}</div>}
                {success && <div className="alert-success"><CheckCircle size={18} /> Material published instantly!</div>}

                <div className="form-grid">
                  <div className="form-group">
                    <label>Title *</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="e.g. Data Structures Notes" />
                  </div>

                  <div className="form-group">
                    <label>Subject Code *</label>
                    <input type="text" name="subjectCode" value={formData.subjectCode} onChange={handleChange} required placeholder="e.g. 22412" />
                  </div>

                  <div className="form-group">
                    <label>Category *</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                      <option value="Lab Manual">Lab Manual</option>
                      <option value="Micro Project">Micro Project</option>
                      <option value="Question Paper">Question Paper</option>
                      <option value="Model Answer">Model Answer</option>
                      <option value="Manual Answer">Manual Answer</option>
                      <option value="Assignments">Assignments</option>
                      <option value="Notes">Notes</option>
                      <option value="MSBTE IMP">MSBTE IMP</option>
                      <option value="Lecture Videos">Lecture Videos</option>
                      <option value="Updates">Updates</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Branch *</label>
                    <select name="branch" value={formData.branch} onChange={handleChange} required>
                      <option value="" disabled>Select Branch</option>
                      <option value="Computer Engineering">Computer Engineering</option>
                      <option value="Information Technology">Information Technology</option>
                      <option value="Civil Engineering">Civil Engineering</option>
                      <option value="Mechanical Engineering">Mechanical Engineering</option>
                      <option value="Electrical Engineering">Electrical Engineering</option>
                      <option value="Electronics">Electronics</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Semester *</label>
                    <select name="semester" value={formData.semester} onChange={handleChange} required>
                      <option value="" disabled>Select Semester</option>
                      <option value="Semester 1">Semester 1</option>
                      <option value="Semester 2">Semester 2</option>
                      <option value="Semester 3">Semester 3</option>
                      <option value="Semester 4">Semester 4</option>
                      <option value="Semester 5">Semester 5</option>
                      <option value="Semester 6">Semester 6</option>
                    </select>
                  </div>

                  {(formData.category === 'Question Paper' || formData.category === 'Model Answer') && (
                    <div className="form-group">
                      <label>Exam Session *</label>
                      <select name="examSession" value={formData.examSession} onChange={handleChange} required>
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                      </select>
                    </div>
                  )}

                  <div className="form-group full-width">
                    <label>Google Drive Link *</label>
                    <input type="url" name="driveLink" value={formData.driveLink} onChange={handleChange} required placeholder="https://drive.google.com/..." />
                  </div>

                  <div className="form-group full-width">
                    <label>Thumbnail Image Link (Optional)</label>
                    <input type="url" name="imageLink" value={formData.imageLink} onChange={handleChange} placeholder="https://..." />
                  </div>

                  <div className="form-group full-width">
                    <label>Description (Optional)</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Add a brief description..." />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Publishing...' : <><Upload size={16} /> Publish Material</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
