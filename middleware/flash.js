const FLASH_MESSAGES = {
  created: { type: 'success', message: 'Journal entry created.' },
  updated: { type: 'success', message: 'Journal entry updated.' },
  deleted: { type: 'success', message: 'Journal entry deleted.' },
};

function flashMiddleware(req, res, next) {
  if (req.query.flash && FLASH_MESSAGES[req.query.flash]) {
    res.locals.flash = FLASH_MESSAGES[req.query.flash];
  }
  next();
}

module.exports = flashMiddleware;
