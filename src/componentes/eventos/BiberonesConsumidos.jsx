import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { guardarHora } from "../../features/horaUltimoBiberonSlice"

const BiberonesConsumidos = () => {
    const eventos = useSelector(state => state.evento.listaEventos)
    const [cronometro, setCronometro] = useState('')
    const dispatch = useDispatch()
    const horaUltimoBiberonHoy = useSelector(state => state.biberonHora.ultimoBiberon)
    const [fechaHoy, setFechaHoy] = useState("")

    useEffect(() => {
        const hoy = new Date()
        // Formatea un número a dos dígitos, añadiendo un 0 al inicio si es necesario para corregir los dias y los meses
        const pad = (num) => num.toString().padStart(2, '0')
        const fechaLocal = `${hoy.getFullYear()}-${pad(hoy.getMonth() + 1)}-${pad(hoy.getDate())}`
        setFechaHoy(fechaLocal)

        // Calcular cuantos biberones fueron tomados el día de hoy
        let contador = eventos.filter(e => e.idCategoria == 35 && e.fecha.split(' ')[0] == fechaLocal).length;

        const calcularCronometro = () => {
            if (horaUltimoBiberonHoy != null) {
                const fechaActual = new Date()
                // Le resto 3 horas a la hora actual para que coincida con la hora de acá
                const fechaActualizada = new Date(fechaActual.getTime() - (3 * 60 * 60 * 1000))
                const horaModificada = fechaActualizada.toISOString().split('T')[1].split('.')[0]
                // Convierto a numeros enteros para calcular la diferencia de las horas y los minuto
                let diferenciaHoras = parseInt(horaModificada.split(':')[0], 10) - parseInt(horaUltimoBiberonHoy.split(':')[0], 10)
                let diferenciaMinutos = parseInt(horaModificada.split(':')[1], 10) - parseInt(horaUltimoBiberonHoy.split(':')[1], 10)

                // Ajusto los minutos si la resta da negativo
                if (diferenciaMinutos < 0) {
                    diferenciaHoras -= 1
                    diferenciaMinutos += 60
                }

                // Ajusto las horas por si el evento es del día anterior
                if (diferenciaHoras < 0) {
                    diferenciaHoras += 24
                }
                const diferenciaTotal = `${diferenciaHoras} hora/s ${diferenciaMinutos} minuto/s`
                setCronometro(diferenciaTotal)
            } else {
                setCronometro(`0 hora/s 0 minuto/s`)
            }
        }

        // Calcular a que hora fue el último biberón para hacer el cronómetro
        if (contador > 0) {
            // Obtengo todos los eventos de biberón del día de hoy
            let eventosBiberon = eventos.filter(e => e.idCategoria == 35 && e.fecha.split(' ')[0] == fechaLocal);

            // Ordena los eventos de biberón de menor a mayor por fecha
            eventosBiberon.sort((a, b) => {
                // comparo las fechas
                return new Date(a.fecha) - new Date(b.fecha);
            });

            // Me quedo con el ultimo evento que es el mas reciente
            let ultimoEvento = eventosBiberon[eventosBiberon.length - 1];

            // Obtengo la hora del biberon mas reciente
            let horaUltimoBiberon = ultimoEvento.fecha.split(' ')[1];
            dispatch(guardarHora(horaUltimoBiberon));
            calcularCronometro();
        } else {
            dispatch(guardarHora(null));
        }


    }, [eventos, horaUltimoBiberonHoy])

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
                <h3 className="card-title mb-3">Biberones consumidos hoy:</h3>
                <p className="display-4 mb-3">{eventos.filter(e => e.idCategoria == 35 && e.fecha.split(' ')[0] == fechaHoy).length}</p>
                <h4 className="card-title mb-3">Último biberón consumido hace:</h4>
                <h5 className="font-weight-bold text-muted">{cronometro}</h5>
            </div>
        </div>
    )
}

export default BiberonesConsumidos
