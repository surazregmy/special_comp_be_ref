const {
  selectInstitutionController,
  createInstitutionController,
  updateInstitutionController,
  deleteInstitutionController,
  // notificationTestController,
} = require("../../controller/institution");
const verifyJWT = require("../../middleware/verifyJWT");

const route = ({ router, makeExpressCallback }) => {
  // router.get(
  //   "/notificationtest/notify",
  //   makeExpressCallback(notificationTestController)
  // );
  router.get("/", verifyJWT, makeExpressCallback(selectInstitutionController));
  router.get("/public", makeExpressCallback(selectInstitutionController));
  router.get("/:id", verifyJWT, makeExpressCallback(selectInstitutionController));

  
  router.post("/", verifyJWT, makeExpressCallback(createInstitutionController));
  router.post("/:id", verifyJWT, makeExpressCallback(updateInstitutionController));
  router.delete("/:id", verifyJWT, makeExpressCallback(deleteInstitutionController));

  return router;
};

module.exports = route;
