const { User } = require('./models/user.model');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const seedAdmin = {
    id: 88,
    firstName: 'Isuru',
    lastName: 'Jayan',
    email: 'isuru@gmail.com',
    dateOfBirth: '1999-10-27',
    mobile: 0775674321,
    status: true,
    password: 'Isuru@1234',
    accountType: 'Admin'
};

const seedDB = async () => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(seedAdmin.password, salt);
    try {
        seedAdmin.password = hashPassword;
        await User.create(seedAdmin);

        console.log("data imported");
    } catch (err) {
    }
};

module.exports = seedDB; 