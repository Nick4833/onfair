const express = require("express");
const { getUserFairs } = require("../controllers/user");
const router = express.Router();

router.get("/:id", getUserFairs);

module.exports = router;