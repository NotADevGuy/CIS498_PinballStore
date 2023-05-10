const express = require("express");
const router = express.Router();

const Pinball = require("../models/pinball_model");

router.get("/getAllPinballs", async (req, res) => {
    const pinballs = await Pinball.find({})
    console.log("\nGetting all pinballs len: " + pinballs.length)
    for (let i = 0; i < pinballs.length; i++) {
        console.log(pinballs[i].name)
    }
    // console.log(pinballs)
    return res.status(200).json({pinballs: pinballs, status: 200})
})

router.post("/addpinball", async (req, res) => {
    const {name, manufacturer, year, description, price} = req.body;
    console.log(`\nAttempting to add pinball: ${name}`)

    const newPinball = new Pinball({
        name: name, manufacturer: manufacturer, year: year, description: description, price: price
    })

    await newPinball.save()
        .then(() => {
            console.log("Pinball created successfully!")
            return res.status(200).json({message: "Pinball created successfully!", status: 200})
        })
        .catch((err) => {
            console.log(err.message)
            return res.status(500).json({message: err.message, status: 500})
        })
})

router.post("/delete", async (req, res) => {
    const {pinball} = req.body;
    console.log(`\nAttempting to remove pinball: ${pinball.name}`)
    await Pinball.findOneAndDelete({
        name: pinball.name,
        manufacturer: pinball.manufacturer,
        year: pinball.year,
        description: pinball.description,
        price: pinball.price
    })
        .then(() => {
            console.log("Pinball removed successfully!")
            return res.status(200).json({message: "Pinball removed successfully!", status: 200})
        })
        .catch((err) => {
            console.log(err.message)
            return res.status(500).json({message: err.message, status: 500})
        })
})

router.post("/update", async (req, res) => {
    const {oldPinball, newPinball} = req.body;
    console.log(`\nAttempting to update pinball: ${oldPinball.name}, to ${newPinball.name}`)

    await Pinball.findOneAndUpdate({
        name: oldPinball.name,
        manufacturer: oldPinball.manufacturer,
        year: oldPinball.year,
        description: oldPinball.description,
        price: oldPinball.price
    }, newPinball)
        .then(() => {
            console.log("Pinball updated successfully!")
            return res.status(200).json({message: "Pinball updated successfully!", status: 200})
        })
        .catch((err) => {
            console.log(err.message)
            return res.status(500).json({message: err.message, status: 500})
        })
})

module.exports = router;