const AccountController = require('../controllers').AccountController;
const AuthenticationController = require('../controllers')
  .AuthenticationController;

var router = require('express').Router();

router.post('/', AccountController.register);

module.exports = router;
