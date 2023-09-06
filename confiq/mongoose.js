const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

// connect to database

mongoose.connect("mongodb://127.0.0.1/E-Com", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Can't connect to MongoDb"));

// if connection is successful
db.once("open", () => {
  console.log("Data Base will Connected");
});

module.exports = db;
