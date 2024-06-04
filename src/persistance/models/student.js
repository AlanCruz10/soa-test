const db = require('../../connections/mysqldb.js');

const Student = function(student) {
    this.name = student.name;
    this.email = student.email;
    this.password = student.password;
    // this.status = student.status;
    // this.registration = student.registration;
};

Student.getAll = (callback) => {
    const sql = 'SELECT * FROM students';
    db.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
            return;
        }
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
        callback(null, newStudent);
    });
};

Student.getAllSubjectsByStudent = (id, callback) => {
    const sql = `
        SELECT s.name AS name, st.id AS student_id
        FROM student_subject ss
        JOIN subjects s ON ss.subject_id = s.id
        JOIN students st ON ss.student_id = st.id
        WHERE st.id = ?
    `;
    db.query(sql, id, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, result);
    });
};

Student.assignSubjectToStudent = (id, subjects, callback) => {
    const sql = 'SELECT id FROM students WHERE id = ?'
    db.query(sql, id, (err, results) => {
        if (err) {
            callback(err);
            return;
        }
        if (results.length > 0) {
            const sql = 'SELECT id FROM subjects WHERE name = ?'
            db.query(sql, subjects,(err, result) => {
                if (err) {
                    callback(err);
                    return;
                }
                if (result.length > 0) {
                    const sql = 'INSERT INTO student_subject SET student_id = ?, subject_id = ?'
                    db.query(sql, [results[0].id, result[0].id], (err) => {
                        if (err) {
                            callback(err);
                            return;
                        }
                        callback(null);
                    });
                }else{
                    callback(result);
                    return;
                }
            });
        }else{
            callback(results);
            return;
        }
    });
}

Student.login = (user, callback) => {
    const sql = 'SELECT * FROM students WHERE email = ?'
    db.query(sql, user.email, (err, result) => {
        if (err) {
            callback(err);
            return;
        }
        if (result.length > 0) {
            callback(null, result);
        }else{
            callback(null, null);
        }
    })
}

module.exports = Student;