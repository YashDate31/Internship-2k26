import { useState } from 'react';
import { FolderOpen, Search, Upload, Clock, FileText, Download, Trash2, Edit } from 'lucide-react';
import { ReportUploadModal } from '../components/ReportUploadModal';
import './Curriculum.css'; // Reusing material layout styles

const mockReports = [
  { id: '1', title: 'Data Structures Microproject', subject: 'Data Structures', date: '2023-10-15', status: 'Completed', size: '2.1 MB' },
  { id: '2', title: 'Java Lab Manual Ex. 1-10', subject: 'Java Programming', date: '2023-11-02', status: 'In Progress', size: '1.5 MB' },
  { id: '3', title: 'Web Development Mini Project', subject: 'Web Development', date: '2023-11-20', status: 'Draft', size: '500 KB' },
];

export function MyReports() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

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
              <button className="btn-primary" onClick={() => setIsUploadOpen(true)}>
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
          <div className="filter-card">
            <div className="filter-header">
              <h3><FolderOpen size={18} /> Folders</h3>
            </div>
            
            <div className="filter-group">
              <div className="search-input">
                <Search size={16} />
                <input type="text" placeholder="Search documents..." />
              </div>
            </div>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              <li>
                <button className="btn-outline sm" style={{ width: '100%', justifyContent: 'flex-start', border: 'none', background: 'rgba(37,99,235,0.1)' }}>
                  <FolderOpen size={16} style={{ marginRight: '0.5rem' }} /> All Documents
                </button>
              </li>
              <li>
                <button className="btn-outline sm" style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}>
                  <FileText size={16} style={{ marginRight: '0.5rem' }} /> Micro-Projects
                </button>
              </li>
              <li>
                <button className="btn-outline sm" style={{ width: '100%', justifyContent: 'flex-start', border: 'none' }}>
                  <Clock size={16} style={{ marginRight: '0.5rem' }} /> Recent Uploads
                </button>
              </li>
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
              </select>
            </div>
          </div>

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
        </main>
      </div>
    </div>
  );
}
