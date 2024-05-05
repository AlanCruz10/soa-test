const db = require('../../connections/mysqldb.js');

const Tutor = {};

Tutor.getAllTutors = (callback) => {
    const sql = 'SELECT * FROM tutors';
    db.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        console.log(results)
        callback(null, results);
    });
};

Tutor.create = (newTutor, callback) => {
    const sql = 'INSERT INTO tutors SET ?';
    db.query(sql, newTutor, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        newTutor.id = result.insertId;
        console.log(newTutor)
        console.log(result)
        callback(null, newTutor);
    });
};

Tutor.getAllStudentsByTutor = (id, callback) => {
    const sql = 'SELECT * FROM students WHERE tutor_id = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        console.log(result)
        callback(null, result);
    });
};

Tutor.assignStudentToTutor = (id, listStudents, callback) => {
    for (let i = 0; i <= listStudents.length; i++) {
        const sql = 'UPDATE students SET tutor_id = ? WHERE registration = ?';
        db.query(sql, [id, listStudents[i]], (err, result) => {
            if (err) {
                callback(err);
                return;
            }
            console.log(result)
            
        });
    }
    callback(null);
};

module.exports = Tutor;