import { useDispatch, useSelector } from 'react-redux'
import { agregarEventoLocal } from '../../features/eventoSlice';
import { useRef, useState } from 'react'
import { spinnerCargando } from '../../features/spinnerSlice';
import Spinner from '../Spinner';

const AgregarEvento = () => {
  const url = "https://babytracker.develotion.com/";
  const dispatch = useDispatch();
  const categorias = useSelector(state => state.categoria.listaCategorias)
  const fechaEvento = useRef(null)
  const horaEvento = useRef(null)
  const categoriaEvento = useRef(null)
  const detalleEvento = useRef(null)
  const [mensaje, setMensaje] = useState('')
  const [spinnerCarga, setSpinnerCarga] = useState(false)



  const calcularFecha = () => {
    // Creo variable de fecha para ingresar
    let fechaFormateada
    // Creo la variable para la fecha de hoy
    const fecha = new Date();
    // Verifico existencia de fecha, si no existe
    if (!fechaEvento.current.value) {
      // Formateo fecha
      fechaFormateada = fecha.toISOString().split('T')[0];
      // Si no existe hora agrego la hora actual a la fecha
      if (!horaEvento.current.value) {
        fechaFormateada = fechaFormateada + ' ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
      } else {
        // Si existe hora la agrego a la fecha
        fechaFormateada = fechaFormateada + ' ' + horaEvento.current.value + ':00';
      }
    } else {
      // Si existe fecha verifico que no sea mayor a la de hoy
      if (fechaEvento.current.value > fecha.toISOString().split('T')[0]) {
        setMensaje('La fecha no puede ser mayor a la de hoy');
        return;
      } else {
        // En caso de que si exista fecha y no sea mayor a la de hoy formateo
        fechaFormateada = fechaEvento.current.value;
        // Si no existe hora agrego la hora actual a la fecha
        if (!horaEvento.current.value) {
          fechaFormateada = fechaFormateada + ' ' + fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
        } else {
          // Si existe hora la agrego a la fecha
          fechaFormateada = fechaFormateada + ' ' + horaEvento.current.value + ':00';
        }
      }
    }
    return fechaFormateada;
  }

  const agregarEvento = () => {    
    const fecha = calcularFecha();
    if (fecha) {
      setSpinnerCarga(true)
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
            const eventoEstado = {
              id: data.idEvento,
              idCategoria: categoriaEvento.current.value,
              idUsuario: userId,
              detalle: detalleEvento.current.value,
              fecha: fecha,
            }            
            dispatch(agregarEventoLocal(eventoEstado));
            setMensaje(data.mensaje);
          }
          setSpinnerCarga(false)
        })
        .catch((error) => {
          setMensaje('Error en la conexión con el servidor');
          setSpinnerCarga(false)
        })
    }
  }

  return (
    <div className="agregar-evento-container mt-3">
      <h1>Agregar Evento</h1>
      <div className="form-group">
        <label htmlFor="categoria">Seleccione categoría:</label>
        <select className="form-control" name="categoria" ref={categoriaEvento}>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>{categoria.tipo}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="fecha">Seleccione fecha:</label>
        <input className="form-control" name="fecha" type="date" ref={fechaEvento} />
      </div>
      <div className="form-group">
        <label htmlFor="hora">Seleccione hora:</label>
        <input className="form-control" name="hora" type="time" ref={horaEvento} />
      </div>      
      <div className="form-group">
        <input className="form-control" type="text" placeholder="Descripción del evento (opcional)" ref={detalleEvento} />
      </div>
      <button className="btn btn-primary mb-4" onClick={agregarEvento}>Crear evento</button>
      {mensaje && <p className="text-center">{mensaje}</p>}
      {spinnerCarga ? <Spinner /> : null}
    </div>
  )
}

export default AgregarEvento
