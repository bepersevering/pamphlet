/* eslint no-process-env: 0 */
const express = require('express');

// import configLoad from './config/config';

const nodeEnv = process.env.NODE_ENV || 'development';

const PORT = process.env.PORT || 5000;

const app = express();

let logConfig = {log:   {level: 'info'}};

// eslint-disable-next-line no-unused-vars
let routesPath = 'Dev';

if (nodeEnv === 'production') {
  routesPath = '';
  logConfig = {log:   {level: 'error'}};
}

/**
 * first load when the app start
 * @return {void} no return value
 * @author jasonxu
 */
async function appLoad() {
  // firsted init logger
  global.logger = require('./config/loggerConfig')(logConfig);

  console.info('express');
  require('./config/express')(app);

  console.info('routes');
  require('./config/routes')(app);

  console.info('errorHandler');
  require('./config/errorHandler')(app);

  app.listen(PORT);

  console.log(`Listening on port ${PORT}...`);
}

// load
appLoad();
