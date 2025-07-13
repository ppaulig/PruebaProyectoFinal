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

// Aca va lo de santi
// api/preferences/:id_user
//un GET que reciba el id_user por parametro



// api/preferences/:id_breath
//  un DELETE que reciba el id_breath para eliminarla




module.exports = { createPreference };