const journalService = require('../services/journalService');
const { MOODS } = require('../utils/constants');

function getViewLocals() {
  return { moods: MOODS };
}

async function dashboard(req, res) {
  const stats = await journalService.getDashboardStats();
  res.render('dashboard', {
    pageTitle: 'Dashboard',
    ...getViewLocals(),
    stats,
  });
}

async function listJournals(req, res) {
  const search = req.query.q || '';
  const journals = await journalService.getAllJournals(search);
  res.render('journal/index', {
    pageTitle: 'My Journals',
    ...getViewLocals(),
    journals,
    search,
  });
}

async function showJournal(req, res) {
  const journal = await journalService.getJournalById(req.params.id);
  res.render('journal/show', {
    pageTitle: journal.title,
    ...getViewLocals(),
    journal,
  });
}

async function newJournalForm(req, res) {
  res.render('journal/form', {
    pageTitle: 'New Entry',
    ...getViewLocals(),
    journal: null,
    title: '',
    content: '',
    mood: 'neutral',
    errors: [],
    formAction: '/journals',
    submitLabel: 'Create Entry',
  });
}

async function createJournal(req, res) {
  const entry = await journalService.createJournal(req.body);
  res.redirect(`/journals/${entry.id}?flash=created`);
}

async function editJournalForm(req, res) {
  const journal = await journalService.getJournalById(req.params.id);
  res.render('journal/form', {
    pageTitle: 'Edit Entry',
    ...getViewLocals(),
    journal,
    title: journal.title,
    content: journal.content,
    mood: journal.mood,
    errors: [],
    formAction: `/journals/${journal.id}?_method=PUT`,
    submitLabel: 'Save Changes',
  });
}

async function updateJournal(req, res) {
  await journalService.updateJournal(req.params.id, req.body);
  res.redirect(`/journals/${req.params.id}?flash=updated`);
}

async function deleteJournal(req, res) {
  await journalService.deleteJournal(req.params.id);
  res.redirect('/journals?flash=deleted');
}

module.exports = {
  dashboard,
  listJournals,
  showJournal,
  newJournalForm,
  createJournal,
  editJournalForm,
  updateJournal,
  deleteJournal,
};
