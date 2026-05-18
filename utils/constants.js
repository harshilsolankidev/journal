const APP_NAME = 'JournalFlow';
const APP_TAGLINE = 'capture your thoughts, track your mood.';

const MOODS = [
  { value: 'happy', label: 'Happy', emoji: '😊', color: 'amber' },
  { value: 'grateful', label: 'Grateful', emoji: '🙏', color: 'emerald' },
  { value: 'excited', label: 'Excited', emoji: '🎉', color: 'orange' },
  { value: 'neutral', label: 'Neutral', emoji: '😐', color: 'slate' },
  { value: 'anxious', label: 'Anxious', emoji: '😰', color: 'violet' },
  { value: 'sad', label: 'Sad', emoji: '😢', color: 'blue' },
];

const MOOD_VALUES = MOODS.map((m) => m.value);
const DATA_FILE = 'journals.json';

module.exports = { APP_NAME, APP_TAGLINE, MOODS, MOOD_VALUES, DATA_FILE };
