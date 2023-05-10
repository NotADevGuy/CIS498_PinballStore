let mongoose = require("mongoose");

let schema = mongoose.Schema;
let User = new schema(
    {
        name: String,  username: String,
        email: String, password: String,
        zip: Number,   isAdmin: Boolean
    },
    {timestamps:true}
);

const userModel = mongoose.model("users", User);

module.exports = userModel;
