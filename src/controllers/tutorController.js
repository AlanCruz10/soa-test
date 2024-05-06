const Tutor = require('../persistance/models/tutor');

exports.getAllTutors = (req, res) => {
    Tutor.getAllTutors((err, tutors) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (tutors.length == 0) {
            res.status(500).json({ error: "Not Fount Tutors" });
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
    Tutor.getAllStudentsByTutor(req.params.tutor, (err, students) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (students.length == 0) {
            res.status(400).json({ error: "Not Found Tutor or Student" });
            return;
        }
        res.status(200).json(students);
    });
};

exports.assignStudentToTutor = (req, res) => {
    const id = req.params.tutor;
    const listStudents = req.body.students; 
    const updatePromises = listStudents.map(studentRegistration => {
        return new Promise((resolve, reject) => {
            Tutor.assignStudentToTutor(id, studentRegistration, (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            });
        });
    });
    Promise.all(updatePromises)
        .then((result) => {
            res.status(200).json({ message: 'Students assigned successfully' });
        })
        .catch(err => {
            res.status(400).json({ error: err.message });
        });
};