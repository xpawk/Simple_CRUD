const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter name'],
        },
        lName: {
            type: String,
            required: [true, 'Please enter last name '],
        },
        email: {
            type: String,
            required: [true, 'Please enter email'],
        },
        password: {
            type: String,
            required: [true, 'Please enter password number'],
        },
        username: {
            type: String,
            required: [true, 'Please enter username'],
        },
    },
    {
        timestamps: true,
    },
);
const User = mongoose.model('User', userSchema);
module.exports = User;
