import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Evento from "./Evento"

const ListarEventos = () => {
  const eventos = useSelector(state => state.evento.listaEventos)
  const hoy = new Date()
  const año = hoy.getFullYear()
  const mes = String(hoy.getMonth() + 1).padStart(2, '0'); // padStart agrega un 0 si el numero es menor a 10 para poder comparar con la fecha recibida por el evento
  const dia = String(hoy.getDate()).padStart(2, '0');
  const fecha = `${año}-${mes}-${dia}`
  
  return (
    <div className="row d-flex justify-content-center listaEventos">
      
        <h1 className="text-center">Eventos del dia de hoy</h1>
        {/* Le saco la hora para comprar solo el dia */}
        {eventos.filter(e => e.fecha.split(' ')[0] == fecha).map((e, i) => (
          <Evento key={i} {...e} />
        ))
        }

    </div>

  )
}

export default ListarEventos
