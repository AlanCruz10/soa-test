const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

// Rutas
router.post('/subjects', subjectController.createSubject);

module.exports = router;