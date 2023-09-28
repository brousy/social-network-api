const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGOOB_URI || "mongodb://127.0.0.1:27017/socialmedia",
  {
    userNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
