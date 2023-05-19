const query = ({ prismaService, model }) => {
  return Object.freeze({
    getHPClients,
    add,
    getAllHPClients,
    getExistingStudents,
    removeRequest,
    getClientRequests,
    getAllClientRequests,
    manageClientRequest,
    getHPStudentRelation,
    getAllHPStudentRelation
  });
  async function add(model) {
    console.log("model");
    console.log(model);
    return prismaService.hPClients.create({
      data: model,
    });
  }
  async function removeRequest(id) {
    return prismaService.hPClients.update({
      where: {
        id,
      },
      data: { isDeleted: true }
    });
  }
  async function getExistingStudents(query, hp) {
    return prismaService.hPClients.findMany({
      where: {
        hpId: hp.id,
        isDeleted: false
      },
      select: { studentId: true },
      distinct: ['studentId']
    }).then(clients => clients.map(client => client.studentId))
  }
  async function getHPClients(query, hpId) {
    const { page = 1, size = 5, searchKey, status } = query;
    // console.log("query inside");
    // console.log(query);


    let filters = {
      hpId: hpId,
      isDeleted: false
    }
    if (searchKey) {
      filters.OR = [
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
        {
          student: {
            collegeName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        },
      ]
    }
    if (status) {
      filters.status = status.toUpperCase()
    }
    return prismaService.hPClients.findMany({
      where: filters,
      include: {
        student: {
          select: {
            studentId:true,
            email: true,
            fullName: true,
            role: true,
            collegeName: true,
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

  async function getAllHPClients(query, hpId) {

    let filters = {
      hpId: hpId,
      isDeleted: false
    }
    if (query.status) {
      filters.status = query.status.toUpperCase()
    }
    return prismaService.hPClients.findMany({
      where: filters
    });
  }



  //-------------- for students
  async function getClientRequests(query, studentId) {
    const { page = 1, size = 5, searchKey, status } = query;
    // console.log("query inside");
    // console.log(query);


    let filters = {
      studentId: studentId,
      isDeleted: false
    }
    if (searchKey) {
      filters.OR = [
        {
          hp: {
            email: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        },
        {
          hp: {
            fullName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        },
      ]
    }
    if (status) {
      filters.status = status.toUpperCase()
    }
    return prismaService.hPClients.findMany({
      where: filters,
      include: {
        hp: {
          select: {
            email: true,
            fullName: true,
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

  async function getAllClientRequests(query, studentId) {

    let filters = {
      studentId: studentId,
      isDeleted: false
    }
    if (query.status) {
      filters.status = query.status.toUpperCase()
    }
    return prismaService.hPClients.findMany({
      where: filters
    });
  }
  async function manageClientRequest(body, studentId) {
    return prismaService.hPClients.update({
      where: {
        id: body.requestId,
      },
      data: { status: body.status },
    });
  }



  //-------------- for School advisor
  async function getHPStudentRelation(query, PS) {
    const { page = 1, size = 5, searchKey, status } = query;
    // console.log("query inside");
    // console.log(query);


    let filters = {
      isDeleted: false,
      student: {
        collegeName: PS.collegeName
      },
    }
    if (searchKey) {
      filters.OR = [
        {
          hp: {
            email: {
              contains: searchKey || "",
              mode: "insensitive",
            },
          },
        },
        {
          hp: {
            fullName: {
              contains: searchKey || "",
              mode: "insensitive",
            },
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
      ]
    }
    if (status) {
      filters.status = status.toUpperCase()
    }
    return prismaService.hPClients.findMany({
      where: filters,
      include: {
        hp: {
          select: {
            email: true,
            fullName: true,
          },
        },
        student: {
          select: {
            email: true,
            fullName: true,
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

  async function getAllHPStudentRelation(query, PS) {

    let filters = {
      isDeleted: false,
      student: {
        collegeName: PS.collegeName
      },
    }
    if (query.status) {
      filters.status = query.status.toUpperCase()
    }
    return prismaService.hPClients.findMany({
      where: filters
    });
  }
};

module.exports = query;
