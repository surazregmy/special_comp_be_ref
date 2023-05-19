const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    getPublicList,
    getPublicListTotal,
    addManyProfessors,
    checkEmailsExist,
    checkEmailExist,
  });
  async function get() {
    return prismaService.professor.findMany();
  }
  async function getPublicList(query) {
    const { page, size, searchKey, institutionId } = query;
    return prismaService.professor.findMany({
      where: {
        institutionId: institutionId,
        OR: [
          {
            name: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: [
        {
          name: "asc",
        },
      ],
      skip: Number(page - 1) * Number(size),
      take: Number(size),
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
  async function getPublicListTotal(query) {
    const { page, size, searchKey, institutionId } = query;
    return prismaService.professor.findMany({
      where: {
        institutionId: institutionId,
        OR: [
          {
            name: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            email: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        ],
      },
      orderBy: [
        {
          name: "asc",
        },
      ],
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
  async function getOne(id) {
    return prismaService.professor.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function add(model) {
    return prismaService.professor.create({
      data: model,
    });
  }

  async function update(id, model) {
    console.log(id, model);
    return prismaService.professor.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.professor.delete({
      where: {
        id: id,
      },
    });
  }

  async function checkEmailsExist(emails, institutionId) {
    const emailExists = await prismaService.professor.findMany({
      where: {
        institutionId: institutionId,
        email: {
          in: emails,
        },
      },
    });
    const existingEmails = emailExists.map((user) => user.email);
    const notFoundEmails = emails.filter(
      (email) => !existingEmails.includes(email)
    );
    return {
      existingEmails,
      notFoundEmails,
    };
  }

  async function checkEmailExist(email, professorId, institutionId) {
    console.log(email, professorId, institutionId);
    const professor = await prismaService.professor.findFirst({
      where: {
        // NOT: {
        //   id: professorId
        // },
        institutionId: institutionId,
        email: email,
      },
    });

    return professor;
  }
  async function addManyProfessors(professors) {
    const createdprofessors = await prismaService.professor.createMany({
      data: professors,
    });
    return createdprofessors;
  }
};

module.exports = query;
