const { prismaService } = require("../index");
// ######
const query = require("./query");
// ######
const model = {};
const institutionRepository = query({ prismaService, model });
// ######
module.exports = institutionRepository;
