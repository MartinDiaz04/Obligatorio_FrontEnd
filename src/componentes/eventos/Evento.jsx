import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Evento = ({ detalle, idCategoria, fecha }) => {
    const url = "https://babytracker.develotion.com/imgs/"
    const fechaReducida = fecha.split(' ')[0]
    const categorias = useSelector(state => state.categoria.listaCategorias)
    console.log(idCategoria)
    const img = categorias.filter(categoria => categoria.id == idCategoria)[0].imagen
    
    useEffect(() =>{
        fetch(url + img + ".png", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
        })
        .then((r) => r.json())
        .then((data) => {
            console.log(data)
    })
    })
    

    return (
        <div className="row d-flex justify-content-center align-items-center">
            <h1>{detalle}</h1>
            <p>{idCategoria}</p>
            <p>{fechaReducida}</p>
        </div>
    )
}

export default Evento
