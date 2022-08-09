const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    // id: { type: Number, required: true },
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true },
    dateOfBirth: { type: Date },
    mobile: { type: Number },
    status: { type: Boolean, required: true },
    password: { type: String, required: true },
    accountType: { type: String, required: true },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;