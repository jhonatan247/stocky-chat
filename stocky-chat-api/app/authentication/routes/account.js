const AccountController = require('../controllers').AccountController;

var router = require('express').Router();

router.post('/', AccountController.register);

module.exports = router;
