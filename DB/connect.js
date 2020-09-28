require("dotenv").config();
const mongoose = require("mongoose");

const CONNECTION_URI = process.env.MONGO_URI;

async function connectDB() {
  try {
    await mongoose.connect(CONNECTION_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.info("Database connect successful");
  } catch (error) {
    console.log("No connect DB", error);
    process.exit(1);
  }
}

module.exports = connectDB;
