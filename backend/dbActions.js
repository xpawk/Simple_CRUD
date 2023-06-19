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

    //User register
    app.post('/user', async ({ body }, res) => {
        try {
            for (let key in body) {
                if (!body[key] || typeof body[key] !== 'string') {
                    return res.json(`Invalid ${key}`);
                }
            }
            if (body.password.length < 6) {
                return res.json(`Password should be at least 6 characters`);
            }
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
            if (await bcrypt.compare(password, user.password)) {
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

const isEmail = (login) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(login);
};

module.exports = dbActions;
