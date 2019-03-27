const helloController = require('../hello/helloController');


// The config argument is currently not being used
const route = function(app) {
  // Add authentication, can only access self's feed

  // app.get('/api/whoami', );
  app.get('/api/hello', helloController.sayHello);
};

module.exports = {route};
