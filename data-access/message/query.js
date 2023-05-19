const { prisma } = require("@prisma/client");

const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    getByRefreshToken,
    getByIdAndCode,
    getmessages,
    getmessagesTotal,
    getByPSUserId,
    getMessageHistoryWithAnotherUser,
    getMessageHistoryWithAnotherUserTotal,
    getRecentChatUser,
    updateReadByReceiver,
    markMessages,
    getUnreadMessageGroupBy,
    getCountOfUnreadMessages,
    getCountOfUnreadMessagesWithSender,
  });
  async function get() {
    return prismaService.message.findMany();
  }
  async function getOne(id) {
    return prismaService.message.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function getByPSUserId(psId) {
    return prismaService.message.findMany({
      where: {
        postSecondaryId: psId,
      },
      include: {
        student: {
          select: {
            email: true,
            fullName: true,
            role: true,
          },
        },
      },
    });
  }

  async function updateReadByReceiver(senderId, receiverId) {
    console.log("Sender id is " + senderId);
    console.log("Receiver id is " + receiverId);
    return prismaService.message.updateMany({
      where: {
        user1Id: senderId,
        user2Id: receiverId,
      },
      data: { isReadByReceiver: true },
    });
  }

  async function markMessages(ids, isReadByReceiver) {
    // console.log("IDs are");
    // console.log(ids);
    return prismaService.message.updateMany({
      where: {
        id: { in: ids },
      },
      data: { isReadByReceiver: isReadByReceiver },
    });
  }
  async function getUnreadMessageGroupBy() {
    let totalUnread = prismaService.message.groupBy({
      by: ["user2Id", "receiverEmail"],
      _count: {
        message: true,
      },
      where: {
        isReadByReceiver: false,
      },
    });

    let unreadAndNotified = prismaService.message.groupBy({
      by: ["user2Id", "receiverEmail"],
      _count: {
        message: true,
      },
      where: {
        isReadByReceiver: false,
        isNotificationSent: true,
      },
    });

    return totalUnread > unreadAndNotified ? totalUnread : unreadAndNotified;
  }

  async function getCountOfUnreadMessages(user2Id) {
    return prismaService.message.groupBy({
      by: ["user2Id", "receiverEmail"],
      _count: {
        message: true,
      },
      where: {
        isReadByReceiver: false,
        user2Id: user2Id,
      },
    });
  }

  async function getCountOfUnreadMessagesWithSender(user2Id, user1Id) {
    return prismaService.message.groupBy({
      by: ["user2Id", "receiverEmail"],
      _count: {
        message: true,
      },
      where: {
        isReadByReceiver: false,
        user2Id: user2Id,
        user1Id: user1Id,
      },
    });
  }

  async function getMessageHistoryWithAnotherUser(senderId, ReceiverId, query) {
    const { page, size, searchKey } = query;
    return prismaService.message.findMany({
      where: {
        OR: [
          {
            user1Id: senderId,
            user2Id: ReceiverId,
          },
          {
            user2Id: senderId,
            user1Id: ReceiverId,
          },
        ],
      },
      include: {
        user1: {
          select: {
            email: true,
            fullName: true,
          },
        },
        user2: {
          select: {
            email: true,
            fullName: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip: Number(page - 1) * Number(size),
      take: Number(size),
    });
  }

  async function getRecentChatUser(userId, query) {
    const { page, size, searchKey } = query;

    const ids = await prismaService.message.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        OR: [
          {
            user1Id: userId,
          },
          {
            user2Id: userId,
          },
        ],
      },
      select: {
        user1Id: true,
        user2Id: true,
      },
    });

    // console.log(ids);
    let userSet = new Set();
    for (const convId of ids) {
      userSet.add(convId.user1Id);
      userSet.add(convId.user2Id);
    }
    let arrayOfRecent = [];
    for (let a of Array.from(userSet)) {
      if (a !== userId) {
        const user = await prismaService.user.findFirst({
          where: {
            id: a,
            OR: [
              {
                email: {
                  contains: searchKey || "",
                  mode: "insensitive",
                },
              },
              {
                fullName: {
                  contains: searchKey || "",
                  mode: "insensitive",
                },
              },
            ],
          },
          select: {
            id: true,
            email: true,
            fullName: true,
          },
        });
        if (user != null) {
          arrayOfRecent.push(user);
        }
      }
    }
    return arrayOfRecent;
  }

  async function getMessageHistoryWithAnotherUserTotal(
    senderId,
    ReceiverId,
    query
  ) {
    return prismaService.message.findMany({
      where: {
        OR: [
          {
            user1Id: senderId,
            user2Id: ReceiverId,
          },
          {
            user2Id: senderId,
            user1Id: ReceiverId,
          },
        ],
      },
      include: {
        user1: {
          select: {
            email: true,
            fullName: true,
          },
        },
        user2: {
          select: {
            email: true,
            fullName: true,
          },
        },
      },
    });
  }

  async function getByRefreshToken(refreshToken) {
    return prismaService.message.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
  }

  async function getByIdAndCode(id, code) {
    return prismaService.message.findFirst({
      where: {
        id: id,
        verificationToken: code,
      },
    });
  }

  async function add(model) {
    console.log("model");
    console.log(model);
    return prismaService.message.create({
      data: model,
    });
  }

  async function getmessages(query, profileId) {
    const { page, size, searchKey } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.message.findMany({
      where: {
        profileId: profileId,
      },
      include: {
        profile: {
          include: {
            user: {
              select: {
                email: true,
                fullName: true,
                role: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      skip: Number(page - 1) * Number(size),
      take: Number(size),
    });
  }

  async function getmessagesTotal(query, profileId) {
    const { page, size, searchKey } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.message.findMany({
      where: {
        profileId: profileId,
      },
      include: {
        profile: {
          include: {
            user: {
              select: {
                email: true,
                fullName: true,
                role: true,
              },
            },
          },
        },
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }

  async function update(id, model) {
    return prismaService.message.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.message.delete({
      where: {
        id: id,
      },
    });
  }
};

module.exports = query;
