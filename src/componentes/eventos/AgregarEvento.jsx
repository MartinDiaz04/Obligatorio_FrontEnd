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
  // Creo variable fecha para guardar la fecha si no fue ingresada
  const[fecha, setFecha] = useState(new Date())

  const verificarCampos = () => {
    if (nombreEvento.current.value.trim() === '') {
      setMensaje('El nombre no puede ser vacio')
      return false;
    }    
    // Verifico si existe la fecha
    if (fechaEvento.current.value !== '') {
      // Si existe comparo si es mayor que la de hoy
      const fechaRecibida = new Date(fechaEvento.current.value)
      const hoy = new Date()
      if (fechaRecibida > hoy) {        
        setMensaje('La fecha no puede ser posterior a la actual')
        return false;
      }
      // Si no fue mayor a la de hoy pero si fue ingresada asigno los valores a la variable fecha
      setFecha(`${fechaEvento.current.value} ${horaEvento.current.value}`) 
    }else{
      // Si la fecha no fue ingresada le asigno la fecha de hoy
      const hoy = new Date()
      const año = hoy.getFullYear()
      const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // padStart agrega un 0 si el numero es menor a 10 para poder comparar con la fecha recibida por el evento
      const dia = String(hoy.getDate()).padStart(2, '0');
      const fechaGuardar = `${año}-${mes}-${dia} 00:00:00`
      setFecha(fechaGuardar)
    }
    return true;
  }
  const agregarEvento = () => {
    if (verificarCampos()) {      
      const userId = localStorage.getItem('userId')
      const apiKey = localStorage.getItem('apiKey')      
      const evento = {
        "idCategoria": categoriaEvento.current.value,
        "idUsuario": userId,
        "detalle": detalleEvento.current.value,
        "fecha": `${fecha}`,
      }      
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
            setMensaje(data.mensaje)            
          } else {
            dispatch(agregarEventoLocal(evento))
            setMensaje(data.mensaje)
          }
        })      
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
        <input className='p-2 mt-2' type="textarea" placeholder="Descripcion del evento (opcional)" ref={detalleEvento} />
        <input className="mt-2 p-1" name="boton" type="button" value="Crear evento" onClick={agregarEvento} />
        <p className="text-center mt-2">{mensaje}</p>
      </div>
    </div>
  )
}


export default AgregarEvento

