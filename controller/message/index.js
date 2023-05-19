const {
  sendMessageSer,
  getMessageSer,
  getNoOfUnreadMessageSer,
  getRecentChatSer,
  markMessageSer,
} = require("../../use-case/message");
// #########

const sendMessageFun = require("./send-message");
const markMessageFun = require("./mark-message");
const getMessageFun = require("./get-message");
const getNoOfUnreadMessageFun = require("./get-no-of-unread-message");
const getRecentChatFun = require("./get-recent-chat");

// #########

const sendMessageController = sendMessageFun({
  sendMessageSer,
});

const markMessageController = markMessageFun({
  markMessageSer,
});

const getMessageController = getMessageFun({
  getMessageSer,
});

const getNoOfUnreadMessageController = getNoOfUnreadMessageFun({
  getNoOfUnreadMessageSer,
});

const geRecentChatController = getRecentChatFun({
  getRecentChatSer,
});

const services = Object.freeze({
  sendMessageController,
  getMessageController,
  markMessageController,
  geRecentChatController,
  getNoOfUnreadMessageController,
});

module.exports = services;
