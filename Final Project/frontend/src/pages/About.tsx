import { BookOpen, GraduationCap, Users, Heart, Zap } from 'lucide-react';
import './Curriculum.css';

export function About() {
  return (
    <div className="material-page-wrapper" style={{ backgroundColor: 'white' }}>
      
      {/* Hero Section */}
      <div className="material-hero" style={{ padding: '6rem 0', textAlign: 'center', background: 'linear-gradient(to bottom, var(--surface-color), var(--primary-light))' }}>
        <div className="container">
          <div className="material-hero-content" style={{ margin: '0 auto', maxWidth: '900px' }}>
            <div className="badge" style={{ margin: '0 auto 1.5rem' }}>
              <span className="badge-dot"></span>
              Our Story & Mission
            </div>
            <h1 className="hero-title" style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
              Revolutionizing <span className="text-gradient">Polytechnic</span> Education
            </h1>
            <p className="hero-description" style={{ margin: '0 auto', fontSize: '1.25rem', color: 'var(--text-secondary)' }}>
              College Sahayak is Maharashtra's fastest-growing digital academic platform. We are dedicated to providing MSBTE diploma students with a centralized, high-quality, and completely free resource hub for all their academic needs.
            </p>
          </div>
        </div>
      </div>

      {/* The Story / Founder Section */}
      <div className="container" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: '800px', margin: '0 auto' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-primary)' }}>The Problem We're Solving</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              For years, diploma students across Maharashtra have struggled with scattered resources. Finding the right lab manuals, tracking down previous years' question papers, and getting inspiration for micro-projects meant scouring dozens of unorganized websites and WhatsApp groups. 
            </p>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
              We realized that students were spending more time searching for study materials than actually studying. The lack of a centralized platform was not just an inconvenience; it was a barrier to academic excellence.
            </p>
          </div>

          <div style={{ padding: '3rem', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-2xl)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', color: 'var(--primary-light)', opacity: 0.5 }}>
              <GraduationCap size={150} />
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--primary-color)', position: 'relative' }}>Meet the Founder</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem', position: 'relative' }}>
              College Sahayak was founded and developed by <strong>Yash</strong>, a passionate developer who experienced these academic hurdles first-hand. Recognizing the gap in digital infrastructure for MSBTE colleges, Yash set out to build a platform that wasn't just functional, but beautiful and lightning-fast.
            </p>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8, position: 'relative' }}>
              Driven by the belief that high-quality education should be accessible and organized, Yash coded College Sahayak from the ground up, integrating modern web technologies to ensure every student in Maharashtra has the tools they need to succeed at their fingertips.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values Grid */}
      <div style={{ backgroundColor: 'var(--bg-color)', padding: '5rem 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>Our Core Values</h2>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>The principles that drive everything we build.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            
            <div style={{ padding: '2rem', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', transition: 'transform 0.3s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '3.5rem', height: '3.5rem', backgroundColor: 'var(--primary-light)', color: 'var(--primary-color)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <BookOpen size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Comprehensive Resources</h3>
              <p style={{ color: 'var(--text-secondary)' }}>We meticulously organize thousands of lab manuals, micro-projects, and question papers by branch and semester so you never have to search twice.</p>
            </div>

            <div style={{ padding: '2rem', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', transition: 'transform 0.3s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '3.5rem', height: '3.5rem', backgroundColor: 'rgba(217, 119, 6, 0.1)', color: 'var(--secondary-color)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Zap size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Lightning Fast</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Time is precious during exams. Built on modern React and Node.js technologies, College Sahayak ensures instant page loads and zero lag.</p>
            </div>

            <div style={{ padding: '2rem', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', transition: 'transform 0.3s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '3.5rem', height: '3.5rem', backgroundColor: 'rgba(72, 187, 120, 0.1)', color: 'var(--success-color)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Community Driven</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Education is a collaborative effort. We encourage students to contribute their own projects, notes, and manuals to help peers succeed.</p>
            </div>

            <div style={{ padding: '2rem', backgroundColor: 'var(--surface-color)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', transition: 'transform 0.3s', cursor: 'default' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '3.5rem', height: '3.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger-color)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Heart size={28} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>Free Forever</h3>
              <p style={{ color: 'var(--text-secondary)' }}>We strongly believe that access to basic educational resources shouldn't come with a price tag. Our core materials will always remain free.</p>
            </div>

          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={{ position: 'relative', overflow: 'hidden', padding: '6rem 1.5rem', background: 'var(--primary-dark)' }}>
        {/* Decorative background elements */}
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--primary-light)', filter: 'blur(80px)', opacity: 0.1 }}></div>
        <div style={{ position: 'absolute', bottom: '-100px', right: '-100px', width: '300px', height: '300px', borderRadius: '50%', background: 'var(--secondary-color)', filter: 'blur(80px)', opacity: 0.15 }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '3rem', fontWeight: 800, color: 'white', marginBottom: '1rem' }}>Our Impact So Far</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
              We're growing rapidly to support diploma students everywhere.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            
            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '3rem 2rem', borderRadius: 'var(--radius-2xl)', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0.7))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>10k+</div>
              <div style={{ color: 'var(--secondary-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem' }}>Active Students</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '3rem 2rem', borderRadius: 'var(--radius-2xl)', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0.7))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>500+</div>
              <div style={{ color: 'var(--success-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem' }}>Lab Manuals</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '3rem 2rem', borderRadius: 'var(--radius-2xl)', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0.7))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>1.2k</div>
              <div style={{ color: '#93c5fd', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem' }}>Micro Projects</div>
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '3rem 2rem', borderRadius: 'var(--radius-2xl)', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '0.5rem', background: 'linear-gradient(to bottom, #fff, rgba(255,255,255,0.7))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>30+</div>
              <div style={{ color: 'var(--warning-color)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.875rem' }}>Colleges Linked</div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
