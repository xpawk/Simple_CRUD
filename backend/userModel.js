const mongoose = require('mongoose');
const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter name\n'],
        },
        lName: {
            type: String,
            required: [true, 'Please enter last name\n'],
        },
        email: {
            type: String,
            required: [true, 'Please enter email\n'],
            unique: true,
        },
        password: {
            type: String,
            required: [true, 'Please enter password\n'],
        },
        username: {
            type: String,
            required: [true, 'Please enter username\n'],
            unique: true,
        },
        status: {
            type: String,
            required: [true, 'Please enter status\n'],
            default: 'Unverified',
        },
    },
    {
        timestamps: true,
    },
);
const User = mongoose.model('User', userSchema);
module.exports = User;
