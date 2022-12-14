const router = require('express').Router();
const { User, validate } = require('../models/user.model');
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    try {

        //check email is already in database
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json('User with given email already Exist!');
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
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const dateOfBirth = req.body.dateOfBirth;
    const mobile = req.body.mobile;
    const status = Boolean(req.body.status);
    const password = req.body.password;
    const accountType = req.body.accountType;

    const newUser = new User({
        id,
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

router.route('/update/:id').put(async (req, res) => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    User.findById(req.params.id)
        .then(user => {
            user.id = req.body.id;
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.email = req.body.email;
            user.dateOfBirth = req.body.dateOfBirth;
            user.mobile = req.body.mobile;
            user.status = Boolean(req.body.status);
            user.password = hashPassword;
            user.accountType = req.body.accountType;

            user.save()
                .then(() => res.json('User updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;