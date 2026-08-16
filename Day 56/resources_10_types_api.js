// Day 56: 10 Types of Academic Resources API Endpoint
const express = require('express');
const router = express.Router();

// 10 Supported Resource Types in College Sahayak
const RESOURCE_TYPES = [
    'Syllabus',
    'Unit Notes',
    'Lab Manuals',
    'Previous Question Papers',
    'Model Answer Sheets',
    'Assignment Solutions',
    'Microproject Reports',
    'Reference Books (PDF)',
    'Video Lecture Links',
    'Viva Voce Questions'
];

// GET /api/resources/types
router.get('/types', (req, res) => {
    res.json({ success: true, total_types: RESOURCE_TYPES.length, types: RESOURCE_TYPES });
});

// GET /api/resources/filter?type=Lab Manuals
router.get('/filter', (req, res) => {
    const { type } = req.query;
    if (!RESOURCE_TYPES.includes(type)) {
        return res.status(400).json({ success: false, error: 'Invalid resource type specified.' });
    }

    res.json({
        success: true,
        resource_type: type,
        message: `Fetched records for resource category: ${type}`,
        resources: [
            { id: 101, title: `${type} - Part 1`, format: 'PDF', downloadUrl: `/uploads/${type.toLowerCase().replace(/ /g, '_')}_1.pdf` }
        ]
    });
});

module.exports = router;
