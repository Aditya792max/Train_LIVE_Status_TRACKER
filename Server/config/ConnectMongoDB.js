const mongoose = require('mongoose');

async function connectToMongoDB() {
	const uri = process.env.MONGODB_URI;
	if (!uri) throw new Error('MONGODB_URI is required in the environment.');

	await mongoose.connect(uri);
	console.log('Connected to MongoDB');
}

module.exports = { connectToMongoDB };
