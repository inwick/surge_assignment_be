const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // id: { type: Number, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date },
    mobile: { type: Number },
    status: { type: Boolean, required: true },
    password: { type: String, required: true },
    accountType: { type: String, required: true },
}, {
    timestamps: true,
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
        expiresIn: "7d",
    });
    return token;
};

const User = mongoose.model('User', userSchema);

const validate = (data) => {
    const schema = Joi.object({
        // id: Joi.number().required().label("ID"),
        // firstName: Joi.string().required().label("First Name"),
        // lastName: Joi.string().required().label("Last Name"),
        email: Joi.string().email().required().label("Email"),
        // dateOfBirth: Joi.date().required().label("Date of Birth"),
        // mobile: Joi.string().mobile().required().label("Mobile"),
        status: Joi.boolean().required().label("Status"),
        password: passwordComplexity().required().label("Password"),
        accountType: Joi.string().required().label("Account Type"),

    });
    return schema.validate(data);
};


module.exports = { User, validate };