const Student = require('../persistance/models/student');

exports.getAllStudents = (req, res) => {
    Student.getAll((err, students) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(students);
    });
};

exports.createStudent = (req, res) => {
    const newStudent = new Student({
        name: req.body.name,
        registration: req.body.registration
    });
    Student.create(newStudent, (err, student) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json(student);
    });
};

exports.getAllSubjectsByStudent = (req, res) => {
    Student.getAllSubjectsByStudent(req.params.id, (err, subjects) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json(subjects);
    });
};

exports.assignSubjectToStudent = (req, res) => {
    const id = req.params.id;
    const listSubjects = req.body.subjects; // Suponiendo que los nombres de las materias se pasan en req.body.subjects
    Student.assignSubjectToStudent(id, listSubjects, (err) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Subjects assigned successfully' });
    });
};