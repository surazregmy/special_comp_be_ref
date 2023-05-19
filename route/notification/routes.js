const {
  selectNotificationController,
  markNotificationController,
} = require("../../controller/notification");

const loggedInVerify = require("../../middleware/verifyLoggedIn");

const route = ({ router, makeExpressCallback }) => {
  router.get(
    "/",
    loggedInVerify,
    makeExpressCallback(selectNotificationController)
  );
  router.post(
    "/",
    loggedInVerify,
    makeExpressCallback(markNotificationController)
  );
  return router;
};

module.exports = route;
