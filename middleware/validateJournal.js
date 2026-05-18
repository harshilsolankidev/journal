const { validateJournalInput } = require('../utils/validators');
const { MOODS } = require('../utils/constants');

function validateJournal(req, res, next) {
  const errors = validateJournalInput(req.body);
  const isEdit = Boolean(req.params.id);

  if (errors.length > 0) {
    const id = req.params.id;
    return res.status(400).render('journal/form', {
      pageTitle: isEdit ? 'Edit Entry' : 'New Entry',
      title: req.body.title || '',
      content: req.body.content || '',
      mood: req.body.mood || 'neutral',
      errors,
      journal: isEdit ? { id } : null,
      moods: MOODS,
      formAction: isEdit ? `/journals/${id}?_method=PUT` : '/journals',
      submitLabel: isEdit ? 'Save Changes' : 'Create Entry',
    });
  }

  next();
}

module.exports = validateJournal;
