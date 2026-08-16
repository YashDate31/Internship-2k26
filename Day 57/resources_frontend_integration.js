// Day 57: Frontend Resource Loader & Sidebar Integration
import React, { useState, useEffect } from 'react';

const ResourcePortal = () => {
    const [selectedType, setSelectedType] = useState('Syllabus');
    const [resources, setResources] = useState([]);

    useEffect(() => {
        // Fetch resources for selected category
        fetch(`/api/resources/filter?type=${encodeURIComponent(selectedType)}`)
            .then(res => res.json())
            .then(data => setResources(data.resources || []))
            .catch(err => console.error(err));
    }, [selectedType]);

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <aside style={{ width: '250px', background: '#2c3e50', color: '#fff', padding: '20px' }}>
                <h3>College Sahayak</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {['Syllabus', 'Unit Notes', 'Lab Manuals', 'Question Papers'].map(t => (
                        <li key={t} onClick={() => setSelectedType(t)} style={{ padding: '10px', cursor: 'pointer', background: selectedType === t ? '#3498db' : 'transparent' }}>
                            {t}
                        </li>
                    ))}
                </ul>
            </aside>

            {/* Main Section */}
            <main style={{ flex: 1, padding: '30px', background: '#ecf0f1' }}>
                <h2>Category: {selectedType}</h2>
                <div className="grid">
                    {resources.map(r => (
                        <div key={r.id} style={{ background: 'white', padding: '15px', borderRadius: '6px', marginBottom: '10px' }}>
                            <h4>{r.title}</h4>
                            <p>Format: {r.format}</p>
                            <button style={{ background: '#27ae60', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px' }}>Download Resource</button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ResourcePortal;
