const mongoose = require("mongoose");
const User = require("./userModel.js");
const connectDB = require("./connection.js");
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dbActions = (app) => {
    let currentDB = connectDB();

    //changing env
    app.post("/env", authenticateToken, async ({ body: { env }, user }, res, next) => {
        try {
            if (isAdmin(user, res)) {
                currentDB = await connectDB(env);
                res.status(200).json("Success");
            }
        } catch (error) {
            next(error);
        }
    });

    app.post(
        "/changePassword",
        authenticateToken,
        async ({ body: { current_password, password }, user }, res, next) => {
            try {
                if (user && (await bcrypt.compare(current_password, user.password))) {
                    validation(password, res);
                    const _id = user._id;
                    const hashedPassword = await bcrypt.hash(password, 10);
                    await User.updateOne(
                        { _id },
                        {
                            $set: { password: hashedPassword },
                        },
                    );
                    return res.json({
                        status: "Success",
                        message: "Password changed successfully",
                    });
                } else {
                    throw { message: `Invalid password`, status: 400 };
                }
            } catch (error) {
                next(error);
            }
        },
    );

    //User register
    app.post("/user", async ({ body }, res, next) => {
        try {
            validation(body, res);
            body.password = await bcrypt.hash(body.password, 10);
            await User.create(body);
            res.status(200).json("Success");
        } catch (error) {
            if (error.code === 11000) {
                return next({
                    message: `User with this ${Object.keys(error.keyValue)[0]} already exists.`,
                    status: 400,
                });
            }
            next(error);
        }
    });

    app.post("/login", async ({ body }, res, next) => {
        try {
            const loginError = { message: `Invalid password or login`, status: 400 };
            const { login, password } = body;
            for (let key in body) {
                if (!body[key] || typeof body[key] !== "string") {
                    throw loginError;
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
                        status: user.status,
                    },
                    process.env.JWT_SECRET,
                );
                res.json({ status: "Success", data: token });
            } else {
                throw loginError;
            }
        } catch (error) {
            next(error);
        }
    });

    app.delete("/user/:id", authenticateToken, async ({ params: { id = "" }, user }, res, next) => {
        try {
            if (isAdmin(user, res)) {
                await User.findByIdAndDelete(id);
                res.status(200).json("Success");
            }
        } catch (error) {
            next(error);
        }
    });

    app.put(
        "/user/:id",
        authenticateToken,
        async ({ body, params: { id = "" }, user }, res, next) => {
            try {
                if (isAdmin(user, res)) {
                    validation(body, res);
                    await User.findByIdAndUpdate(id, body);
                    res.status(200).json("Success");
                }
            } catch (error) {
                next(error);
            }
        },
    );

    app.get("/usersTable", authenticateToken, async (req, res, next) => {
        try {
            if (isAdmin(req.user, res)) {
                const fetchDB = await User.find({});
                res.status(200).json(fetchDB);
            }
        } catch (error) {
            next(error);
        }
    });

    app.get("/checkEnv", async (req, res, next) => {
        try {
            const dbName = await currentDB;
            res.status(200).json(dbName);
        } catch (error) {
            next(error);
        }
    });

    app.get("/userStatus", authenticateToken, async ({ user: { status } }, res, next) => {
        try {
            res.status(200).json(status);
        } catch (error) {
            next(error);
        }
    });
    app.use((err, req, res, next) => {
        console.error(err.message);
        if (err.status) {
            res.status(err.status).json(err.message);
        } else {
            res.status(500).json("Internal Server Error");
        }
    });
};

const validation = (body) => {
    for (let key in body) {
        if (!body[key] || typeof body[key] !== "string") {
            throw { message: `Invalid ${key}`, status: 400 };
        }
        if (body[key].length > 26) {
            throw { message: `Too long ${key}`, status: 400 };
        }
    }
    if (body.email && !isEmail(body.email)) {
        throw { message: "Enter correct e-mail", status: 400 };
    }
    if (body.password && body.password.length < 6) {
        throw { message: "Password should be at least 6 characters", status: 400 };
    }
};

const isEmail = (login) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(login);
};

const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        throw { message: "missingToken", status: 401 };
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            throw { message: "unauthorized", status: 403 };
        }

        if (user.status === "Blocked") {
            throw { message: user.status, status: 403 };
        }

        req.user = await User.findOne({ _id: user.id }).lean();
        next();
    });
};

const isAdmin = ({ status }) => {
    if (status !== "Admin") {
        throw { message: "No privileges", status: 403 };
    }
    return true;
};

module.exports = dbActions;
