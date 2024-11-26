// routes/paperRoutes.js

const express = require('express');
const router = express.Router();
const paperController = require('../controllers/paperController');

router.post('/saveResponses', paperController.saveResponses);

module.exports = router;