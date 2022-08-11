// const User = require('./models/user.model');
// const mongoose = require('mongoose');

// // require('dotenv').config();

// // const uri = process.env.ATLAS_URI;
// // mongoose.connect(uri, {});

// const seedAdmin = {
//     id: 99,
//     firstName: 'Sam',
//     lastName: 'Jecob',
//     email: 'samj@gmail.com',
//     dateOfBirth: '20-10-1999',
//     mobile: 01234567,
//     status: true,
//     password: 'Sam@1234',
//     accountType: 'Admin'
// };

// const seedDB = async () => {
//     try {
//         await User.create(seedAdmin);
//         console.log("data imported");
//     } catch (err) {
//         console.error(err);
//     }
// };

// seedDB().then(() => {
//     mongoose.connection.close();
// })