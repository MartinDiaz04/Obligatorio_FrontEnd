import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Evento from "./Evento"

const ListarEventos = () => {
  const eventos = useSelector(state => state.evento.listaEventos)
  const hoy = new Date()
  return (
    <div className="lista-eventos mt-3 container">
      <h3 className="text-center mb-4">Eventos anteriores a hoy</h3>
      <ul className="list-unstyled">
        {eventos
          .filter(e => e.fecha.split(' ')[0] < hoy.toISOString().split('T')[0])
          .map(e => (
            <Evento key={e.id} {...e} />
          ))}
      </ul>
    </div>

  )
}

export default ListarEventos
