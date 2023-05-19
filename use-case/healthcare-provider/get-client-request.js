const ValidationError = require("../../error/validationError");

const getClientRequest = ({
  userRepository,
  clientRequestRepository,
}) => {
  return async function get(body, user, query) {
    const loggedInUser = await userRepository.getByEmail(user);
    if (!loggedInUser) {
      throw new ValidationError("Unauthorized!", 401);
    }
    const clientRequests = await clientRequestRepository.getHPClients(query, loggedInUser.id);
    const totalDocuments = await clientRequestRepository.getAllHPClients(query,loggedInUser.id);
    return {
      clientRequests: clientRequests,
      count: clientRequests.length,
      totalCount: totalDocuments.length,
    };
  };
};


module.exports = getClientRequest;
