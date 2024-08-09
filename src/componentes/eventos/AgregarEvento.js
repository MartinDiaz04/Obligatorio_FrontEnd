import { useDispatch, useSelector } from 'react-redux'
import { agregarEvento } from '../../features/eventoSlice';
import {useRef} from 'react'


const AgregarEvento = () => {
  const dispatch = useDispatch();
  const categorias = useSelector(state => state.categoria.listaCategorias)
  const nombreEvento = useRef(null)
  const fechaEvento = useRef(null)
  const horaEvento = useRef(null)
  const categoriaEvento = useRef(null)
  const agregarEvento = () => {
    console.log()
  }


  return (
    <div className='d-flex justify-content-center'>
      <div className="row w-50 p-5">
        <h1>Agregar Evento</h1>
        <input className='p-2' type="text" placeholder="Nombre del evento" ref={nombreEvento}/>
        <label htmlFor="fecha">Seleccione fecha:</label>
        <input className='p-2' name='fecha' type="date" ref={fechaEvento}/>
        <label htmlFor="hora">Seleccione hora:</label>
        <input className='p-2' name='hora' type="time" ref={horaEvento}/>
        <label htmlFor="categoria">Seleccione categoria:</label>
        <select className='p-2' name='categoria' ref={categoriaEvento}>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>{categoria.tipo}</option>
          ))}
        </select>    
        <input className="mt-2 p-1" name="boton" type="button" value="Crear evento" onClick={agregarEvento}/>
      </div>
    </div>
  )
}


export default AgregarEvento

