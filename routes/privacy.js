const express = require("express");
const router = express.Router();

const privacyController = require("../controllers/privacy.js");

// GET /privacy
router.get("/", privacyController.renderPrivacyPage);

module.exports = router;
