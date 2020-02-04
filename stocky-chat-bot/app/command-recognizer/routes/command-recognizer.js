const CommandRecognizerController = require('../controllers')
  .CommandRecognizerController;

var router = require('express').Router();

router.post('/', CommandRecognizerController.recognizeCommnad);

module.exports = router;
