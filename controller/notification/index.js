const {
  selectNotificationSer,
  markNotificationSer,
} = require("../../use-case/notification");

// #########

const selectNotificationFun = require("./select-notification");
const markNotificationFun = require("./mark-notification");

// #########

const selectNotificationController = selectNotificationFun({
  selectNotificationSer,
});

const markNotificationController = markNotificationFun({
  markNotificationSer,
});

// #########
const services = Object.freeze({
  selectNotificationController,
  markNotificationController,
});

module.exports = services;