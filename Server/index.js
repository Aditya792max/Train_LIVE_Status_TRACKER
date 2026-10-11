require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { connectToMongoDB } = require('./config/ConnectMongoDB');
const authRoutes = require('./routes/AuthRoutes');
const userRoutes = require('./routes/UserRoutes');
const trainRoutes = require('./routes/FetchLiveRoutes');
const coachRoutes = require('./routes/CoachPositionRoutes');
const errorHandler = require('./middlewares/ErrorHandler');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
	response.json({ message: 'Train Tracker API is running.' });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/trains', trainRoutes);
app.use('/api/coaches', coachRoutes);
app.use(errorHandler);

async function start() {
	if (!process.env.JWT_SECRET) {
		throw new Error('JWT_SECRET is required in the environment.');
	}

	await connectToMongoDB();
	app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

start().catch((error) => {
	console.error('Unable to start the server:', error.message);
	process.exitCode = 1;
});

module.exports = app;
