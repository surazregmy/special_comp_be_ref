const query = ({ prismaService, model }) => {
  return Object.freeze({
    get,
    getOne,
    add,
    update,
    del,
    getPublicList,
    getPublicListTotal,
    getOneCollege,
    getOneCollegeByName,
    getOneCollegeByEmailDomain,
    insertInstitutionWithProfessorsAndSuperPs,
  });
  async function get() {
    return prismaService.institution.findMany();
  }
  async function getOneCollege(id) {
    return prismaService.institution.findFirst({
      where: {
        id: id,
      },
    });
  }

  async function getOneCollegeByName(name) {
    return prismaService.institution.findFirst({
      where: {
        name: {
          equals: name.trim(),
          mode: "insensitive",
        },
      },
    });
  }

  async function getOneCollegeByEmailDomain(emailDomain) {
    return prismaService.institution.findFirst({
      where: {
        emailDomain: emailDomain,
      },
    });
  }

  async function getPublicList(query) {
    const { page, size, searchKey } = query;
    return prismaService.institution.findMany({
      where: {
        isDeleted: false,
        isActive: true,
        OR: [
          {
            name: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            emailDomain: {
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
        emailDomain: true,
        calendlyUrl: true,
      },
    });
  }
  async function getPublicListTotal(query) {
    const { page, size, searchKey } = query;
    return prismaService.institution.findMany({
      where: {
        isDeleted: false,
        isActive: true,
        OR: [
          {
            name: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
          {
            emailDomain: {
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
        emailDomain: true,
        calendlyUrl: true,
      },
    });
  }
  async function getOne(id) {
    return prismaService.institution.findFirst({
      where: {
        id: id,
      },
    });
  }
  async function add(model) {
    return prismaService.institution.create({
      data: model,
    });
  }

  async function update(id, model) {
    return prismaService.institution.update({
      where: {
        id: id,
      },
      data: { ...model },
    });
  }

  async function del(id) {
    return prismaService.institution.delete({
      where: {
        id: id,
      },
    });
  }
  async function insertInstitutionWithProfessorsAndSuperPs({
    institution,
    professors,
    user,
  }) {
    return await prismaService.$transaction(async (tx) => {
      // creatr institution
      const createdInstitution = await tx.institution.create({
        data: { name: institution.name, emailDomain: institution.emailDomain },
      });

      // create professors
      let professorsWithIns = professors.map((p) => {
        return { ...p, institutionId: createdInstitution.id };
      });

      if (professors) {
        if (professors.length > 0) {
          const createdprofessors = await tx.professor.createMany({
            data: professorsWithIns,
          });
        }
      }

      //create PSI user
      const createdPSIUser = await tx.user.create({
        data: {
          fullName: user.fullName,
          email: user.email,
          psEmployeeId: user.psEmployeeId,
          institutionId: createdInstitution.id,
          collegeName: createdInstitution.name,
          password: user.password,
          role: "POST_SECONDARY_INS",
          isPointOfContact: true,
          isSuperPS: true,
          isVerified: true,
        },
      });
      await tx.profile.create({
        data: { userId: createdPSIUser.id },
      });
    });
  }
};

module.exports = query;
