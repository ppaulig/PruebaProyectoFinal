const express = require('express');
const router = express.Router();
const { createPreference, getPreferences, deletePreference } = require("../controllers/preferencesControllers");

router.post("/:id_user", createPreference);
router.get("/:id_user", getPreferences);
router.delete("/:id_breath", deletePreference);

module.exports = router;