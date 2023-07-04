const mongoose = require('mongoose');
const User = require('./userModel.js');
const connectDB = require('./connection.js');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dbActions = (app) => {
    let currentDB = connectDB();

    //changing env
    app.post('/env', async ({ body: { env } }, res) => {
        try {
            currentDB = await connectDB(env);
            res.status(200).json('Success');
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    });
    app.post('/changePassword', async ({ body }, res) => {
        try {
            const { token, current_password, password } = body;
            let user = jwt.verify(token, process.env.JWT_SECRET);
            user = await User.findOne({ _id: user.id }).lean();
            if (
                user &&
                (await bcrypt.compare(current_password, user.password))
            ) {
                delete body.token;
                validation(body, res);
                const _id = user._id;
                const hashedPassword = await bcrypt.hash(password, 10);
                await User.updateOne(
                    { _id },
                    {
                        $set: { password: hashedPassword },
                    },
                );
                return res.json('Password changed successfully');
            } else {
                return res.json('Password is invalid');
            }
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    });
    //User register
    app.post('/user', async ({ body }, res) => {
        try {
            validation(body, res);
            body.password = await bcrypt.hash(body.password, 10);
            await User.create(body);
            res.status(200).json('Success');
        } catch (error) {
            if (error.code === 11000) {
                return res.json(
                    `User with this ${
                        Object.keys(error.keyValue)[0]
                    } already exist`,
                );
            }
            console.log(error.message);
            res.status(500).json(error.message);
        }
    });

    app.post('/login', async ({ body }, res) => {
        try {
            const { login, password } = body;
            for (let key in body) {
                if (!body[key] || typeof body[key] !== 'string') {
                    return res.json(`Invalid login or password`);
                }
            }
            let user;
            if (isEmail(login)) {
                user = await User.findOne({ email: login }).lean();
            } else {
                user = await User.findOne({ username: login }).lean();
            }

            if (user && (await bcrypt.compare(password, user.password))) {
                const token = jwt.sign(
                    {
                        id: user._id,
                        username: user.username,
                    },
                    process.env.JWT_SECRET,
                );
                res.json({ status: 'Success', data: token });
            } else {
                return res.json(`Invalid login or password`);
            }
        } catch (error) {
            console.log(error.message);
            res.status(500).json(error.message);
        }
    });

    app.delete('/user/:id', async ({ params: { id = '' } }, res) => {
        try {
            await User.findByIdAndDelete(id);
            res.status(200).json('Success');
        } catch (error) {
            console.log(error.message);
            res.status(500).json(error.message);
        }
    });

    app.put('/user/:id', async ({ body, params: { id = '' } }, res) => {
        try {
            validation(body, res);
            await User.findByIdAndUpdate(id, body);
            res.status(200).json('Success');
        } catch (error) {
            console.log(error.message);
            res.status(500).json(error.message);
        }
    });

    app.get('/usersTable', async (req, res) => {
        try {
            const fetchDB = await User.find({});
            res.status(200).json(fetchDB);
        } catch (error) {
            console.log(error.message);
            res.status(500).json(error.message);
        }
    });

    app.get('/checkEnv', async (req, res) => {
        try {
            const dbName = await currentDB;
            res.status(200).json(dbName);
        } catch (error) {
            console.log(error.message);
            res.status(500).json(error.message);
        }
    });
};
const validation = (body, res) => {
    for (let key in body) {
        if (!body[key] || typeof body[key] !== 'string') {
            return res.json(`Invalid ${key}`);
        }
        if (body[key].length > 26) {
            return res.json(`To long ${key}`);
        }
    }
    if (body.email && !isEmail(body.email)) {
        return res.json('Enter correct e-mail');
    }
    if (body.password && body.password.length < 6) {
        return res.json(`Password should be at least 6 characters`);
    }
};
const isEmail = (login) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(login);
};

module.exports = dbActions;
