const express = require('express');
const journalController = require('../controllers/journalController');
const asyncHandler = require('../middleware/asyncHandler');
const validateJournal = require('../middleware/validateJournal');

const router = express.Router();

router.get('/', asyncHandler(journalController.listJournals));
router.get('/new', asyncHandler(journalController.newJournalForm));
router.post('/', validateJournal, asyncHandler(journalController.createJournal));
router.get('/:id', asyncHandler(journalController.showJournal));
router.get('/:id/edit', asyncHandler(journalController.editJournalForm));
router.put('/:id', validateJournal, asyncHandler(journalController.updateJournal));
router.delete('/:id', asyncHandler(journalController.deleteJournal));

module.exports = router;
