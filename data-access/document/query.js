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
    getDocuments,
    getDocumentsTotal,
    getDocumentsHP,
    getDocumentsHPTotal,
    getDocumentsHPAndStudent,
    getDocumentsHPAndStudentTotal,
    getByUserIdAndDocumentId,
    getDocumentsFromPSwithStudentAccess,
    getDocumentsFromPSwithStudentAccessTotal,
    getDocumentsFromPSwithHPAccess,
    getDocumentsFromPSwithHPAccessTotal,
    getDocumentsOfStudentWithAllHp,
    getDocumentsOfStudentWithAllHpTotal,
    getDocumentsForStudentsList,
    getDocumentsUploadedByStudent,
    getDocumentsUploadedByStudentTotal,
    getDocumentsForPSForInst,
    getDocumentsForPSForInstTotal,
  });
  async function get() {
    return prismaService.document.findMany();
  }
  async function getOne(id) {
    return prismaService.document.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function getByUserIdAndDocumentId(profileId, id) {
    return prismaService.document.findFirst({
      where: {
        id: id,
        profileId: profileId,
      },
    });
  }

  async function getByEmail(email) {
    return prismaService.document.findUnique({
      where: {
        email: email,
      },
    });
  }

  async function getByRefreshToken(refreshToken) {
    return prismaService.document.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
  }

  async function getByIdAndCode(id, code) {
    return prismaService.document.findFirst({
      where: {
        id: id,
        verificationToken: code,
      },
    });
  }

  async function add(model) {
    console.log("model");
    console.log(model);
    return prismaService.document.create({
      data: model,
    });
  }

  async function getDocuments(query, profileId) {
    const { page, size, searchKey, access } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        profileId: profileId,
        access: { contains: access || "", mode: "insensitive" },
        OR: [
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            fileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            originalFileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        ],
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

  async function getDocumentsFromPSwithStudentAccess(query, institutionId) {
    const { page, size } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        OR: [{ access: "STUDENT" }, { access: "ALL" }],
        profile: {
          user: {
            institutionId: institutionId,
          },
        },
      },
      include: {
        profile: {
          include: {
            user: {
              select: {
                email: true,
                fullName: true,
                collegeName: true,
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
  async function getDocumentsFromPSwithStudentAccessTotal(
    query,
    institutionId
  ) {
    const { page, size } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        OR: [{ access: "STUDENT" }, { access: "ALL" }],
        profile: {
          user: {
            institutionId: institutionId,
          },
        },
      },
      include: {
        profile: {
          include: {
            user: {
              select: {
                email: true,
                fullName: true,
                collegeName: true,
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

  async function getDocumentsFromPSwithHPAccess(query, institutionId) {
    const { page, size } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        OR: [{ access: "HP" }, { access: "ALL" }],
        profile: {
          user: {
            institutionId: institutionId,
          },
        },
      },
      include: {
        profile: {
          include: {
            user: {
              select: {
                email: true,
                fullName: true,
                collegeName: true,
                institutionId: true,
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
  async function getDocumentsFromPSwithHPAccessTotal(query, institutionId) {
    const { page, size } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        OR: [{ access: "HP" }, { access: "ALL" }],
        profile: {
          user: {
            institutionId: institutionId,
          },
        },
      },
      include: {
        profile: {
          include: {
            user: {
              select: {
                email: true,
                fullName: true,
                collegeName: true,
                institutionId: true,
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

  async function getDocumentsTotal(query, profileId) {
    const { page, size, searchKey, access } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        profileId: profileId,
        access: { contains: access || "", mode: "insensitive" },
        OR: [
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            fileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            originalFileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        ],
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

  async function getDocumentsForPSForInst(query, institutionId) {
    const { page, size, searchKey, access } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        profile: {
          user: {
            institutionId: institutionId,
          },
        },
        access: { contains: access || "", mode: "insensitive" },
        OR: [
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            fileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            originalFileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        ],
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

  async function getDocumentsForPSForInstTotal(query, institutionId) {
    const { page, size, searchKey, access } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        profile: {
          user: {
            institutionId: institutionId,
          },
        },
        access: { contains: access || "", mode: "insensitive" },
        OR: [
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            fileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            originalFileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        ],
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

  async function getDocumentsHP(query, profileId) {
    const { page, size, searchKey, access } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        profileId: profileId,
        OR: [
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            fileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            originalFileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        ],
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

  async function getDocumentsHPTotal(query, profileId) {
    const { page, size, searchKey, access } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        profileId: profileId,
        OR: [
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            fileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            originalFileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        ],
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

  async function getDocumentsHPAndStudent(
    query,
    profileId,
    studentProfileId,
    studentId
  ) {
    const { page, size, searchKey, access } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        OR: [
          {
            profileId: profileId,
            submittedFor: studentId,
          },
          {
            profileId: studentProfileId,
          },
        ],
        // OR: [
        //   {
        //     notes: {
        //       contains: searchKey || "",
        //       mode: "insensitive",
        //     },
        //   },
        //   {
        //     fileName: {
        //       contains: searchKey || "",
        //       mode: "insensitive",
        //     },
        //   },
        // ],
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

  async function getDocumentsHPAndStudentTotal(
    query,
    profileId,
    studentProfileId,
    studentId
  ) {
    const { page, size, searchKey, access } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        OR: [
          {
            profileId: profileId,
            submittedFor: studentId,
          },
          {
            profileId: studentProfileId,
          },
        ],
        // OR: [
        //   {
        //     notes: {
        //       contains: searchKey || "",
        //       mode: "insensitive",
        //     },
        //   },
        //   {
        //     fileName: {
        //       contains: searchKey || "",
        //       mode: "insensitive",
        //     },
        //   },
        // ],
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

  async function getDocumentsUploadedByStudent(query, profileId) {
    const { page, size, searchKey, access } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        profileId: profileId,
        OR: [
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            fileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            originalFileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        ],
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

  async function getDocumentsUploadedByStudentTotal(query, profileId) {
    const { page, size, searchKey, access } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        profileId: profileId,
        OR: [
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            fileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            originalFileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        ],
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
    return prismaService.document.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.document.delete({
      where: {
        id: id,
      },
    });
  }
  async function getDocumentsOfStudentWithAllHp(
    query,
    studentProfileId,
    studentId
  ) {
    const { page, size, searchKey } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        OR: [
          {
            profileId: studentProfileId,
          },
          {
            submittedFor: studentId,
          },
        ],
        AND: {
          OR: [
            {
              notes: {
                contains: searchKey || "",
                mode: "insensitive",
              },
            },
            {
              originalFileName: {
                contains: searchKey || "",
                mode: "insensitive",
              },
            },
          ],
        },
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
  async function getDocumentsOfStudentWithAllHpTotal(
    query,
    studentProfileId,
    studentId
  ) {
    const { page, size, searchKey } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.document.findMany({
      where: {
        OR: [
          {
            profileId: studentProfileId,
          },
          {
            submittedFor: studentId,
          },
        ],
        AND: {
          OR: [
            {
              notes: {
                contains: searchKey || "",
                mode: "insensitive",
              },
            },
            {
              originalFileName: {
                contains: searchKey || "",
                mode: "insensitive",
              },
            },
            {
              originalFileName: {
                contains: searchKey || "",
                mode: "insensitive",
              },
            },
          ],
        },
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

  async function getDocumentsForStudentsList(institutionId) {
    return prismaService.document.findMany({
      where: {
        OR: [{ access: "STUDENT" }, { access: "ALL" }],
        profile: {
          user: {
            institutionId: institutionId,
          },
        },
      },
      select: {
        fileName: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  }
};

module.exports = query;
