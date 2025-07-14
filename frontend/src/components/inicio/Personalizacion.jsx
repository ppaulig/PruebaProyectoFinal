import React from 'react';
import '../../styles/personalizacion.css'
function Personalizacion({ personalizacion, onChange, onPreferenciaGuardada}) {
// TODO: no hardcodear el id_usuario, hacerlo dinamico.

  // Desestructuramos los valores actuales
  const { inhalar, aguantar, exhalar, ciclos, titulo } = personalizacion;

  // Función para actualizar cualquier campo
  const actualizar = (campo, valor) => {
    if(campo === 'inhalar' || campo === 'exhalar'){
      const nuevoValor = Math.max(1, valor);

    onChange({ ...personalizacion, inhalar: nuevoValor, exhalar: nuevoValor });
    }else{
      onChange({...personalizacion, [campo]: valor});
    }

  };

  const guardar = async () => {
    if (!titulo.trim()) {
      alert("Por favor ingresa un título para guardar esta meditación.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/api/preferences/2", { // id del usuario hardcodeado 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: titulo,
          inhale: inhalar,
          hold: aguantar,
          exhale: exhalar,
          cycles: ciclos
        })
      });

      if (res.ok) {
        alert("Meditación guardada con éxito");
        // Podríamos emitir un evento o usar un callback para actualizar PreferenciasGuardadas  

        // limpia el formulario
        onChange({ ...personalizacion, titulo: '' });
        
        if (onPreferenciaGuardada) {
          onPreferenciaGuardada();
        }

      }
    } catch (error) {
      console.error("Error al guardar:", error);
    }
  };

  // const guardar = () => {
  //   if(!titulo.trim()){
  //     alert("Por favor incluya un titulo para su meditacion personalizada");
  //     return;
  //   }
  // }
  // const nuevaPersonalizacion = {
  //   title: titulo,
  //   inhale: inhalar, 
  //   hold: aguantar,
  //   exhale: exhalar,
  //   cicles: ciclos
  // };

  //agarrar las existentes para agregar la nueva
  // const persCargadas = JSON.parse(localStorage.getItem("preferencias")) || [];
  // const persActualizadas = [...persCargadas, nuevaPersonalizacion];
  // localStorage.setItem("preferencias", JSON.stringify(persActualizadas));
  // onGuardar(nuevaPersonalizacion);
  // alert("Nueva personalizacion guardada en localStorage");
  // };
  

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
              {/*button onclick{() => actualizar('inhalar', inhalar - 1, 'exhalar', exhalar - 1)} */}
              <span>{inhalar}</span>
              <button onClick={() => actualizar('inhalar', inhalar + 1)}>+</button>
              {/*button onclick{() => actualizar('inhalar', inhalar - 1, 'exhalar', exhalar - 1)} */}
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
              {/*button onclick{() => actualizar('inhalar', inhalar +1, 'exhalar', exhalar + 1)} */}
              <span>{exhalar}</span>
              <button onClick={() => actualizar('exhalar', exhalar + 1)}>+</button>
              {/*button onclick{() => actualizar('exhalar', exhalar + 1, 'inhalar', inhalar + 1)} */}
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
        <button onClick= {guardar}>Guardar</button>
      </div>
    </div>
  );
}

export default Personalizacion;