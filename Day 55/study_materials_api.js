// Day 55: College Sahayak Study Materials API & UI Card Component
const express = require('express');
const router = express.Router();

// POST /api/materials/add
router.post('/add', (req, res) => {
    const { title, category, file_url } = req.body;
    res.status(201).json({
        success: true,
        message: 'Study material added successfully to College Sahayak portal.',
        material: { title, category, file_url }
    });
});

module.exports = router;
