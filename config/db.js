const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`DateBase connected ${mongoose.connection.host}`);
  } catch (error) {
    console.log(`error while connecting server ${error}`);
  }
};

module.exports = connectDb;
