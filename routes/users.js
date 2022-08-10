const router = require('express').Router();
const { User, validate } = require('../models/user.model');
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {
        //calling validate method created in studentRegistration model class
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        //check student ID already in database (check unique or not)
        // const userID = await User.findOne({ id: req.body.id });
        // if (userID) {
        //     return res.json('User with given Student ID is already Exist!').status(401);
        // }

        //check email is already in database
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.json('User with given email already Exist!').status(400);
        }

        //user entered password converted in to hash password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        //save all details
        await new User({ ...req.body, password: hashPassword }).save()
            .then(() => res.json('Student Registration successfully!'))
            .catch(err => res.status(400).json('Error: ' + err));

    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});





router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    // const id = Number(req.body.id);
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const dateOfBirth = req.body.dateOfBirth;
    const mobile = req.body.mobile;
    const status = Boolean(req.body.status);
    const password = req.body.password;
    const accountType = req.body.accountType;

    const newUser = new User({
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

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    User.findById(req.params.id)
        .then(user => {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.dateOfBirth = Date.parse(req.body.dateOfBirth);
            user.mobile = Number(req.body.mobile);
            user.status = Boolean(req.body.status);
            user.password = req.body.password;
            user.accountType = req.body.accountType;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;