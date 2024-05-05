const db = require('../../connections/mysqldb.js');

const Student = {};

Student.getAll = (callback) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
        console.log(results)
        callback(null, results);
    });
};

Student.create = (newStudent, callback) => {
    const sql = 'INSERT INTO students SET ?';
    db.query(sql, newStudent, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        newStudent.id = result.insertId;
        console.log(newStudent)
        console.log(result)
        callback(null, newStudent);
    });
};

Student.getAllSubjectsByStudent = (id, callback) => {
    const sql = 'SELECT * FROM subjects WHERE student_id = ?';
    db.query(sql, id, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        console.log(result)
        callback(null, result);
    });
};

Student.assignSubjectToStudent = (id, listSubjects, callback) => {
    for (let i = 0; i <= listSubjects.length; i++) {
        const sql = 'SELECT * FROM subjects WHERE name = ? AND student_id = ?';
        db.query(sql, [listSubjects[i], id],(err, results) => {
            if (err) {
                const sql = 'INSERT INTO subjects SET name = ?, student_id = ?';
                db.query(sql, [listSubjects[i], id], (err, result) => {
                    if (err) {
                        callback(err);
                        return;
                    }
                    console.log(result)
                    callback(null, result);
                });
            } else {
                console.log(results);
                callback(null, results);
            }
        });
    };
}

module.exports = Student;