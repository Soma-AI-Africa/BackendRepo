const express = require('express');
const { getAIResponse } = require('../controller/AIresponse');

const router = express.Router();

router.route('/').get(getAIResponse);

module.exports = router;