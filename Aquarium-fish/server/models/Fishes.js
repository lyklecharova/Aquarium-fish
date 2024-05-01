const mongoose = require('mongoose');
const User = require('./User');

const fishesSchema = new mongoose.Schema({
	species: String,
	image: String,
	description: String,
	ownerId: { type: mongoose.Schema.Types.ObjectId, ref: User }
});

const Fish = mongoose.model("Fish", fishesSchema);

module.exports = Fish;