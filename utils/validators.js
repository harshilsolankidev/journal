const { MOOD_VALUES } = require('./constants');

function isNonEmptyString(value, maxLength = 5000) {
  return (
    typeof value === 'string' &&
    value.trim().length > 0 &&
    value.trim().length <= maxLength
  );
}

function validateJournalInput({ title, content, mood }) {
  const errors = [];

  if (!isNonEmptyString(title, 200)) {
    errors.push('Title is required (max 200 characters).');
  }

  if (!isNonEmptyString(content, 10000)) {
    errors.push('Content is required (max 10,000 characters).');
  }

  if (!mood || !MOOD_VALUES.includes(mood)) {
    errors.push('Please select a valid mood.');
  }

  return errors;
}

function sanitizeSearchQuery(query) {
  if (typeof query !== 'string') return '';
  return query.trim().slice(0, 100);
}

module.exports = { validateJournalInput, sanitizeSearchQuery, isNonEmptyString };
