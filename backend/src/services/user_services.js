const express = require("express");
const router = express.Router();

const User = require("../models/user_model");

router.post("/login", async (req, res) => {
    console.log(`\nLogin attempt on account ${req.body.email} with password ${req.body.password}`)
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        console.log("User does not exist!")
        return res.status(404).json({ message: "User does not exist!", status: 404 });
    }

    const isMatch = (password === user.password);

    if (!isMatch) {
        console.log("Password is incorrect!")
        return res.status(401).json({ message: "Incorrect password!", status: 401 });
    }
    console.log(user.isAdmin)
    console.log("Login successful!")
    return res.status(200).json({
        message: "Login successful!",
        userInfo: {
            id: user._id,
            username: user.username,
            name: user.name,
            email: user.email,
            admin: user.isAdmin
        }
    })
})

router.post("/register", async (req, res) => {
    const {username, password, email, name, zip, admin} = req.body;
    console.log(`\nAttempting registration of new user: ${email}`)

    const userEmail = await User.findOne({email})
    const userName = await User.findOne({username})

    if (userEmail || userName) {
        console.log("User already exists!")
        return res.status(403).json({message: "User already exists!", status: 403});
    }

    const newUser = new User({
        username: username, password: password, email: email, name: name, zip: zip, admin: admin
    })

    await newUser.save()
        .then(() => {
            console.log("User created successfully!")
            return res.status(200).json({message: "User created successfully!", status: 200})
        })
        .catch((err) => {
            console.log(err.message)
            return res.status(500).json({message: err.message, status: 500})
        })
    // console.log(username, password, email, name, zip, admin)
})

module.exports = router;