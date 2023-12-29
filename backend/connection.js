const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState !== 0) {
            await mongoose.connection.close();
        }
        const con = await mongoose.connect(process.env.DB_URL);
        console.log(`MongoDB connected: ${con.connection.host}`);
        return con.connection.db.databaseName;
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
module.exports = connectDB;
