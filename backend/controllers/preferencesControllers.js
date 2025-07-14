const { Personalized_breaths } = require("../models");


// TODO: 
  // Ahora le pasamos el id de ususario hardcodeado, pero deberiamos ibtener el id del  ususario desde el login y pasarselo aca.
  // Lo mismo con el id_breath, debemos obtenerlo desde el front con el componente de santi.

const createPreference = async (req, res) => {
  try {
    const { id_user } = req.params;
    const { title, inhale, hold, exhale, cycles } = req.body;   

    const preference = await Personalized_breaths.create({
      id_user,
      title,
      inhale,
      hold,
      exhale,
      cycles
    });
    
    res.status(201).json({ message: 'Preference created successfully', preference });

  } catch (error) {
    res.status(500).json({ error: 'Error creating preference', message: error.message });
  }
};

// api/preferences/:id_user
const getPreferences = async (req, res) => {
  try {
    const { id_user } = req.params;
    const preferences = await Personalized_breaths.findAll({ where:{ id_user: id_user }}) 

    if (preferences.lenght === 0){
      return res.status(404).json({ error: 'Preferences not found' });
    }

    res.status(200).json(preferences);
  } catch (error) {
    res.status(500).json({ error: 'Error getting preferences', message: error.message });
  }
};


// api/preferences/:id_breath
const deletePreference = async (req, res) => {
  try {
    const { id_breath } = req.params;
    const deleted = await Personalized_breaths.destroy({ where: { id_breath } });
    if (deleted) {
      res.status(200).json({ message: 'Preference deleted successfully' });
    } else {
      res.status(404).json({ error: 'We could not find the preference' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the preference', message: error.message });
  }
};
module.exports = { createPreference, getPreferences, deletePreference };





