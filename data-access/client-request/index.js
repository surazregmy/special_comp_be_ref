const { prismaService } = require("../index");
// ######
const query = require("./query");
// ######
const model = {};
const clientRequestRepository = query({ prismaService, model });
// ######
module.exports = clientRequestRepository;
