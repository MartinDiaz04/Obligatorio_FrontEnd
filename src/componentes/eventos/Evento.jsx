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
        <div className="row d-flex justify-content-center w-25 mx-1 evento">
            <div className='d-flex align-items-center'>
                <img src={urlImagen} alt="imagen" />
                <p className='text-center px-2 pt-3'>{tipoCategoria}</p>
            </div>
            <div className='pt-3 text-center'>
                <p>{detalle}</p>
                <p>{fecha}</p>
            </div>
            <div className='pb-2 text-center'>
                <input type='button' value='Eliminar' onClick={eliminarEvento} />
            </div>          
        </div>

    )
}

export default Evento
