import React, { useState, useEffect, useRef } from 'react';
import '../../styles/contadorMeditador.css';
const fases = ['inhalar', 'aguantar', 'exhalar'];

const ContadorMeditador = ({ duracion/*, backgroundImage */ }) => {
  // usar ref para siempre tener el valor mas reciente de duracion
  const duracionRef = useRef(duracion);
  useEffect(() => { duracionRef.current = duracion; }, [duracion]);

  const [estado, setEstado] = useState('inhalar');
  const [tiempoRestante, setTiempoRestante] = useState(duracion.inhalar);
  const [ciclo, setCiclo] = useState(1);
  const [activo, setActivo] = useState(false);
  const [animar, setAnimar] = useState(false);

  // sincronizar tiempoRestante si cambian los parametros y no esta activo
  useEffect(() => {
    if (!activo) {
      setEstado('inhalar');
      setTiempoRestante(duracion.inhalar);
      setCiclo(1);
      setAnimar(false);
    }
  }, [duracion, activo]);

  useEffect(() => {
    if (!activo) return;
    let intervalo = setInterval(() => {
      setTiempoRestante(prev => {
        if (prev > 1) return prev - 1;
        //cambio de fase 
        let idx = fases.indexOf(estado);
        if (idx < 2) {
          //siguiente fase
          const siguiente = fases[idx + 1];
          setEstado(siguiente);
          setTiempoRestante(duracionRef.current[siguiente]);
        } else {
          //fin de ciclo 
          if (ciclo < duracionRef.current.ciclos) {
            setEstado('inhalar');
            setTiempoRestante(duracionRef.current.inhalar);
            setCiclo(ciclo + 1);
          } else {
            setActivo(false);
            setAnimar(false);
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
    setAnimar(true);
  };

  const pausarMeditacion = () => {
    setActivo(false);
    setAnimar(false);
  };

  const reiniciarMeditacion = () => {
    setActivo(false);
    setEstado('inhalar');
    setTiempoRestante(duracion.inhalar);
    setCiclo(1)
    setAnimar(false);
  };


   return (
    /*<div className="contador-wrapper"   style={{
    backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>*/
    //etiqueta a futuro para el fondo que traemos de base de datos
    <div className="contador-wrapper">
      <div className="contador-meditador">
        <div className="breath-circle-container">
          <div className="breath-circle-bg" />
          <div
            className={`breath-circle ${animar ? estado : ''}`}
            style={animar ? { animationDuration: `${duracion[estado]}s` } : {}}
          />
        </div>
        <div className="estado">{estado}</div>
        <div className="counter">{tiempoRestante} s</div>
        <div className="controls">
          <button className="button" onClick={iniciarMeditacion}>Iniciar</button>
          <button className="button" onClick={pausarMeditacion}>Pausar</button>
          <button className="button" onClick={reiniciarMeditacion}>Reiniciar</button>
        </div>
        <p className="ciclo">Ciclo: {ciclo} / {duracion.ciclos}</p>
      </div>
    </div>
  );};

export default ContadorMeditador;