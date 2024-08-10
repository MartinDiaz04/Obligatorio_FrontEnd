import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { eliminarEventoLocal } from '../../features/eventoSlice'

const Evento = ({ id, idCategoria, detalle, fecha }) => {
    const url = "https://babytracker.develotion.com/"
    const categorias = useSelector(state => state.categoria.listaCategorias)
    const img = categorias.filter(c => c.id == idCategoria)[0].imagen
    const tipoCategoria = categorias.filter(c => c.id == idCategoria)[0].tipo
    const urlImagen = "https://babytracker.develotion.com/imgs/" + img + ".png"
    const dispatch = useDispatch()
    const [mensaje, setMensaje] = useState('')

    const eliminarEvento = () => {
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
        </li>

    )
}

export default Evento
