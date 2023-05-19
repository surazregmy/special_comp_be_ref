const userRepository = require("../../data-access/user");
const profileRepository = require("../../data-access/profile");

const sendInvitationLinkFun = require("./send-invite-to-ps");

const sendInvitationLinkSer = sendInvitationLinkFun({
  profileRepository,
  userRepository,
});

const services = Object.freeze({
  sendInvitationLinkSer,
});

module.exports = services;
