const Tutor = require('../persistance/models/tutor');

exports.getAllTutors = (req, res) => {
    Tutor.getAllTutors((err, tutors) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(200).json(tutors);
    });
};

exports.createTutor = (req, res) => {
    const newTutor = new Tutor({
        name: req.body.name
    });
    Tutor.create(newTutor, (err, tutor) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json(tutor);
    });
};

exports.getAllStudentsByTutor = (req, res) => {
    Tutor.getAllStudentsByTutor(req.params.id, (err, students) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json(students);
    });
};

exports.assignStudentToTutor = (req, res) => {
    const id = req.params.id;
    const listStudents = req.body.students; 
    Tutor.assignStudentToTutor(id, listStudents, (err) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json({ message: 'Students assigned successfully' });
    });
};