module.exports = function(app) {
  app.use(errorHandler);
  function errorHandler(err, req, res, next) {
    if (res.headersSent) {
      return next(err);
    }

    return res.sendError(err);
  }
};
