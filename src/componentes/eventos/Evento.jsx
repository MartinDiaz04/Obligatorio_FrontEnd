import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { eliminarEventoLocal } from '../../features/eventoSlice'
import { spinnerCargando } from '../../features/spinnerSlice'
import Spinner from '../Spinner'

const Evento = ({ id, idCategoria, detalle, fecha }) => {
    const url = "https://babytracker.develotion.com/"
    const categorias = useSelector(state => state.categoria.listaCategorias)
    const [mensaje, setMensaje] = useState('')
    const dispatch = useDispatch()
    // Creo el estado por cada componente para que no se muestre el spinner en todos los componentes que lo tienen
    const [spinnerCarga, setSpinnerCarga] = useState(false)


    // Obtengo la categoria de esta manera, porque cuando renderizan a la vez los componentes, las categorias no estan cargadas    
    const categoria = categorias.find(c => c.id === idCategoria)
    const img = categoria ? categoria.imagen : null
    const tipoCategoria = categoria ? categoria.tipo : "Sin categoria"
    const urlImagen = img ? "https://babytracker.develotion.com/imgs/" + img + ".png" : null


    const eliminarEvento = () => {
        setSpinnerCarga(true)
        fetch(url + "/eventos.php?idEvento=" + id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'apikey': localStorage.getItem('apiKey'),
                'iduser': localStorage.getItem('userId')
            }
        })
            .then(r => r.json())
            .then(data => {
                if (data.codigo === 404) {
                    setMensaje(data.mensaje)
                } else {
                    setMensaje(data.mensaje)
                    dispatch(eliminarEventoLocal(id))
                }
                setSpinnerCarga(false)
            })
    }

    return (
        <li className="evento-item d-flex align-items-center p-2 border rounded">
            <img className="evento-imagen me-2" src={urlImagen} alt="Evento" />
            <div className="evento-info d-flex flex-column">
                <p className="evento-categoria mb-1">{tipoCategoria}</p>
                <p className="evento-detalle mb-1">{detalle}</p>
                <p className="evento-fecha text-muted">{fecha}</p>
            </div>
            <button className="btn btn-danger btn-sm ms-2" onClick={eliminarEvento}>Eliminar</button>
            <div className="">
                {spinnerCarga ? <Spinner /> : null}
            </div>
        </li>
    )
}

export default Evento
