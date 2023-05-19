const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    getNotificationsOfUser,
    getNotifications,
    getAllNotificationsOfUser,
    getNotificationsByUserIdAndId,
  });
  async function get() {
    return prismaService.notification.findMany();
  }
  async function getOne(id) {
    return prismaService.notification.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function getNotificationsOfUser(id) {
    return prismaService.notification.findMany({
      where: {
        receiverId: id,
      },
      orderBy: { createdAt: "desc" },
    });
  }
  async function getNotifications(id, query) {
    const { page, size } = query;
    console.log("getNotificationsOfUser = ", page, size);
    return prismaService.notification.findMany({
      where: {
        receiverId: id,
      },
      orderBy: { createdAt: "desc" },
      skip: Number(page - 1) * Number(size),
      take: Number(size),
    });
  }
  async function getAllNotificationsOfUser(id) {
    return prismaService.notification.findMany({
      where: {
        receiverId: id,
      }
    });
  }

  async function getNotificationsByUserIdAndId(userId, notificationId) {
    return prismaService.notification.findFirst({
      where: {
        receiverId: userId,
        id: notificationId,
      },
    });
  }

  async function add(model) {
    console.log("Notification model : ", model);
    return prismaService.notification.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.notification.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.notification.delete({
      where: {
        id: id,
      },
    });
  }
};

module.exports = query;
