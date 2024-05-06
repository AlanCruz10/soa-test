const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');

// Rutas
router.get('/tutors', tutorController.getAllTutors);
router.get('/tutors/:tutor/students', tutorController.getAllStudentsByTutor)
router.post('/tutors', tutorController.createTutor);
router.post('/tutors/:tutor/students', tutorController.assignStudentToTutor)

module.exports = router;