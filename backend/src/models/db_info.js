const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;

// db.url = "mongodb://127.0.0.1:27017/mybooks";
db.url = "mongodb+srv://matttbailey13mongo:XoO7ZfdTs34gHe6b@cluster0.juxzjto.mongodb.net/project3"


db.users = require("./user_model");
db.pinballs = require("./pinball_model");

module.exports = db;
