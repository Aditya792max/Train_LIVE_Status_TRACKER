const express = require('express');
const router = express.Router();

const {
    getTrainDetails
} = require('../controllers/FetchLiveController');

router.get('/:number/live', getTrainDetails);

module.exports = router;