const express = require("express");
const router = express.Router();
const termsController = require("../controllers/terms");

// Terms of Service page route
router.get("/", termsController.showTerms);

module.exports = router;
