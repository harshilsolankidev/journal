const { v4: uuidv4 } = require('uuid');
const { readJournals, writeJournals } = require('../utils/storage');
const { sanitizeSearchQuery } = require('../utils/validators');
const { MOODS } = require('../utils/constants');

function getMoodMeta(mood) {
  return MOODS.find((m) => m.value === mood) || MOODS[3];
}

function sortByDateDesc(journals) {
  return [...journals].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
}

function matchesSearch(journal, query) {
  if (!query) return true;
  const lower = query.toLowerCase();
  return (
    journal.title.toLowerCase().includes(lower) ||
    journal.content.toLowerCase().includes(lower) ||
    journal.mood.toLowerCase().includes(lower)
  );
}

async function getAllJournals(search = '') {
  const query = sanitizeSearchQuery(search);
  const journals = await readJournals();
  const filtered = journals.filter((j) => matchesSearch(j, query));
  return sortByDateDesc(filtered).map((j) => ({
    ...j,
    moodMeta: getMoodMeta(j.mood),
  }));
}

async function getJournalById(id) {
  const journals = await readJournals();
  const journal = journals.find((j) => j.id === id);
  if (!journal) {
    const err = new Error('Journal entry not found.');
    err.status = 404;
    throw err;
  }
  return { ...journal, moodMeta: getMoodMeta(journal.mood) };
}

async function createJournal({ title, content, mood }) {
  const journals = await readJournals();
  const now = new Date().toISOString();
  const entry = {
    id: uuidv4(),
    title: title.trim(),
    content: content.trim(),
    mood,
    createdAt: now,
    updatedAt: now,
  };
  journals.push(entry);
  await writeJournals(journals);
  return entry;
}

async function updateJournal(id, { title, content, mood }) {
  const journals = await readJournals();
  const index = journals.findIndex((j) => j.id === id);
  if (index === -1) {
    const err = new Error('Journal entry not found.');
    err.status = 404;
    throw err;
  }
  journals[index] = {
    ...journals[index],
    title: title.trim(),
    content: content.trim(),
    mood,
    updatedAt: new Date().toISOString(),
  };
  await writeJournals(journals);
  return journals[index];
}

async function deleteJournal(id) {
  const journals = await readJournals();
  const index = journals.findIndex((j) => j.id === id);
  if (index === -1) {
    const err = new Error('Journal entry not found.');
    err.status = 404;
    throw err;
  }
  const [removed] = journals.splice(index, 1);
  await writeJournals(journals);
  return removed;
}

async function getDashboardStats() {
  const journals = await readJournals();
  const moodCounts = {};
  MOODS.forEach((m) => {
    moodCounts[m.value] = 0;
  });
  journals.forEach((j) => {
    if (moodCounts[j.mood] !== undefined) moodCounts[j.mood]++;
  });

  const recent = sortByDateDesc(journals).slice(0, 5).map((j) => ({
    ...j,
    moodMeta: getMoodMeta(j.mood),
  }));

  const today = new Date().toDateString();
  const entriesToday = journals.filter(
    (j) => new Date(j.createdAt).toDateString() === today
  ).length;

  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const entriesThisWeek = journals.filter(
    (j) => new Date(j.createdAt) >= weekAgo
  ).length;

  let topMood = null;
  let topMoodCount = 0;
  MOODS.forEach((m) => {
    if (moodCounts[m.value] > topMoodCount) {
      topMoodCount = moodCounts[m.value];
      topMood = m;
    }
  });

  return {
    totalEntries: journals.length,
    entriesToday,
    entriesThisWeek,
    topMood,
    topMoodCount,
    moodCounts,
    moods: MOODS,
    recent,
  };
}

module.exports = {
  getAllJournals,
  getJournalById,
  createJournal,
  updateJournal,
  deleteJournal,
  getDashboardStats,
};
