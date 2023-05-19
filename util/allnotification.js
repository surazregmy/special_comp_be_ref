const notificationRepository = require("../data-access/notification");
const userRepository = require("../data-access/user");
const { sendMail } = require("../util/emailUtils");

const sendAllNotification = async (
  senderId,
  receiverId,
  type,
  subject,
  bodyPlain,
  bodyHtml
) => {
  try {
    console.log(
      "sendAllNotification: notification",
      senderId,
      receiverId,
      type,
      subject,
      bodyPlain
    );
    const user = await userRepository.getOne(receiverId);
    // notification Repository
    notificationRepository.add({
      senderId,
      receiverId,
      type,
      subject,
      message: bodyPlain,
    });
    // mail
    sendMail({
      to: user.email,
      from: "specialcompass@gmail.com",
      subject,
      text: "text",
      html: bodyHtml,
    });
  } catch (error) {
    console.log("Error in Notifiying");
    console.log(error);
  }
};

module.exports = { sendAllNotification };
