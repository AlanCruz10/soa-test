const db = require('../../connections/mysqldb.js');

const Subject = {};

Subject.create = (newSubject, callback) => {
    const sql = 'INSERT INTO subjects SET ?';
    db.query(sql, newSubject, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        newSubject.id = result.insertId;
        console.log(newSubject)
        console.log(result)
        callback(null, newSubject);
    });
};

module.exports = Subject;