const express = require('express');
const router = express.Router();

// Importar rutas
const preferencesRoutes = require('./preferencesRoutes');

// Rutas de tareas
router.use('/preferences', preferencesRoutes);

module.exports = router;
