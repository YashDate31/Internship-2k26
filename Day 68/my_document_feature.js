// Day 68: "My Document" ("My Doc") Storage & Bookmark Feature (11 Aug 2026)
const express = require('express');
const router = express.Router();

let userSavedDocs = [];

router.post('/save', (req, res) => {
    const { userId, materialId, title, fileUrl } = req.body;
    const docItem = { id: Date.now(), userId, materialId, title, fileUrl, savedAt: new Date() };
    userSavedDocs.push(docItem);
    res.status(201).json({ success: true, message: 'Document saved to My Doc.', document: docItem });
});

router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    res.json({ success: true, documents: userSavedDocs.filter(d => d.userId === userId) });
});

module.exports = router;
