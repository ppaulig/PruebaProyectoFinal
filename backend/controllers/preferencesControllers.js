const { Preference } = require("../models/preferencesModel");

const createPreference = async (req, res) => {
  try {
    const { title, inhale, hold, exhale, cicles } = req.body;   

    const preference = await Preference.create({
      title,
      inhale,
      hold,
      exhale,
      cicles
    });
    
    res.status(201).json({ message: 'Preference created successfully', preference });
  } catch (error) {
    res.status(400).json({ error: 'Error creating preference', message: error.message });
  }
};

module.exports = { createPreference };