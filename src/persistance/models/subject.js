const db = require('../../connections/mysqldb.js');

const Subject = function(subject) {
    this.name = subject.name;
};


Subject.create = (newSubject, callback) => {
    const sql = 'INSERT INTO subjects SET ?';
    db.query(sql, newSubject, (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }
        newSubject.id = result.insertId;
        callback(null, newSubject);
    });
};

module.exports = Subject;