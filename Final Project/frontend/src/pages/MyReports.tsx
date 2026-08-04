import { useState } from 'react';
import { FolderOpen, Search, Upload, Clock, FileText, Download, Trash2, Edit, ChevronRight, FileX } from 'lucide-react';
import { ReportUploadModal } from '../components/ReportUploadModal';
import './Curriculum.css'; // Reusing material layout styles

const mockReports: any[] = [];

const FOLDERS = [
  { id: 'all', name: 'All Documents', icon: FolderOpen },
  { id: 'micro', name: 'Micro-Projects', icon: FileText },
  { id: 'lab', name: 'Lab Manuals', icon: FileText },
  { id: 'recent', name: 'Recent Uploads', icon: Clock },
  { id: 'trash', name: 'Trash', icon: Trash2 },
];

export function MyReports() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [activeFolder, setActiveFolder] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="material-page-wrapper">
      <div className="material-hero">
        <div className="container">
          <div className="material-hero-content">
            <div className="badge">
              <span className="badge-dot"></span>
              Personal Workspace
            </div>
            <h1 className="hero-title">
              My <span className="text-gradient">Documents</span>
            </h1>
            <p className="hero-description">
              Manage all your personal academic reports, micro-project submissions, and custom notes in one secure place.
            </p>
            <div style={{ marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={() => setIsUploadOpen(true)}>
                <Upload size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Upload Document
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <ReportUploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />

      <div className="container material-main">
        <aside className="material-sidebar">
          <div className="filter-card" style={{ padding: '1.25rem' }}>
            <div className="filter-header" style={{ marginBottom: '1rem' }}>
              <h3 style={{ fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-secondary)' }}>My Folders</h3>
            </div>
            
            <div className="filter-group">
              <div className="search-input" style={{ marginBottom: '1.5rem' }}>
                <Search size={16} />
                <input 
                  type="text" 
                  placeholder="Search files..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {FOLDERS.map((folder) => {
                const Icon = folder.icon;
                const isActive = activeFolder === folder.id;
                
                return (
                  <li key={folder.id}>
                    <button 
                      onClick={() => setActiveFolder(folder.id)}
                      style={{ 
                        width: '100%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'space-between',
                        padding: '0.75rem 1rem',
                        border: 'none', 
                        borderRadius: 'var(--radius-md)',
                        background: isActive ? 'rgba(37,99,235,0.08)' : 'transparent',
                        color: isActive ? 'var(--primary-color)' : 'var(--text-secondary)',
                        fontWeight: isActive ? 600 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Icon size={18} style={{ opacity: isActive ? 1 : 0.7 }} /> 
                        {folder.name}
                      </div>
                      {isActive && <ChevronRight size={16} />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        <main className="material-results">
          <div className="results-header">
            <span className="results-count">{mockReports.length} documents</span>
            <div className="sort-control">
              <label>Sort by:</label>
              <select>
                <option>Last Modified</option>
                <option>Name A-Z</option>
                <option>Size</option>
              </select>
            </div>
          </div>

          {mockReports.length === 0 ? (
            <div className="empty-state" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center',
              padding: '4rem 2rem',
              background: 'var(--surface-color)',
              borderRadius: 'var(--radius-xl)',
              border: '1px dashed var(--border-color)',
              marginTop: '1rem',
              textAlign: 'center'
            }}>
              <div style={{ 
                width: '64px', 
                height: '64px', 
                borderRadius: '50%', 
                background: 'rgba(37,99,235,0.1)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                color: 'var(--primary-color)',
                marginBottom: '1.5rem'
              }}>
                <FileX size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No documents found</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '400px' }}>
                You haven't uploaded any documents in this folder yet. Upload your first file to get started!
              </p>
              <button className="btn btn-primary" onClick={() => setIsUploadOpen(true)}>
                <Upload size={18} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Upload Document
              </button>
            </div>
          ) : (
            <div className="cards-grid">
              {mockReports.map((report) => (
                <div key={report.id} className="subject-card">
                  <div className="card-header">
                    <div className="subject-code"><FileText size={14} style={{ display: 'inline', marginRight: '4px' }} /> Document</div>
                    <div className="subject-type" style={{ 
                      color: report.status === 'Completed' ? 'var(--success-color)' : 
                             report.status === 'In Progress' ? 'var(--warning-color)' : 'var(--text-tertiary)' 
                    }}>
                      {report.status}
                    </div>
                  </div>
                  
                  <h3 className="subject-name">{report.title}</h3>
                  
                  <div className="subject-meta">
                    <span className="meta-item">
                      <FolderOpen size={14} /> {report.subject}
                    </span>
                    <span className="meta-item">
                      <Clock size={14} /> {report.date}
                    </span>
                  </div>
                  
                  <div className="card-footer" style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline btn-sm download-btn" style={{ flex: 1, justifyContent: 'center' }}>
                      <Download size={14} /> Download
                    </button>
                    <button className="btn btn-outline btn-sm btn-icon" style={{ color: 'var(--text-secondary)' }} title="Edit">
                      <Edit size={14} />
                    </button>
                    <button className="btn btn-outline btn-sm btn-icon" style={{ color: 'var(--danger-color)', borderColor: 'rgba(239, 68, 68, 0.2)' }} title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
