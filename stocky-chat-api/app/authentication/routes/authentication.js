const AuthenticationController = require('../controllers')
  .AuthenticationController;
const AccountController = require('../controllers').AccountController;

var router = require('express').Router();

router.post('/sign-up', AccountController.register);
router.post('/login', AuthenticationController.authenticate);
router.post(
  '/login-with-token',
  AuthenticationController.authenticateWithToken
);
router.post(
  '/sign-out',
  AuthenticationController.authorize,
  AuthenticationController.disavow
);

module.exports = router;
