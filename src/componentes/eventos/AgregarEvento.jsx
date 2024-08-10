import { useDispatch, useSelector } from 'react-redux'
import { agregarEventoLocal } from '../../features/eventoSlice';
import { useRef, useState } from 'react'

const AgregarEvento = () => {
  const url = "https://babytracker.develotion.com/";
  const dispatch = useDispatch();
  const categorias = useSelector(state => state.categoria.listaCategorias)
  const nombreEvento = useRef(null)
  const fechaEvento = useRef(null)
  const horaEvento = useRef(null)
  const categoriaEvento = useRef(null)
  const detalleEvento = useRef(null)
  const [mensaje, setMensaje] = useState('')

  const formatearFecha = (fecha) => {
    // Recibo una fecha para formatearla de manera correcta para la peticion
    const fechaObj = new Date(fecha);
    const año = fechaObj.getFullYear();
    const mes = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const dia = String(fechaObj.getDate()).padStart(2, '0');
    const hora = String(fechaObj.getHours()).padStart(2, '0');
    const minuto = String(fechaObj.getMinutes()).padStart(2, '0');
    const segundo = String(fechaObj.getSeconds()).padStart(2, '0');
    // Devuelvo un string con la fecha
    return `${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
  };

  const calcularFecha = () => {
    // Verifico el nombre del evento
    if (nombreEvento.current.value.trim() === '') {
      setMensaje('El nombre no puede ser vacío');
      return null;
    }
    let fecha;
    // Verifico si la fecha existe
    if (!fechaEvento.current.value) {
      // No se ingreso una fecha, ingresar la fecha actual
      const hoy = new Date();
      fecha = formatearFecha(hoy);
    } else {
      // Se ingreso una fecha
      const fechaBase = fechaEvento.current.value;
      const hora = horaEvento.current.value || '00:00:00';
      fecha = `${fechaBase} ${hora}`;
      fecha = formatearFecha(fecha);
    }

    // Verificar si la fecha es mayor que la fecha actual
    const fechaIngresada = new Date(fecha);
    const hoy = new Date();
    // Setear las horas a 0 para comparar solo la fecha
    hoy.setHours(0, 0, 0, 0); 
    if (fechaIngresada > hoy) {
      setMensaje('La fecha no puede ser mayor a la fecha de hoy');
      return null;
    }

    return fecha;
  };

  const agregarEvento = () => {
    const fecha = calcularFecha();
    if (fecha) {
      const userId = localStorage.getItem('userId');
      const apiKey = localStorage.getItem('apiKey');
      const evento = {
        "idCategoria": categoriaEvento.current.value,
        "idUsuario": userId,
        "detalle": detalleEvento.current.value,
        "fecha": fecha,
      };      
      fetch(url + "/eventos.php", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          apikey: apiKey,
          iduser: userId
        },
        body: JSON.stringify(evento)
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.codigo === 409) {
            setMensaje(data.mensaje);
          } else {
            dispatch(agregarEventoLocal(evento));
            setMensaje(data.mensaje);
          }
        });
    }
  }

  return (
    <div className='d-flex justify-content-center'>
      <div className="row w-50 p-5">
        <h1>Agregar Evento</h1>
        <input className='p-2' type="text" placeholder="Nombre del evento" ref={nombreEvento} />
        <label htmlFor="fecha">Seleccione fecha:</label>
        <input className='p-2' name='fecha' type="date" ref={fechaEvento} />
        <label htmlFor="hora">Seleccione hora:</label>
        <input className='p-2' name='hora' type="time" ref={horaEvento} />
        <label htmlFor="categoria">Seleccione categoria:</label>
        <select className='p-2' name='categoria' ref={categoriaEvento}>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>{categoria.tipo}</option>
          ))}
        </select>
        <input className='p-2 mt-2' type="textarea" placeholder="Descripción del evento (opcional)" ref={detalleEvento} />
        <input className="mt-2 p-1" name="boton" type="button" value="Crear evento" onClick={agregarEvento} />
        <p className="text-center mt-2">{mensaje}</p>
      </div>
    </div>
  )
}

export default AgregarEvento
