let mongoose = require("mongoose");

let schema = mongoose.Schema;
let Pinball = new schema(
    {
        name: String,
        manufacturer: String,
        year: Number,
        description: String,
        price: Number
    },
    {timestamps:true}
);

const pinballModel = mongoose.model("pinballs", Pinball);

module.exports = pinballModel;
