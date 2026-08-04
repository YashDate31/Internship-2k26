import { Link } from 'react-router-dom';
import { GraduationCap, Search, Filter, BookOpen, Download } from 'lucide-react';
import './Curriculum.css';

// Mock data for UI demonstration
const mockSubjects = [
  { id: '1', code: '22810', name: 'Software Engineering', branch: 'Computer', semester: '5th', credits: 4, type: 'Theory' },
  { id: '2', code: '22811', name: 'Database Management', branch: 'Computer', semester: '3rd', credits: 4, type: 'Theory & Practical' },
  { id: '3', code: '22812', name: 'Web Development', branch: 'Information Technology', semester: '4th', credits: 6, type: 'Practical' },
  { id: '4', code: '22813', name: 'Data Structures', branch: 'Computer', semester: '3rd', credits: 5, type: 'Theory & Practical' },
  { id: '5', code: '22814', name: 'Operating Systems', branch: 'Computer', semester: '4th', credits: 4, type: 'Theory' },
  { id: '6', code: '22815', name: 'Computer Networks', branch: 'Information Technology', semester: '5th', credits: 5, type: 'Theory & Practical' },
];

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

          {/* Pagination */}
          <div className="pagination">
            <button className="page-btn" disabled>Previous</button>
            <div className="page-numbers">
              <button className="page-num active">1</button>
              <button className="page-num">2</button>
              <button className="page-num">3</button>
            </div>
            <button className="page-btn">Next</button>
          </div>
        </main>

      </div>
    </div>
  );
}
