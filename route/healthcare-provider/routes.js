const {
  selectStudentController,
  selectDocumentController,
  selectDocumentByPSController,
  sendClientRequestController,
  getClientRequestController,
  removeClientRequestController,
} = require("../../controller/healthcare-provider");

const verifyHPJWT = require("../../middleware/verifyHPJWT");

const route = ({ router, makeExpressCallback }) => {
  router.get(
    "/students",
    verifyHPJWT,
    makeExpressCallback(selectStudentController) // getOnlyStudents
  );
  router.get(
    "/documents",
    verifyHPJWT,
    makeExpressCallback(selectDocumentController) // getOnlyStudents
  );
  router.get(
    "/docs-ps/:id",
    verifyHPJWT,
    makeExpressCallback(selectDocumentByPSController)
  );
  router.post(
    "/client-request",
    verifyHPJWT,
    makeExpressCallback(sendClientRequestController)
  );
  router.get(
    "/get-client-requests",
    verifyHPJWT,
    makeExpressCallback(getClientRequestController)
  );
  router.put(
    "/remove-client-request",
    verifyHPJWT,
    makeExpressCallback(removeClientRequestController)
  );

  return router;
};

module.exports = route;
