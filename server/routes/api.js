const express = require('express');

const router = express.Router();

router.get('/api/hello', (req, res, next) => {
  res.status(200).json({hello: 'Hello World!'});
  next();
});

module.exports = router;
