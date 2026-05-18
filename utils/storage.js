const fs = require('fs/promises');
const path = require('path');
const { DATA_FILE } = require('./constants');

const dataPath = path.join(__dirname, '..', 'data', DATA_FILE);

async function ensureDataFile() {
  try {
    await fs.access(dataPath);
  } catch {
    await fs.mkdir(path.dirname(dataPath), { recursive: true });
    await fs.writeFile(dataPath, JSON.stringify([], null, 2), 'utf-8');
  }
}

async function readJournals() {
  await ensureDataFile();
  const raw = await fs.readFile(dataPath, 'utf-8');
  const parsed = JSON.parse(raw);
  return Array.isArray(parsed) ? parsed : [];
}

async function writeJournals(journals) {
  await ensureDataFile();
  await fs.writeFile(dataPath, JSON.stringify(journals, null, 2), 'utf-8');
}

module.exports = { readJournals, writeJournals, dataPath };
