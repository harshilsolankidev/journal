function notFoundHandler(req, res) {
  res.status(404).render('errors/404', {
    pageTitle: 'Page Not Found',
    message: 'The page you are looking for does not exist.',
  });
}

function errorHandler(err, req, res, _next) {
  console.error('[Error]', err.message);

  const status = err.status || 500;
  const message =
    status === 500
      ? 'Something went wrong on our end. Please try again.'
      : err.message;

  if (req.accepts('html')) {
    return res.status(status).render('errors/error', {
      pageTitle: status === 404 ? 'Not Found' : 'Error',
      status,
      message,
    });
  }

  res.status(status).json({ error: message });
}

module.exports = { notFoundHandler, errorHandler };
