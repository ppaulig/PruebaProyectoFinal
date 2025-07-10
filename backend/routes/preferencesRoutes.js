const express = require('express');
const router = express.Router();
const { createPreference } = require("../controllers/preferencesControllers");

router.post("/", createPreference);

module.exports = router;