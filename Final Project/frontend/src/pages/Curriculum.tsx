import { Link } from 'react-router-dom';
import { GraduationCap, Search, Filter, BookOpen, Download, FileX } from 'lucide-react';
import './Curriculum.css';

// Remove dummy data
const mockSubjects: any[] = [];

export function Curriculum() {
  return (
    <div className="material-page-wrapper">
      
      {/* Hero Section */}
      <div className="material-hero">
        <div className="container">
          <div className="material-hero-content">
            <div className="badge">
              <span className="badge-dot"></span>
              Official MSBTE K-Scheme Curriculum
            </div>
            <h1 className="hero-title">
              MSBTE <span className="text-gradient">Curriculum</span>
            </h1>
            <p className="hero-description">
              Browse the official MSBTE curriculum for all diploma programmes. Search by subject code, name, branch, or semester. View course outcomes, units, practicals, and download the official curriculum.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container material-main">
        
        {/* Filters Sidebar */}
        <aside className="material-sidebar">
          <div className="filter-card">
            <div className="filter-header">
              <h3><Filter size={18} /> Filters</h3>
              <button className="clear-btn">Clear all</button>
            </div>
            
            <div className="filter-group">
              <label>Search</label>
              <div className="search-input">
                <Search size={16} />
                <input type="text" placeholder="Subject code or name..." />
              </div>
            </div>

            <div className="filter-group">
              <label>Programme</label>
              <select className="filter-select">
                <option value="">All Programmes</option>
                <option value="co">Computer Engineering (CO)</option>
                <option value="if">Information Technology (IF)</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Semester</label>
              <select className="filter-select">
                <option value="">All Semesters</option>
                <option value="1">1st Semester</option>
                <option value="2">2nd Semester</option>
                <option value="3">3rd Semester</option>
                <option value="4">4th Semester</option>
                <option value="5">5th Semester</option>
                <option value="6">6th Semester</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Results Area */}
        <main className="material-results">
          <div className="results-header">
            <span className="results-count">Showing {mockSubjects.length} subjects</span>
            
            <div className="sort-control">
              <label>Sort by:</label>
              <select>
                <option>Newest first</option>
                <option>A-Z</option>
              </select>
            </div>
          </div>

          {mockSubjects.length === 0 ? (
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
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>No subjects found</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '400px' }}>
                We couldn't find any curriculum subjects matching your filters. Please try adjusting your search criteria.
              </p>
            </div>
          ) : (
            <div className="cards-grid">
              {mockSubjects.map((subject) => (
                <div key={subject.id} className="subject-card">
                  <div className="card-header">
                    <div className="subject-code">{subject.code}</div>
                    <div className="subject-type">{subject.type}</div>
                  </div>
                  
                  <h3 className="subject-name">{subject.name}</h3>
                  
                  <div className="subject-meta">
                    <span className="meta-item">
                      <GraduationCap size={14} /> {subject.branch}
                    </span>
                    <span className="meta-item">
                      <BookOpen size={14} /> {subject.semester} Sem
                    </span>
                  </div>
                  
                  <div className="card-footer">
                    <span className="credits">{subject.credits} Credits</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link to={`/curriculum/${subject.id}`} className="btn btn-outline btn-sm" style={{ textDecoration: 'none' }}>
                        View Details
                      </Link>
                      <button className="btn btn-secondary btn-sm download-btn">
                        <Download size={14} /> PDF
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {mockSubjects.length > 0 && (
            <div className="pagination">
              <button className="page-btn" disabled>Previous</button>
              <div className="page-numbers">
                <button className="page-num active">1</button>
              </div>
              <button className="page-btn" disabled>Next</button>
            </div>
          )}
        </main>

      </div>
    </div>
  );
}
