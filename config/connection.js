const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGOOB_URI || "mongodb://127.0.0.1:27017/socialmedia",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
