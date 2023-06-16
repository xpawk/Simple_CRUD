const mongoose = require('mongoose');
const User = require('./userModule.js');
const connectDB = require('./connection.js');
const express = require('express');

const dbActions = (app) => {
    let currentDB = connectDB();
    app.post('/env', async ({ body: { env } }, res) => {
        try {
            currentDB = await connectDB(env);
            res.status(200).json('Success');
        } catch (error) {
            console.error(error);
            res.status(500).json(error.message);
        }
    });
    app.post('/user', async ({ body }, res) => {
        try {
            await User.create(body);
            res.status(200).json('Success');
        } catch (error) {
            console.log(error.message);
            res.status(500).json(error.message);
        }
    });
    app.post('/login', async ({ body }, res) => {
        try {
            await User.create(body);
            res.status(200).json('Success');
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
module.exports = dbActions;
