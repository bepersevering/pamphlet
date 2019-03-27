
const compression = require('compression');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const uuid = require('uuid');
const createNamespace = require('continuation-local-storage').createNamespace;

const myRequest = createNamespace('myRequest');

// Make sure to include the JSX transpiler
require('node-jsx').install();

module.exports = function(app) {
  app.use(compression());

  app.use(bodyParser());

  app.use(bodyParser.json()); // Support json encoded bodies
  app.use(bodyParser.urlencoded({extended: true})); // Support encoded bodies
  app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

  // app.use(morgan('dev'));
  app.use((req, res, next) => {
    myRequest.run(() => {
      req.reqId = uuid.v4();
      res.set('req-id', req.reqId);
      myRequest.set('reqId', req.reqId);
      next();
    });
  });
  morgan.token('hostname', (req) => (req.hostname || '-'));
  morgan.token('login-user-id', (req) => {
    if (req.user) {
      return req.user.userId;
    }
    return '-';
  });
  morgan.token('request-body', (req) => {
    if (req.body) {
      return JSON.stringify(req.body);
    }
    return '-';
  });
  morgan.token('req-id', (req) => (req.reqId || '-'));
  morgan.format('access-log', '[:date[iso]] :hostname :remote-addr :login-user-id ":method :url HTTP/:http-version" ":request-body" :status :res[content-length] :response-time ms ":referrer" ":user-agent" ":req-id"');
  app.use(morgan('access-log'));

};
