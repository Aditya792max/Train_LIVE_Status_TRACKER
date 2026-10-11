const express = require('express');
const router = express.Router();

const {getCoachDetails} = require('../controllers/CoachPositionController');

router.get('/:number/:station', getCoachDetails);

module.exports = router;