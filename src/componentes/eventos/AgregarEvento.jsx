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

  const verificarDatos = () => {
    if (!nombreEvento.current.value) {
      setMensaje('Debe ingresar un nombre para el evento');
      return false;
    }
    return true;
  }

  const calcularFecha = () => {
    // Creo variable de fecha para ingresar
    let fechaFormateada
    // Creo la variable para la fecha de hoy
    const fecha = new Date();
    // Verifico existencia de fecha, si no existe
    if (!fechaEvento.current.value) {
      // Formateo fecha
      fechaFormateada = fecha.toISOString().split('T')[0];
      // Si no existe hora agrego 00:00:00 a la fecha
      if (!horaEvento.current.value) {
        fechaFormateada = fechaFormateada + ' 00:00:00';
      } else {
        // Si existe hora la agrego a la fecha
        fechaFormateada = fechaFormateada + ' ' + horaEvento.current.value;
      }
    } else {
      // Si existe fecha verifico que no sea mayor a la de hoy
      if (fechaEvento.current.value > fecha.toISOString().split('T')[0]) {
        setMensaje('La fecha no puede ser mayor a la de hoy');
        return;
      } else {
        // En caso de que si exista fecha y no sea mayor a la de hoy formateo
        fechaFormateada = fechaEvento.current.value;
        // Si no existe hora agrego 00:00:00 a la fecha
        if (!horaEvento.current.value) {
          fechaFormateada = fechaFormateada + ' 00:00:00';
        } else {
          // Si existe hora la agrego a la fecha
          fechaFormateada = fechaFormateada + ' ' + horaEvento.current.value;
        }
      }
    }
    return fechaFormateada;
  }

  const agregarEvento = () => {
    const fecha = calcularFecha();
    if (verificarDatos() && fecha) {
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
            console.log(evento)
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
