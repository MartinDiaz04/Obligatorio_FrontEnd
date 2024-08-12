import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { guardarHora } from "../../features/horaUltimoBiberonSlice"


const BiberonesConsumidos = () => {
    const eventos = useSelector(state => state.evento.listaEventos)
    const [cronometro, setCronometro] = useState('')
    const dispatch = useDispatch()
    const horaUltimoBiberonHoy = useSelector(state => state.biberonHora.ultimoBiberon)
    useEffect(() => {
        let contador = 0;
        // Calcular cuantos biberones fueron tomados el dia de hoy
        eventos.map(e => {
            if (e.idCategoria == 35 && e.fecha.split(' ')[0] == new Date().toISOString().split('T')[0]) {
                contador++
            }
        })
        const calcularCronometro = () => {
            if (horaUltimoBiberonHoy != null) {
                const fechaActual = new Date()
                // Le resto 3 horas a la hora actual para que coincida con la hora de aca
                const fechaActualizada = new Date(fechaActual.getTime() - (3 * 60 * 60 * 1000))
                const horaModificada = fechaActualizada.toISOString().split('T')[1].split('.')[0]

                let diferenciaHoras = horaModificada.split(':')[0] - horaUltimoBiberonHoy.split(':')[0]
                let diferenciaMinutos = horaModificada.split(':')[1] - horaUltimoBiberonHoy.split(':')[1]

                // Ajusto los minutos si la resta da negativo
                if (diferenciaMinutos < 0) {
                    diferenciaHoras -= 1;
                    diferenciaMinutos += 60;
                }

                // Ajusto las horas por si el evento es del dia anterior
                if (diferenciaHoras < 0) {
                    diferenciaHoras += 24;
                }
                const diferenciaTotal = `${diferenciaHoras} hora/s ${diferenciaMinutos} minuto/s`
                setCronometro(diferenciaTotal)
                console.log("entro")
            } else {
                setCronometro(`0 hora/s 0 minuto/s`)
            }

        }
        if (contador == 0) {
            setCronometro(`No se ha registrado ningún biberón hoy`)
        }
        // Calcular a que hora fue el ultimo biberon para hacer el cronometro
        if (contador > 0) {

            // Obtengo todos los eventos de biberon del dia de hoy
            let eventosBiberon = eventos.filter(e => e.idCategoria == 35 && e.fecha.split(' ')[0] == new Date().toISOString().split('T')[0])

            // Obtengo el ultimo evento biberon del dia de hoy de los eventos biberones de hoy
            let ultimoEvento = eventosBiberon[eventosBiberon.length - 1]

            // Obtengo la hora del ultimo biberon consumido
            let horaUltimoBiberon = ultimoEvento.fecha.split(' ')[1]
            dispatch(guardarHora(horaUltimoBiberon))
            calcularCronometro()
        } else {
            dispatch(guardarHora(null))
        }





    }, [eventos], [horaUltimoBiberonHoy])



    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
                <h3 className="card-title mb-3">Biberones consumidos hoy:</h3>
                <p className="display-4 mb-3">{eventos.filter(e => e.idCategoria == 35 && e.fecha.split(' ')[0] == new Date().toISOString().split('T')[0]).length}</p>
                <h3 className="card-title mb-3">Último biberón consumido hace:</h3>
                <p className="h5 font-weight-bold text-muted">{cronometro}</p>
            </div>
        </div>
    )
}

export default BiberonesConsumidos