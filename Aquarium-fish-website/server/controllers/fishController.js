const express = require("express");
const router = express.Router();
const { isLogUser } = require("../middleware/guards");

const Fish = require('../models/Fishes');

// Create fish - Logged
router.post("/add", isLogUser, async (req, res) => {
    const fishDetails = req.body;
    try {
        console.log(fishDetails);
        await Fish.create({ ...fishDetails, ownerId: req.userId });
    } catch (error) {
        console.log(error);
    }
    res.status(200).send("Send");
});

router.get("/", async (req, res) => {
    const allFishes = await Fish.find();
    // console.log(allFishes);
    res.json(allFishes);
});

router.get("/:id", async (req, res) => {
    try {
        const fishId = req.params.id
        const oneFish = await Fish.findById(fishId);
        // console.log(oneFish);
        res.json(oneFish);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// Edit fish - Logged and owner
router.put("/:id", isLogUser, async (req, res) => {
    try {
        const fishId = req.params.id;
        const fishDetails = await Fish.findById(fishId);
        if (fishDetails.ownerId != req.userId) {
            throw new Error('Unauthorized');
        }
        const updateInfo = req.body;
        // new:true - returns the modified value
        const editedfish = await Fish.findByIdAndUpdate(fishId, updateInfo, {
            new: true
        })
        res.json(editedfish);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
});

// Delete fish - Logged and owner

router.delete("/:id", isLogUser, async (req, res) => {
    try {
        const fishId = req.params.id;
        const fishDetails = await Fish.findById(fishId);
        if (fishDetails.ownerId != req.userId) {
            throw new Error('Unauthorized');
        }

        await Fish.findByIdAndDelete(fishId);
        res.json({ message: "Delete succesfully" });
    } catch (error) {
        // console.log(error);
        res.status(400).json(error);
    }
});

module.exports = router;