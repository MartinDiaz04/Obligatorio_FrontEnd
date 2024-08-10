import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

const BiberonesConsumidos = () => {
    const eventos = useSelector(state => state.evento.listaEventos)
    const [eventosBiberonHoy, setEventosBiberonHoy] = useState([])
    const [ultimoEventoBiberon, setUltimoEventoBiberon] = useState(null)
    const [horaUltimoBiberonHoy, setHoraUltimoBiberonHoy] = useState('')
    const [cronometro, setCronometro] = useState(0)

    let contador = 0;
    // Calcular cuantos biberon fueron tomados el dia de hoy
    eventos.map(e => {
        if (e.idCategoria == 35 && e.fecha.split(' ')[0] === new Date().toISOString().split('T')[0]) {
            contador++;
        }
    })

    useEffect(() => {
        // Calcular a que hora fue el ultimo biberon para hacer el cronometro
        if (contador > 0) {

            // Obtengo todos los eventos de biberon del dia de hoy y asigno el valor al estado
            let eventosBiberon = eventos.filter(e => e.idCategoria == 35 && e.fecha.split(' ')[0] == new Date().toISOString().split('T')[0])
            setEventosBiberonHoy(eventosBiberonHoy)

            // Obtengo el ultimo evento biberon del dia de hoy de los eventos biberones de hoy
            let ultimoEvento = eventosBiberon[eventosBiberon.length - 1]
            setUltimoEventoBiberon(ultimoEvento)

            // Obtengo la hora del ultimo biberon consumido
            let horaUltimoBiberon = ultimoEvento.fecha.split(' ')[1]
            setHoraUltimoBiberonHoy(horaUltimoBiberon)
        } else {
            setHoraUltimoBiberonHoy('')
        }
    }, [eventos])

    const calcularCronometro = () => {        
        
    }




    return (
        <div>
            <h3>Biberones consumidos hoy:</h3>
            <p>{contador}</p>
            <h3>Ultimo biberón consumido:</h3>
            <p>{cronometro}</p>
        </div>
    )
}

export default BiberonesConsumidos