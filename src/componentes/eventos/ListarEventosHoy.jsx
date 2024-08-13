import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Evento from "./Evento"

const ListarEventosHoy = () => {
  const eventos = useSelector(state => state.evento.listaEventos)
  const [fechaHoy, setFechaHoy] = useState("")

  useEffect(() => {

    const hoy = new Date()
    // Formatea un número a dos dígitos, añadiendo un 0 al inicio si es necesario para corregir los dias y los meses
    const pad = (num) => num.toString().padStart(2, '0')
    const fechaLocal = `${hoy.getFullYear()}-${pad(hoy.getMonth() + 1)}-${pad(hoy.getDate())}`
    setFechaHoy(fechaLocal)
  }, [])

  return (
    <div className="lista-eventos mt-3 container">
      <h3 className="text-center mb-4">Eventos del día de hoy</h3>
      <ul className="list-unstyled">
        {eventos
          .filter(e => e.fecha.split(' ')[0] == fechaHoy)
          .map(e => (
            <Evento key={e.id} {...e} />
          ))}
      </ul>
    </div>
  )
}

export default ListarEventosHoy
