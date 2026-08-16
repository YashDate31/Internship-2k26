// Day 63: Resources Frontend Integration & Sidebar Component (5 Aug 2026)
import React, { useState, useEffect } from 'react';

const ResourcePortal = () => {
    const [selectedType, setSelectedType] = useState('Syllabus');
    const [resources, setResources] = useState([]);

    useEffect(() => {
        fetch(`/api/resources/filter?type=${encodeURIComponent(selectedType)}`)
            .then(res => res.json())
            .then(data => setResources(data.resources || []))
            .catch(err => console.error(err));
    }, [selectedType]);

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <aside style={{ width: '250px', background: '#2c3e50', color: '#fff', padding: '20px' }}>
                <h3>College Sahayak</h3>
                <ul>
                    {['Syllabus', 'Unit Notes', 'Lab Manuals', 'Question Papers'].map(t => (
                        <li key={t} onClick={() => setSelectedType(t)} style={{ padding: '10px', cursor: 'pointer' }}>{t}</li>
                    ))}
                </ul>
            </aside>
            <main style={{ flex: 1, padding: '30px' }}>
                <h2>Category: {selectedType}</h2>
            </main>
        </div>
    );
};

export default ResourcePortal;
