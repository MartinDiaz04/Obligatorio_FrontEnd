import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Evento = ({ detalle, idCategoria, fecha }) => {
    const url = "https://babytracker.develotion.com/imgs/"
    const fechaReducida = fecha.split(' ')[0]
    const categorias = useSelector(state => state.categoria.listaCategorias)
    const img = categorias.filter(categoria => categoria.id == idCategoria)[0].imagen
    const tipoCategoria = categorias.filter(categoria => categoria.id == idCategoria)[0].tipo
    const urlImagen = url + img + ".png"

    return (
        <div className="row d-flex justify-content-center w-25 mx-1 evento">
            <div className='d-flex align-items-center'>
                <img src={urlImagen} alt="imagen" />
                <p className='text-center px-2 pt-3'>{tipoCategoria}</p>
            </div>
            <div className='pt-3 text-center'>
                <p>{detalle}</p>
                <p>{fechaReducida}</p>
            </div>
            <div className='pb-2 text-center'>
                <button>Eliminar</button>
            </div>

        </div>
    )
}

export default Evento
