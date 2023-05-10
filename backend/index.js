// Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


// Connection to MongoDB & call models.
const User = require("./src/models/user_model");
const Pinball = require("./src/models/pinball_model");

const db = require("./src/models/db_info");

db.mongoose.connect(
    db.url, {useNewUrlParser:true, useUnifiedTopology:true}
)
    .then( () => {
        console.log("Database Connected.")
    })
    .catch( () => {
        console.log("Database not Connected.")
        process.exit();
    });


// Create the express app.
const app = express()
const corsOptions = {origin:"http://localhost:3000"};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// Import API routes, and mount them.
const userRoutes = require("./src/services/user_services");
const pinballRoutes = require("./src/services/pinball_services");
// const adminRoutes = require("./src/services/admin_services");
// Uncomment these as they're being implemented.
app.use('/api/user', userRoutes);
app.use('/api/pinball', pinballRoutes);
// app.use('/api/transfer', transferRoutes);



// Start the server.
const port = 8080 || process.env.PORT;
app.listen(port, () => {console.log(`Server running on port ${port}`)});
