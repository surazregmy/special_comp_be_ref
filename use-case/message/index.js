const userRepository = require("../../data-access/user");
const documentRepository = require("../../data-access/document");
const profileRepository = require("../../data-access/profile");
const messageRepository = require("../../data-access/message");

const sendMessageFun = require("./send-message");
const getMessageFun = require("./get-message");
const getNoOfUnreadMessageFun = require("./get-no-of-unread-messages");
const markMessageFun = require("./mark-message");
const getRecentChatFun = require("./get-recent-chat");

const sendMessageSer = sendMessageFun({
  userRepository,
  profileRepository,
  messageRepository,
});

const getMessageSer = getMessageFun({
  userRepository,
  profileRepository,
  messageRepository,
});

const getNoOfUnreadMessageSer = getNoOfUnreadMessageFun({
  userRepository,
  profileRepository,
  messageRepository,
});

const markMessageSer = markMessageFun({
  userRepository,
  profileRepository,
  messageRepository,
});

const getRecentChatSer = getRecentChatFun({
  userRepository,
  profileRepository,
  messageRepository,
});

const services = Object.freeze({
  sendMessageSer,
  markMessageSer,
  getMessageSer,
  getRecentChatSer,
  getNoOfUnreadMessageSer,
});

module.exports = services;
module.exports = {
  sendMessageSer,
  markMessageSer,
  getMessageSer,
  getRecentChatSer,
  getNoOfUnreadMessageSer,
};
