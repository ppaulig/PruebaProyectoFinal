import React, { useState } from 'react';
import '../../styles/categoriaImagenes.css';


function Card({ id, nombre, imagen, urlColeccion, isSelected, seleccionarCard }) {
  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={() => seleccionarCard(id)}
      style={{ backgroundImage: `url(${imagen})` }}
    >
      <div className="card-title">{nombre}</div>
    </div>
  );
}


 function GaleriaImagenes() {
  const colecciones = [
    {
      id: 1,
      nombre: 'Montañas',
      imagen: '',
      urlColeccion: ''
    },
    {
      id: 2,
      nombre: 'Playa',
      imagen: '',
      urlColeccion: ''
    },
    {
      id: 3,
      nombre: 'Cascada',
      imagen: '',
      urlColeccion: ''
    },
    {
      id: 4, 
      nombre: 'Ciudades',
      imagen: '',
      urlColeccion: ''
    },
    { 
      id: 5,
      nombre: 'Fogata',
      imagen: '',
      urlColeccion: ''
    },
    {
      id: 6, 
      nombre: 'Espacio',
      imagen: '',
      urlColeccion: ''
    }
  ];

  const [seleccionada, setSeleccionada] = useState(null);

  const seleccionarCard = (id) => {
    setSeleccionada(id);
  };

  return (
    <div className="galeria-imagenes">
      {colecciones.map((coleccion) => (
        <Card
          key={coleccion.id}
          id={coleccion.id}
          nombre={coleccion.nombre}
          imagen={coleccion.imagen}
          urlColeccion={coleccion.urlColeccion}
          isSelected={seleccionada === coleccion.id}
          seleccionarCard={seleccionarCard}
        />
      ))}
    </div>
  );
}

export default GaleriaImagenes;