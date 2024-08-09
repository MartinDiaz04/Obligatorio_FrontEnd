import { useDispatch, useSelector } from 'react-redux'
import { agregarEvento } from '../../features/eventoSlice';
import { useRef, useState } from 'react'


const AgregarEvento = () => {
  const dispatch = useDispatch();
  const categorias = useSelector(state => state.categoria.listaCategorias)
  const nombreEvento = useRef(null)
  const fechaEvento = useRef(null)
  const horaEvento = useRef(null)
  const categoriaEvento = useRef(null)
  const detalleEvento = useRef(null)
  const [mensajeError, setMensajeError] = useState('')
  const [error, setError] = useState(false)

  const agregarEvento = () => {
    if (verificarCampos()) {
      const userId = localStorage.getItem('userId')    
      const evento = {
        "idcategoria": categoriaEvento.current.value,
        "idUsuario": userId,
        "detalle": detalleEvento.current.value,        
        "fecha": `${fechaEvento.current.value} ${horaEvento.current.value}`,
      }
      console.log(evento)
    }
  }
  const verificarCampos = () => {
    let verificado = true;
    if (nombreEvento.current.value.trim() === '') {
      setError(true)
      setMensajeError('El nombre no puede ser vacio')
      verificado = false;
      return verificado
    }  
    const fechaRecibida = new Date(fechaEvento.current.value) 
    console.log(fechaRecibida.getMonth());

    if (fechaRecibida > Date.now) {
      setError(true)
      setMensajeError('La fecha no puede ser posterior a la actual')      
      verificado = false;
      return verificado;
    }    
    return verificado
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
        {error ? <p className="text-center mt-2">{mensajeError}</p> : null}
      </div>
    </div>
  )
}


export default AgregarEvento

