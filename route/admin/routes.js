const { sendInvitationLinkController } = require("../../controller/admin");

const verifyAdminMemberJWT = require("../../middleware/verifyAdminPersonJWT");

const validateRequestSchema = require("../../middleware/validate-request-schema");
const { body } = require("express-validator");
const { createShiftBodyValidator } = require("../../validation/shift");

const route = ({ router, makeExpressCallback }) => {
  router.post(
    "/send-invitation-ps",
    verifyAdminMemberJWT,
    makeExpressCallback(sendInvitationLinkController)
  );

  return router;
};

module.exports = route;
