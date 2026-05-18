const express = require('express');
const journalController = require('../controllers/journalController');
const journalRoutes = require('./journalRoutes');
const asyncHandler = require('../middleware/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(journalController.dashboard));
router.use('/journals', journalRoutes);

module.exports = router;
