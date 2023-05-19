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
    getAccomodationLettersByPS,
    getAccomodationLettersByPSTotal,
    getAccomodationLettersByPSForStudent,
    getAccomodationLettersByPSForStudentTotal,
    getAccomodationLettersForStudent,
    getAccomodationLettersForStudentTotal,
    getByPSUserId,
  });
  async function get() {
    return prismaService.accomodationLetter.findMany();
  }
  async function getOne(id) {
    return prismaService.accomodationLetter.findFirst({
      where: {
        id: id,
      },
      include: {
        professors: true,
        postSecondary: {
          select: {
            email: true,
            fullName: true,
            role: true,
          },
        },
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
  async function getByPSUserId(psId) {
    return prismaService.accomodationLetter.findMany({
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

  async function getByEmail(email) {
    return prismaService.accomodationLetter.findUnique({
      where: {
        email: email,
      },
    });
  }

  async function getByRefreshToken(refreshToken) {
    return prismaService.accomodationLetter.findFirst({
      where: {
        refreshToken: refreshToken,
      },
    });
  }

  async function getByIdAndCode(id, code) {
    return prismaService.accomodationLetter.findFirst({
      where: {
        id: id,
        verificationToken: code,
      },
    });
  }

  async function add(model) {
    console.log("model");
    console.log(model);
    return prismaService.accomodationLetter.create({
      data: model,
    });
  }

  async function getAccomodationLettersByPS(query, institutionId) {
    const { page, size, searchKey, status } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.accomodationLetter.findMany({
      where: {
        postSecondary: {
          institutionId: institutionId,
        },
        status: status,
        OR: [
          {
            originalFileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            student: {
              email: {
                contains: searchKey || "",
                mode: "insensitive",
              },
            },
          },
          {
            student: {
              fullName: {
                contains: searchKey || "",
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        professors: true,
        postSecondary: {
          select: {
            email: true,
            fullName: true,
            role: true,
          },
        },
        student: {
          select: {
            email: true,
            fullName: true,
            role: true,
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

  async function getAccomodationLettersByPSTotal(query, institutionId) {
    const { page, size, searchKey, status } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.accomodationLetter.findMany({
      where: {
        postSecondary: {
          institutionId: institutionId,
        },
        status: status,
        OR: [
          {
            originalFileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            student: {
              email: {
                contains: searchKey || "",
                mode: "insensitive",
              },
            },
          },
          {
            student: {
              fullName: {
                contains: searchKey || "",
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        professors: true,
        postSecondary: {
          select: {
            email: true,
            fullName: true,
            role: true,
          },
        },
        student: {
          select: {
            email: true,
            fullName: true,
            role: true,
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

  async function getAccomodationLettersByPSForStudent(query, psId, studentId) {
    const { page, size, searchKey, status } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.accomodationLetter.findMany({
      where: {
        postSecondaryId: psId,
        studentId: studentId,
        status: status,
        OR: [
          {
            originalFileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            student: {
              email: {
                contains: searchKey || "",
                mode: "insensitive",
              },
            },
          },
          {
            student: {
              fullName: {
                contains: searchKey || "",
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        professors: true,
        postSecondary: {
          select: {
            email: true,
            fullName: true,
            role: true,
          },
        },
        student: {
          select: {
            email: true,
            fullName: true,
            role: true,
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
  async function getAccomodationLettersByPSForStudentTotal(
    query,
    psId,
    studentId
  ) {
    const { page, size, searchKey, status } = query;
    console.log("query inside");
    console.log(query);
    return prismaService.accomodationLetter.findMany({
      where: {
        postSecondaryId: psId,
        studentId: studentId,
        status: status,
        OR: [
          {
            originalFileName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            notes: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            student: {
              email: {
                contains: searchKey || "",
                mode: "insensitive",
              },
            },
          },
          {
            student: {
              fullName: {
                contains: searchKey || "",
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        professors: true,
        postSecondary: {
          select: {
            email: true,
            fullName: true,
            role: true,
          },
        },
        student: {
          select: {
            email: true,
            fullName: true,
            role: true,
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

  async function getAccomodationLettersForStudent(query, studentId) {
    const { page, size, searchKey, status } = query;
    console.log("query inside");
    console.log(query);

    let filter = {
      studentId: studentId,
      OR: [
        {
          originalFileName: {
            contains: searchKey || "",
            mode: "insensitive",
          },
        },
        {
          notes: {
            contains: searchKey || "",
            mode: "insensitive",
          },
        },
        {
          notes: {
            contains: searchKey || "",
            mode: "insensitive",
          },
        },
        {
          postSecondary: {
            email: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        },
        {
          postSecondary: {
            fullName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        },
      ],
    };

    if (status) {
      filter.status = status;
    }
    return prismaService.accomodationLetter.findMany({
      where: filter,
      include: {
        professors: true,
        postSecondary: {
          select: {
            email: true,
            fullName: true,
            role: true,
          },
        },
        student: {
          select: {
            email: true,
            fullName: true,
            role: true,
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

  async function getAccomodationLettersForStudentTotal(query, studentId) {
    const { page, size, searchKey, status } = query;
    console.log("query inside");
    console.log(query);

    let filter = {
      studentId: studentId,
      OR: [
        {
          originalFileName: {
            contains: searchKey || "",
            mode: "insensitive",
          },
        },
        {
          notes: {
            contains: searchKey || "",
            mode: "insensitive",
          },
        },
        {
          notes: {
            contains: searchKey || "",
            mode: "insensitive",
          },
        },
        {
          postSecondary: {
            email: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        },
        {
          postSecondary: {
            fullName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        },
      ],
    };

    if (status) {
      filter.status = status;
    }
    return prismaService.accomodationLetter.findMany({
      where: filter,
      include: {
        professors: true,
        postSecondary: {
          select: {
            email: true,
            fullName: true,
            role: true,
          },
        },
        student: {
          select: {
            email: true,
            fullName: true,
            role: true,
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
    return prismaService.accomodationLetter.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.accomodationLetter.delete({
      where: {
        id: id,
      },
    });
  }
};

module.exports = query;
