const express = require("express");
const verifyJWT = require("../middleware/verifyJWT");
const router = express.Router();

router.use("/posts", verifyJWT, require("./post"));
router.use("/auth", require("./auth"));
router.use("/profile", require("./profile"));
router.use("/admin", require("./admin"));
router.use("/institution", verifyJWT, require("./institution"));
router.use("/post-secondary", require("./post-secondary"));
router.use("/healthcare-provider", verifyJWT, require("./healthcare-provider"));
router.use("/student", verifyJWT, require("./student"));
router.use("/message", verifyJWT, require("./message"));
router.use("/notification", verifyJWT, require("./notification"));

module.exports = router;
