// Day 48: Product & Material Search API Endpoint
const express = require('express');
const router = express.Router();

// GET /api/search?q=query&category=cat
router.get('/search', async (req, res) => {
    const { q, category } = req.query;
    try {
        let sql = 'SELECT * FROM materials WHERE 1=1';
        const params = [];

        if (q) {
            sql += ' AND (title LIKE ? OR description LIKE ?)';
            params.push(`%${q}%`, `%${q}%`);
        }

        if (category) {
            sql += ' AND category = ?';
            params.push(category);
        }

        res.json({ success: true, query: q, category, results: [] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;
