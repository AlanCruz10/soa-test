const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Rutas
router.get('/students', studentController.getAllStudents);
router.get('/students/:student/subjects', studentController.getAllSubjectsByStudent)
router.post('/students', studentController.createStudent);
router.post('/students/:student/subjects', studentController.assignSubjectToStudent)


module.exports = router;