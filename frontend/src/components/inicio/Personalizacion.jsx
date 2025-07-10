import React from 'react';

function Personalizacion({ personalizacion, onChange }) {
  // Desestructuramos los valores actuales
  const { inhalar, aguantar, exhalar, ciclos, titulo } = personalizacion;

  // Función para actualizar cualquier campo
  const actualizar = (campo, valor) => {
    onChange({ ...personalizacion, [campo]: valor });
  };

  return (
    <div className="personalizacion">
      <div className='personalizacion-wrapper'>
        <div className="personalizacion-campos">
          <div>
            <span>Titulo</span>
            <input type="text" value={titulo || ''} onChange={e => actualizar('titulo', e.target.value)} />
          </div>
          <div>
            <span>Inhalar</span>
            <div className='input-tiempo'>
              <button onClick={() => actualizar('inhalar', Math.max(1, inhalar - 1))}>-</button>
              <span>{inhalar}</span>
              <button onClick={() => actualizar('inhalar', inhalar + 1)}>+</button>
            </div>
          </div>
          <div>
            <span>Aguantar</span>
            <div className='input-tiempo'>
              <button onClick={() => actualizar('aguantar', Math.max(1, aguantar - 1))}>-</button>
              <span>{aguantar}</span>
              <button onClick={() => actualizar('aguantar', aguantar + 1)}>+</button>
            </div>
          </div>
          <div>
            <span>Exhalar</span>
            <div className='input-tiempo'>
              <button onClick={() => actualizar('exhalar', Math.max(1, exhalar - 1))}>-</button>
              <span>{exhalar}</span>
              <button onClick={() => actualizar('exhalar', exhalar + 1)}>+</button>
            </div>
          </div>
          <div>
            <span>Ciclos</span>
            <input
              type="number"
              min="1"
              value={ciclos}
              onChange={e => actualizar('ciclos', Math.max(1, Number(e.target.value)))}
            />
          </div>
        </div>
        <button onClick= { async () => {
          try {
            await fetch("http://localhost:3001/breath", {
              method: "POST",
              headers:{"Content-Type":"application/json"},
              body: JSON.stringify({title:titulo, inhale:inhalar, hold:aguantar, exhale:exhalar, cicles:ciclos})
            })
          }
          catch (error) {
            console.error("Error guardando la personalizacion:", error);
          }
        }}>Guardar</button>
      </div>
    </div>
  );
}

export default Personalizacion;