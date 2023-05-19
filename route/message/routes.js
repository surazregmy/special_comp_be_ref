const {
  sendMessageController,
  markMessageController,
  getMessageController,
  getNoOfUnreadMessageController,
  geRecentChatController,
} = require("../../controller/message");

const verifyLoggedIn = require("../../middleware/verifyLoggedIn");

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const cuUploadAL = upload.fields([{ name: "attachment", maxCount: 1 }]);

const route = ({ router, makeExpressCallback }) => {
  router.post(
    "/send-message",
    verifyLoggedIn,
    cuUploadAL,
    makeExpressCallback(sendMessageController)
  );

  router.get(
    "/get-message/:receiverId",
    verifyLoggedIn,
    makeExpressCallback(getMessageController)
  );

  router.get(
    "/get-no-unread-messages",
    verifyLoggedIn,
    makeExpressCallback(getNoOfUnreadMessageController)
  );

  router.get(
    "/get-users",
    verifyLoggedIn,
    makeExpressCallback(geRecentChatController)
  );

  router.post(
    "/mark",
    verifyLoggedIn,
    makeExpressCallback(markMessageController)
  );

  return router;
};

module.exports = route;
