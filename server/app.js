// server/app.js
const path = require('path');

const express = require('express');
const morgan = require('morgan');

const app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

/*
 * app.use('/api/hello', (req, res, next) => {
 *   res.status(200).json({hello: 'Hello World!'});
 *   next();
 * });
 */

/*
 * Always return the main index.html, so react-router render the route in the client
 * app.get('*', (req, res) => {
 *   res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
 * });
 */

module.exports = app;
