const selectNotification = ({ userRepository, notificationRepository }) => {
  return async function select(user, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!");
    }
    const notifications = await notificationRepository.getNotifications(loggedInUser.id, query);
    const allnotifications = await notificationRepository.getAllNotificationsOfUser(loggedInUser.id);

    return {
      notifications: notifications,
      count: notifications.length,
      totalCount: allnotifications.length,
    };
  };
};

module.exports = selectNotification;
