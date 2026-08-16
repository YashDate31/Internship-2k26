// Day 50: Update and Delete API Endpoints for Resource Management
const express = require('express');
const router = express.Router();

// PUT /api/materials/:id
router.put('/materials/:id', (req, res) => {
    const { id } = req.params;
    const { title, category } = req.body;
    res.json({ success: true, message: `Material ${id} updated successfully.`, data: { title, category } });
});

// DELETE /api/materials/:id
router.delete('/materials/:id', (req, res) => {
    const { id } = req.params;
    res.json({ success: true, message: `Material ${id} deleted successfully.` });
});

module.exports = router;
