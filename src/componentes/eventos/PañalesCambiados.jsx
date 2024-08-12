import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

const BiberonesConsumidos = () => {
    const eventos = useSelector(state => state.evento.listaEventos)
    const [horaUltimoPañalHoy, setHoraUltimoPañalHoy] = useState('')
    const [cronometro, setCronometro] = useState('')


    useEffect(() => {
        let contador = 0;
        // Calcular cuantos pañales fueron cambiados el dia de hoy
        eventos.map(e => {
            if (e.idCategoria == 33 && e.fecha.split(' ')[0] == new Date().toISOString().split('T')[0]) {
                contador++
            }
        })
        if (contador == 0) {
            setCronometro(`No se ha registrado ningún cambio de pañal hoy`)
        }
        // Calcular a que hora fue el ultimo cambio para hacer el cronometro
        if (contador > 0) {

            // Obtengo todos los eventos de pañales del dia de hoy
            let eventosPañal = eventos.filter(e => e.idCategoria == 33 && e.fecha.split(' ')[0] == new Date().toISOString().split('T')[0])

            // Obtengo el ultimo evento de pañal del dia de hoy
            let ultimoEvento = eventosPañal[eventosPañal.length - 1]

            // Obtengo la hora del ultimo pañal cambiado
            let horaUltimoPañal = ultimoEvento.fecha.split(' ')[1]
            setHoraUltimoPañalHoy(horaUltimoPañal)
            calcularCronometro()
        } else {
            setHoraUltimoPañalHoy(null)
        }
    }, [eventos])

    const calcularCronometro = () => {
        if (horaUltimoPañalHoy != null) {
            const fechaActual = new Date()
            // Le resto 3 horas a la hora actual para que coincida con la hora de aca
            const fechaActualizada = new Date(fechaActual.getTime() - (3 * 60 * 60 * 1000))
            const horaModificada = fechaActualizada.toISOString().split('T')[1].split('.')[0]

            const diferenciaHoras = horaModificada.split(':')[0] - horaUltimoPañalHoy.split(':')[0]
            const diferenciaMinutos = horaModificada.split(':')[1] - horaUltimoPañalHoy.split(':')[1]
            const diferenciaTotal = `${diferenciaHoras} hora/s ${diferenciaMinutos} minuto/s`
            setCronometro(diferenciaTotal)
        } else {
            setCronometro(`0 hora/s 0 minuto/s`)
        }

    }


    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
                <h3 className="card-title mb-3">Pañales cambiados hoy:</h3>
                <p className="display-4 mb-3">{eventos.filter(e => e.idCategoria == 33 && e.fecha.split(' ')[0] == new Date().toISOString().split('T')[0]).length}</p>
                <h3 className="card-title mb-3">Último pañal cambiado hace:</h3>
                <p className="h5 font-weight-bold text-muted">{cronometro}</p>
            </div>
        </div>
    )
}

export default BiberonesConsumidos