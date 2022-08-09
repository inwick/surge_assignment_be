const router = require('express').Router();
let Student = require('../models/user.model');

router.route('/').get((req, res) => {
    Student.find()
        .then(students => res.json(students))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    // const id = Number(req.body.id);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const dateOfBirth = Date.parse(req.body.dateOfBirth);
    const mobile = Number(req.body.mobile);
    const status = Boolean(req.body.status);
    const password = req.body.password;
    const accountType = req.body.accountType;

    const newStudent = new Student({
        // id,
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobile,
        status,
        password,
        accountType,

    });

    newStudent.save()
        .then(() => res.json('Student added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Student.findById(req.params.id)
        .then(student => res.json(student))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(() => res.json('Student deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            student.firstName = req.body.firstName;
            student.lastName = req.body.lastName;
            student.email = req.body.email;
            student.dateOfBirth = Date.parse(req.body.dateOfBirth);
            student.mobile = Number(req.body.mobile);
            student.status = Boolean(req.body.status);
            student.password = req.body.password;
            student.accountType = req.body.accountType;

            student.save()
                .then(() => res.json('Student updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;