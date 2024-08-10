import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Evento = ({ detalle, idCategoria, fecha }) => {
    const url = "https://babytracker.develotion.com/imgs/"
    const fechaReducida = fecha.split(' ')[0]
    const categorias = useSelector(state => state.categoria.listaCategorias)    
    const img = categorias.filter(categoria => categoria.id == idCategoria)[0].imagen
    const urlImagen = url + img + ".png"
    
    return (
        <div className="row d-flex justify-content-center align-items-center">
            <img src={urlImagen} alt="imagen" />                        
            <p>{fechaReducida}</p>
            <h1>{detalle}</h1>
        </div>
    )
}

export default Evento
