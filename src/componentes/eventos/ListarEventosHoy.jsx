import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Evento from "./Evento"

const ListarEventos = () => {
  const eventos = useSelector(state => state.evento.listaEventos)
  const hoy = new Date()
  return (
    <div className="row d-flex justify-content-center listaEventos">
      
        <h1 className="text-center">Eventos del dia de hoy</h1>
        {/* Le saco la hora para comprar solo el dia */}
        {eventos.filter(e => e.fecha.split(' ')[0] == hoy.toISOString().split('T')[0]).map(e => (
          <Evento key={e.id} {...e} />
        ))
        }

    </div>

  )
}

export default ListarEventos
