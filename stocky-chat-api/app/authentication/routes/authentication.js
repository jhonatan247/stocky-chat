const AuthenticationController = require('../controllers')
  .AuthenticationController;

var router = require('express').Router();

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
