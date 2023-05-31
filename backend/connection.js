const mongoose = require('mongoose');
const connectDB = async (currentEnv) => {
    try {
        const config = {
            prod: process.env.PROD_DB_URL,
            preprod: process.env.PREPROD_DB_URL,
        };
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }

        const con = await mongoose.connect(config[currentEnv]);
        console.log(`MongoDB connected: ${con.connection.host}`);
        return con;
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};
module.exports = connectDB;
