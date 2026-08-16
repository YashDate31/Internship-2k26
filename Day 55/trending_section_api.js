// Day 55: Trending Resources & Popular Study Materials API
const express = require('express');
const router = express.Router();

// GET /api/trending
router.get('/trending', (req, res) => {
    const trendingMaterials = [
        { id: 1, title: 'Web Development Unit 1 Notes', category: 'Syllabus Notes', views: 420, rating: 4.9 },
        { id: 2, title: 'Database Systems Lab Manual 2026', category: 'Lab Manuals', views: 380, rating: 4.8 },
        { id: 3, title: 'JavaScript & React Quick Reference Sheet', category: 'Cheatsheets', views: 510, rating: 5.0 }
    ];
    res.json({ success: true, count: trendingMaterials.length, data: trendingMaterials });
});

module.exports = router;
