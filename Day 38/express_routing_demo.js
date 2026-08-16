// Day 38: Express Router Modularization for College Sahayak
const express = require('express');
const router = express.Router();

// Notes routing module
router.get('/notes', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, title: 'DBMS Unit 1 Notes', subject: 'DBMS', semester: 4 },
      { id: 2, title: 'OS Process Management', subject: 'OS', semester: 4 }
    ]
  });
});

router.post('/notes', (req, res) => {
  const { title, subject, semester } = req.body;
  res.status(201).json({
    success: true,
    message: 'Note added successfully',
    note: { title, subject, semester }
  });
});

module.exports = router;
