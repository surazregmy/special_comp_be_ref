const userRepository = require("../../data-access/user");
const documentRepository = require("../../data-access/document");
const profileRepository = require("../../data-access/profile");
const messageRepository = require("../../data-access/message");
const { unreadMessageEmail } = require("../auth/forget_emailcontent");
const { sendMail } = require("../../util/emailUtils");

const sendUnReadEmail = async () => {
  const users = await messageRepository.getUnreadMessageGroupBy();

  for (const user of users) {
    html = unreadMessageEmail(user.receiverEmail, user._count.message);
    sendMail({
      to: user.receiverEmail,
      from: "test",
      subject: "You have new unread messages",
      text: "text",
      html: html,
    });

  // TODO: every user ---- isNotificationSent:true 

  }




  // console.log(users);
  console.log("Sending messages to " + users.length + " users");
};

module.exports = sendUnReadEmail;
