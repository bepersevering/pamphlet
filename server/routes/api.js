const express = require('express');
const router = express.Router();

router.get('/api/hello', function(req, res, next){
    res.status(200).json({"hello" : "Hello World!"});
    next();
});

module.exports = router;
