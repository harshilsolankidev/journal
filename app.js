const express = require('express');
const path = require('path');
const routes = require('./routes');
const flashMiddleware = require('./middleware/flash');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');
const dateHelper = require('./utils/dateHelper');
const { APP_NAME } = require('./utils/constants');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.formatDate = dateHelper.formatDate;
  res.locals.formatDateTime = dateHelper.formatDateTime;
  res.locals.formatRelative = dateHelper.formatRelative;
  res.locals.appName = APP_NAME;
  next();
});

app.use(flashMiddleware);

app.use((req, res, next) => {
  if (req.query._method) {
    req.method = req.query._method.toUpperCase();
  }
  next();
});

app.use(routes);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`${APP_NAME} running at http://localhost:${PORT}`);
});

module.exports = app;
