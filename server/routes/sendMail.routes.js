const express = require("express");
const router = express.Router();
const mailController = require("../controller/sendMail.controller");

router.route("/sending-mail").post(mailController);

module.exports = router;