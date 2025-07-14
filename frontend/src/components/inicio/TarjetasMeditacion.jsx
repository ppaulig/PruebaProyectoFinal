import React from 'react';
import '../../styles/tarjetasMeditacion.css'

const TarjetasMeditacion = ({ preferencias, onSeleccionar, onBorrar }) => {
  return (
    <div className="contenedor-preferencias">
      <h2>Preferencias Guardadas</h2>
      {preferencias.length === 0 ? (
        <p>Todavía no guardaste ninguna preferencia.</p>
      ) : (
        <div className="grid-preferencias">
          {preferencias.map((pref, index) => (
            <div key={pref.id_breath || index} className="card-preferencia">
              <h3>{pref.title}</h3>
              <p><strong>Inhalar:</strong> {pref.inhale} seg</p>
              <p><strong>Aguantar:</strong> {pref.hold} seg</p>
              <p><strong>Exhalar:</strong> {pref.exhale} seg</p>
              <p><strong>Ciclos:</strong> {pref.cycles}</p>
              <button
                onClick={() =>
                  onSeleccionar({
                    titulo: pref.title,
                    inhalar: pref.inhale,
                    aguantar: pref.hold,
                    exhalar: pref.exhale,
                    ciclos: pref.cycles
                  })
                }
              >
                Iniciar
              </button>
              <button className="btn-borrar" onClick={() => onBorrar(pref.id_breath || index)}>
                Borrar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TarjetasMeditacion;

// import React from 'react';
// import '../../styles/tarjetasMeditacion.css'

// const TarjetasMeditacion = ({ preferencias, onSeleccionar, onBorrar }) => {
//   return (
//     <div className="contenedor-preferencias">
//       <h2>Preferencias Guardadas</h2>
//       {preferencias.length === 0 ? (
//         <p>Todavía no guardaste ninguna preferencia.</p>
//       ) : (
//         <div className="grid-preferencias">
//           {preferencias.map((pref, index) => (
//             <div key={index} className="card-preferencia">
//               <h3>{pref.title}</h3>
//               <p><strong>Inhalar:</strong> {pref.inhale} seg</p>
//               <p><strong>Aguantar:</strong> {pref.hold} seg</p>
//               <p><strong>Exhalar:</strong> {pref.exhale} seg</p>
//               <p><strong>Ciclos:</strong> {pref.cicles}</p>
//               <button
//                 onClick={() =>
//                   onSeleccionar({
//                     titulo: pref.title,
//                     inhalar: pref.inhale,
//                     aguantar: pref.hold,
//                     exhalar: pref.exhale,
//                     ciclos: pref.cicles
//                   })
//                 }
//               >
//                 Iniciar
//               </button>
//               <button className="btn-borrar" onClick={() => onBorrar(index)}>
//                 Borrar
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TarjetasMeditacion;