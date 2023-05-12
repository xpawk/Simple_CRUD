const mongoose = require("mongoose");
const connectDB = async (currentEnv) => {
  try {
    const config = {
      prod: "mongodb+srv://pawelkrol411:YKbH2W9Ticyw1Yh9@cluster0.xxwracv.mongodb.net/users?retryWrites=true&w=majority",
      preprod:
        "mongodb+srv://pawelkrol411:YKbH2W9Ticyw1Yh9@cluster0.xxwracv.mongodb.net/preprod?retryWrites=true&w=majority",
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
