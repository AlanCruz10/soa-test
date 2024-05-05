const Subject = require('../persistance/models/subject');

exports.createSubject = (req, res) => {
    const newSubject = new Subject({
        name: req.body.name
    });
    Subject.create(newSubject, (err, subject) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.status(200).json(subject);
    });
};