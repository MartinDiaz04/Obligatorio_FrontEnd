import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const Evento = ({ detalle, idCategoria, fecha }) => {
    const fechaReducida = fecha.split(' ')[0]
    const categorias = useSelector(state => state.categoria.listaCategorias)
    const categoria = categorias.filter(c => c.id === idCategoria)
    
        


    



    // fetch("https://babytracker.develotion.com/imgs/" + imagen + ".png", {
    //     method: "GET",
    //     headers: {
    //         'Content-Type': 'application'
    //     }
    // })
    //     .then((r) => r.json())
    //     .then((data) => {
    //         console.log(data)

    //     })

    return (
        <div className="row d-flex justify-content-center align-items-center">
            <h1>{detalle}</h1>
            <p>{idCategoria}</p>
            <p>{fechaReducida}</p>
        </div>
    )
}

export default Evento
