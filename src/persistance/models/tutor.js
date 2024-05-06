const db = require('../../connections/mysqldb.js');

const Tutor = function(tutor) {
    this.name = tutor.name;
  };

Tutor.getAllTutors = (callback) => {
    const sql = 'SELECT * FROM tutors';
    db.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
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
        callback(null, result);
    });
};

Tutor.assignStudentToTutor = (id, students, callback) => {
    const sql = `
        UPDATE students s
        LEFT JOIN tutors t ON s.tutor_id = t.id
        SET s.tutor_id = CASE
            WHEN s.tutor_id = ? THEN s.tutor_id
            WHEN s.tutor_id IS NULL OR s.tutor_id != ? THEN ?
        END
        WHERE s.registration = ?
    `;
    
    db.query(sql, [id, id, id, students], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};

module.exports = Tutor;