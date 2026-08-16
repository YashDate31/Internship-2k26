// Day 61: "My Document" ("My Doc") Storage & Bookmark Feature
const express = require('express');
const router = express.Router();

// User saved/bookmarked documents in-memory / DB storage
let userSavedDocs = [];

// POST /api/mydoc/save
router.post('/save', (req, res) => {
    const { userId, materialId, title, fileUrl } = req.body;
    const docItem = { id: Date.now(), userId, materialId, title, fileUrl, savedAt: new Date() };
    userSavedDocs.push(docItem);
    res.status(201).json({ success: true, message: 'Document saved to My Doc successfully.', document: docItem });
});

// GET /api/mydoc/:userId
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const userDocs = userSavedDocs.filter(d => d.userId === userId);
    res.json({ success: true, count: userDocs.length, documents: userDocs });
});

module.exports = router;
