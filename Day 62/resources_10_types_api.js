// Day 62: 10 Types of Academic Resources API (4 Aug 2026)
const express = require('express');
const router = express.Router();

const RESOURCE_TYPES = [
    'Syllabus', 'Unit Notes', 'Lab Manuals', 'Previous Question Papers',
    'Model Answer Sheets', 'Assignment Solutions', 'Microproject Reports',
    'Reference Books (PDF)', 'Video Lecture Links', 'Viva Voce Questions'
];

router.get('/types', (req, res) => {
    res.json({ success: true, total_types: RESOURCE_TYPES.length, types: RESOURCE_TYPES });
});

module.exports = router;
