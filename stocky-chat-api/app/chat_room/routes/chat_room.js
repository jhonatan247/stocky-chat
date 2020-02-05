const AuthenticationController = require('../../authentication/controllers')
  .AuthenticationController;
const ChatRoomController = require('../controllers').ChatRoomController;

var router = require('express').Router();

router.post('/', AuthenticationController.authorize, ChatRoomController.add);
router.get('/', AuthenticationController.authorize, ChatRoomController.getAll);

router.post(
  '/:chatRoomId/',
  AuthenticationController.authorize,
  ChatRoomController.sendMessage
);
router.get(
  '/:chatRoomId/',
  AuthenticationController.authorize,
  ChatRoomController.getLastMessages
);

module.exports = router;
