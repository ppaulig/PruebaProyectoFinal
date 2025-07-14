import React, { useState, useEffect } from 'react';
import ContadorMeditador from './ContadorMeditador';
import Personalizacion from './Personalizacion';
import TarjetasMeditacion from './TarjetasMeditacion';
import CategoriasImagenes from './CategoriasImagenes';

const Inicio = () => {
  const [personalizacion, setPersonalizacion] = useState({
    inhalar: 4,
    aguantar: 4,
    exhalar: 4,
    ciclos: 1,
    titulo: ''
  });

  const [preferencias, setPreferencias] = useState([]);

  // muestra las preferencias ya guardadas
  const cargarPreferencias = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/preferences/2"); // TODO: hacer dinámico el id del usuario
      
      if (response.ok) {
        const data = await response.json();
        setPreferencias(data);
      } 

    } catch (error) {
      console.error("Error al obtener las preferencias", error);
      setPreferencias([]);
    }
  };

  useEffect(() => {
    cargarPreferencias();
  }, []);

  const handlePersonalizacionChange = (nueva) => {
    setPersonalizacion(nueva);
  };

  const borrarPreferencia = async (id_breath) => {
    try {
      const response = await fetch(`http://localhost:3001/api/preferences/${id_breath}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        await cargarPreferencias();
      } 

    } catch (error) {
      console.error("Error al borrar la preferencia:", error);
      alert("Error al borrar la preferencia");
    }
  };

    // recarga preferencias después de guardar una nueva
  const onPreferenciaGuardada = async () => {
    await cargarPreferencias();
  };

  return (
    <div>
      <ContadorMeditador duracion={personalizacion} />
      <Personalizacion
        personalizacion={personalizacion}
        onChange={handlePersonalizacionChange}
        onPreferenciaGuardada={onPreferenciaGuardada}
      />
      <TarjetasMeditacion
        preferencias={preferencias}
        onSeleccionar={handlePersonalizacionChange}
        onBorrar={borrarPreferencia}
      />
      <CategoriasImagenes />
    </div>
  );
};

export default Inicio;
