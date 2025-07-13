const express = require('express');
const router = express.Router();
const { createPreference, getAllPreferences, deletePreference } = require("../controllers/preferencesControllers");

router.post("/:id_user", createPreference);
//router.get("/:id_user", getAllPreferences);
//router.delete("/:id_breath", deletePreference);

module.exports = router;