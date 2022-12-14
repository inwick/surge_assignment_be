const router = require("express").Router();
const { User } = require('../models/user.model');
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
    try {
        //calling validate method
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }

        //check email address valid or not
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).json('Login Failed. Please re-check your email.');
        }

        //compare Password related to given email
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!validPassword) {
            return res.status(401).json("Login Failed. Please re-check your password.").status(401);
        }

        //Both password and email are true then display login success message
        if (validPassword && user) {
            const token = user.generateAuthToken();
            res.json({
                message: "logged in successfully",
                token,
                user,
                status: 200
            });
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

//validate method for required all fields (email and password)
const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password")
    });
    return schema.validate(data);
};

module.exports = router;
