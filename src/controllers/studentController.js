const Student = require('../persistance/models/student');

exports.getAllStudents = (req, res) => {
    Student.getAll((err, students) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (students.length == 0) {
            res.status(500).json({ error: "Not found students" });
            return;
        }
        res.status(200).json(students);
    });
};

exports.createStudent = (req, res) => {
    const newStudent = new Student({
        name: req.body.name,
        // registration: req.body.registration
        email: req.body.email,
        password: req.body.password
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
    Student.getAllSubjectsByStudent(req.params.student, (err, subjects) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (subjects.length == 0) {
            res.status(400).json({ error: "Not found subjects" });
            return;
        }
        res.status(200).json(subjects);
    });
};

exports.assignSubjectToStudent = (req, res) => {
    const id = req.params.student;
    const listSubjects = req.body.subjects;
    const updatePromises = listSubjects.map(subject => {
        return new Promise((resolve, reject) => {
            Student.assignSubjectToStudent(id, subject, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    });
    Promise.all(updatePromises)
        .then(() => {
            res.status(200).json({ message: 'Subjects assigned successfully' });
        })
        .catch(err => {
            if (err.length == 0) {
                res.status(400).json({ error: "Not found student or subject" });
            }else{
               res.status(400).json({ error: err.message });
            }
        });
};

exports.login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };
    Student.login(user, (err, student) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (student.length == 0) {
            res.status(400).json({ error: "Not found user" });
            return;
        }else{
            // if (student.email == user.email && student.password == user.password) {
            res.status(200).json({ message: 'user logged' });
            // } else {
            //     res.status(401).json({ error: 'invalid credentials' });
            // }
        }
    });
}