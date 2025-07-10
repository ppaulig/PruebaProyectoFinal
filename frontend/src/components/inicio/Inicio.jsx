import React, { useState } from 'react';
import ContadorMeditador from './ContadorMeditador';
import Personalizacion from './Personalizacion';

const Inicio = () => {
  const [personalizacion, setPersonalizacion] = useState({
    inhalar: 4,
    aguantar: 4,
    exhalar: 4,
    ciclos: 1,
    titulo: ''
  });

  const handlePersonalizacionChange = (nuevaPersonalizacion) => {
    setPersonalizacion(nuevaPersonalizacion);
  };

  return (
    <div>
      <h1>Bienvenido a la Meditación</h1>
      <ContadorMeditador duracion={personalizacion} imagenFondo={null} />
      <Personalizacion  personalizacion={personalizacion} onChange={handlePersonalizacionChange}/>
    </div>
  );
};

export default Inicio;