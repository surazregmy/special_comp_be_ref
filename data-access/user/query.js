const { Role } = require("@prisma/client");

const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    getByEmail,
    getByRefreshToken,
    getByIdAndCode,
    getUserWithProfile,
    getWithPage,
    getOnlyStudents,
    getOnlyStudentsTotal,
    getOnlyHPs,
    getOnlyHPsTotal,
    getStudentsNotHPClients,
    getByEmailForDocs,
    getPointOfContact,
    getPointOfContactByInstitution,
  });
  async function get() {
    return prismaService.user.findMany();
  }

  async function getOne(id) {
    return prismaService.user.findFirst({
      where: {
        id: id,
      },
      include: {
        profile: {
          include: {
            documents: true,
          },
        },
        institution: true,
      },
    });
  }

  async function getPointOfContactByInstitution(institutionId) {
    return prismaService.user.findFirst({
      where: {
        institutionId: institutionId,
        role: "POST_SECONDARY_INS",
        isPointOfContact: true,
      },
    });
  }

  async function getPointOfContact(institutionId) {
    return prismaService.user.findFirst({
      where: {
        institutionId: institutionId,
        isPointOfContact: true,
      },
    });
  }

  async function getWithPage({ page, size }, searchKey) {
    if (searchKey) {
      return prismaService.user.findMany({
        include: {
          profile: {
            include: {
              address: true,
              educations: true,
              availabilities: true,
            },
          },
        },
        where: {
          role: "USER",
          OR: [
            {
              email: {
                contains: searchKey,
                mode: "insensitive",
              },
            },
            {
              profile: {
                firstName: {
                  contains: searchKey,
                  mode: "insensitive",
                },
              },
            },
          ],
        },
        orderBy: {
          fullName: "asc",
        },
        skip: Number(page - 1) * Number(size),
        take: Number(size),
      });
    } else {
      return prismaService.user.findMany({
        where: {
          role: "USER",
        },
        include: {
          profile: {
            include: {
              address: true,
              educations: true,
              availabilities: true,
            },
          },
        },
        orderBy: {
          fullName: "asc",
        },
        skip: Number(page - 1) * Number(size),
        take: Number(size),
      });
    }
  }

  async function getUserWithProfile(id) {
    return prismaService.user.findFirst({
      include: {
        profile: true,
      },
      where: {
        id: id,
      },
    });
  }

  async function getByEmail(email) {
    return prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
  }
  async function getByEmailForDocs(email) {
    return prismaService.user.findUnique({
      include: {
        institution: true,
      },
      where: {
        email: email,
      },
    });
  }

  async function getOnlyStudents(query) {
    const { page, size, searchKey, status, institutionId } = query;
    console.log("query inside \n", query);

    let filters = {
      role: Role.STUDENT,
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
    };
    if (status) {
      if (status == "approved") {
        filters.profileApproved = true;
      } else if (status == "pending") {
        filters.profileApproved = false;
      }
    }
    if (institutionId) {
      filters.institutionId = institutionId;
    }

    return prismaService.user.findMany({
      where: filters,
      orderBy: {
        fullName: "asc",
      },
      include: {
        profile: true,
      },
      skip: Number(page - 1) * Number(size),
      take: Number(size),
    });
  }

  async function getOnlyHPs(query) {
    const { page, size, searchKey, status } = query;
    console.log("query inside");
    console.log(query);
    if (status == "" || status == null) {
      return prismaService.user.findMany({
        where: {
          role: Role.HEALTH_PROVIDER,
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
        include: {
          profile: true,
        },
        orderBy: { fullName: "asc" },
        skip: Number(page - 1) * Number(size),
        take: Number(size),
      });
    } else {
      console.log("Status is passed");
      console.log("Status is in the gwtquer");
      let profileStatus = null;
      if (status == "approved") {
        profileStatus = true;
      } else if (status == "pending") {
        profileStatus = false;
      }
      console.log("ProfileStatus");
      console.log(profileStatus);
      return prismaService.user.findMany({
        where: {
          role: Role.HEALTH_PROVIDER,
          profileApproved: profileStatus,
        },
        include: {
          profile: true,
        },
        orderBy: { fullName: "asc" },
        skip: Number(page - 1) * Number(size),
        take: Number(size),
      });
    }
  }
  async function getOnlyStudentsTotalStatus(query) {
    const { page, size, searchKey } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.user.findMany({
      where: {
        role: Role.STUDENT,
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
        AND: [
          {
            profileApproved: {
              equals: profileStatus,
            },
          },
        ],
      },
      include: {
        profile: true,
      },
    });
  }

  async function getOnlyStudentsTotal(query) {
    const { page, size, searchKey, status, institutionId } = query;
    console.log("query inside \n", query);

    let filters = {
      role: Role.STUDENT,
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
    };
    if (status) {
      if (status == "approved") {
        filters.profileApproved = true;
      } else if (status == "pending") {
        filters.profileApproved = false;
      }
    }
    if (institutionId) {
      filters.institutionId = institutionId;
    }

    return prismaService.user.findMany({
      where: filters,
      orderBy: {
        fullName: "asc",
      },
      include: {
        profile: true,
      },
    });
  }

  async function getOnlyHPsTotal(query) {
    const { page, size, searchKey } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.user.findMany({
      where: {
        role: Role.HEALTH_PROVIDER,
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
      include: {
        profile: true,
      },
    });
  }

  async function getByRefreshToken(refreshToken) {
    return prismaService.user.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
  }

  async function getByIdAndCode(id, code) {
    return prismaService.user.findFirst({
      where: {
        id: id,
        verificationToken: code,
      },
    });
  }

  async function add(model) {
    return prismaService.user.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.user.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.user.delete({
      where: {
        id: id,
      },
    });
  }

  async function getStudentsNotHPClients(query, user, existingStudents) {
    const { page, size, searchKey, status, institutionId } = query;
    console.log("query inside \n", query);

    let filters = {
      role: Role.STUDENT,
      isVerified: true,
      isBannedByAdmin: false,
      profileApproved: true,
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
    };
    if (status) {
      if (status == "approved") {
        filters.profileApproved = true;
      } else if (status == "pending") {
        filters.profileApproved = false;
      }
    }
    if (institutionId) {
      filters.institutionId = institutionId;
    }
    filters.id = {
      notIn: existingStudents,
    };
    // filters.NOT = {
    //   clientRequestToStudent: {
    //     some: {
    //       id: user.id
    //     }
    //   },

    //   // clientRequestFromHP:{
    //   //   some: {
    //   //     id: user.id
    //   //   }
    //   // }
    // }
    // // filters.id = {
    // //   not:  user.id
    // // }
    return prismaService.user.findMany({
      where: filters,
      orderBy: {
        fullName: "asc",
      },
      include: {
        profile: true,
      },
      skip: Number(page - 1) * Number(size),
      take: Number(size),
    });
  }
};

module.exports = query;
