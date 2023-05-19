const { sendInvitationLinkSer } = require("../../use-case/admin");
// #########

const sendInvitationLinkFun = require("./send-invite-to-ps");

// #########

const sendInvitationLinkController = sendInvitationLinkFun({
  sendInvitationLinkSer,
});

// #########
const services = Object.freeze({
  sendInvitationLinkController,
});

module.exports = services;
