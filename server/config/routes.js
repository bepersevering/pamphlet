/* eslint no-process-env: 0 */

const commonRoutes = require('../routes/commonRoutes');

module.exports = function(app) {
  commonRoutes.route(app);
};
