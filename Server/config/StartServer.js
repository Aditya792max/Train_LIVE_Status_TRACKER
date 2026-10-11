const express = require('express');
const app = express();
app.use(express.json());


const dotenv = require('dotenv');
dotenv.config();


const PORT = process.env.PORT;

async function startServer() {
    try {
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting the server:', error);
    }
};

module.exports = { app, startServer };