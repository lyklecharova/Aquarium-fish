const express = require("express");
const router = express.Router();

const fishController = require('../controllers/fishController');
router.use(`/fish`, fishController);

const userController = require('../controllers/userController');
router.use(`/user`, userController);

module.exports = router;