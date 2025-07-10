import React, { useState, useEffect, useRef } from 'react';

const fases = ['inhalar', 'aguantar', 'exhalar'];

const ContadorMeditador = ({ duracion, imagen }) => {
  // Usar ref para siempre tener el valor más reciente de duracion
  const imagenFondo = imagen || "https://static.vecteezy.com/system/resources/thumbnails/026/748/420/small/human-meditate-yoga-psychic-human-considers-mind-and-heart-spirituality-esotericism-universe-cartoon-style-generative-ai-illustration-free-photo.jpg";
  const duracionRef = useRef(duracion);
  useEffect(() => { duracionRef.current = duracion; }, [duracion]);

  const [estado, setEstado] = useState('inhalar');
  const [tiempoRestante, setTiempoRestante] = useState(duracion.inhalar);
  const [ciclo, setCiclo] = useState(1);
  const [activo, setActivo] = useState(false);

  // Sincronizar tiempoRestante si cambian los parámetros y no está activo
  useEffect(() => {
    if (!activo) {
      setEstado('inhalar');
      setTiempoRestante(duracion.inhalar);
      setCiclo(1);
    }
  }, [duracion, activo]);

  useEffect(() => {
    if (!activo) return;
    let intervalo = setInterval(() => {
      setTiempoRestante(prev => {
        if (prev > 1) return prev - 1;
        // Cambio de fase
        let idx = fases.indexOf(estado);
        if (idx < 2) {
          // Siguiente fase
          const siguiente = fases[idx + 1];
          setEstado(siguiente);
          setTiempoRestante(duracionRef.current[siguiente]);
        } else {
          // Fin de ciclo
          if (ciclo < duracionRef.current.ciclos) {
            setEstado('inhalar');
            setTiempoRestante(duracionRef.current.inhalar);
            setCiclo(ciclo + 1);
          } else {
            setActivo(false);
          }
        }
        return 0;
      });
    }, 1000);
    return () => clearInterval(intervalo);
  }, [activo, estado, ciclo]);

  const iniciarMeditacion = () => {
    setActivo(true);
    setEstado('inhalar');
    setTiempoRestante(duracion.inhalar);
    setCiclo(1);
  };

  const pausarMeditacion = () => setActivo(false);

  const reiniciarMeditacion = () => {
    setActivo(false);
    setEstado('inhalar');
    setTiempoRestante(duracion.inhalar);
    setCiclo(1);
  };

  return (
    <div className="contador-meditador">
      {/* imagen de fondo con transparencia */}
      <img src={imagenFondo} alt="Fondo" className="image-background" />
      <div className="overlay" />
      {/* animacion círculo */}
      <div className="breath-circle-container">
        <div className="breath-circle-bg" />
        <div className={`breath-circle ${estado}`} />
      </div>
      <div className="estado">{estado}</div>
      <div className="counter">{tiempoRestante} s</div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="button" onClick={iniciarMeditacion}>Iniciar</button>
        <button className="button" onClick={pausarMeditacion}>Pausar</button>
        <button className="button" onClick={reiniciarMeditacion}>Reiniciar</button>
      </div>
      <p style={{color:'#3b6978', fontWeight:500, textShadow:'0 2px 8px #fff, 0 1px 2px #3b6978aa'}}>Ciclo: {ciclo} / {duracion.ciclos}</p>
    </div>
  );};

export default ContadorMeditador;