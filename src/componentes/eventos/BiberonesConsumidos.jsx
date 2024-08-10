import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

const BiberonesConsumidos = () => {
    const eventos = useSelector(state => state.evento.listaEventos)
    const [horaUltimoBiberonHoy, setHoraUltimoBiberonHoy] = useState('')
    const [cronometro, setCronometro] = useState('')
    let contador = 0;

    // Calcular cuantos biberones fueron tomados el dia de hoy
    eventos.map(e => {
        if (e.idCategoria == 35 && e.fecha.split(' ')[0] === new Date().toISOString().split('T')[0]) {
            contador++
        }
    })

    useEffect(() => {
        if (contador == 0) {
            setCronometro(`No se ha registrado ningún biberón hoy`)
        }
        // Calcular a que hora fue el ultimo biberon para hacer el cronometro
        if (contador > 0) {

            // Obtengo todos los eventos de biberon del dia de hoy y asigno el valor al estado
            let eventosBiberon = eventos.filter(e => e.idCategoria == 35 && e.fecha.split(' ')[0] == new Date().toISOString().split('T')[0])


            // Obtengo el ultimo evento biberon del dia de hoy de los eventos biberones de hoy
            let ultimoEvento = eventosBiberon[eventosBiberon.length - 1]


            // Obtengo la hora del ultimo biberon consumido
            let horaUltimoBiberon = ultimoEvento.fecha.split(' ')[1]
            setHoraUltimoBiberonHoy(horaUltimoBiberon)
            calcularCronometro()
        } else {
            setHoraUltimoBiberonHoy('')
        }
    }, [eventos])

    const calcularCronometro = () => {
        let horaActual = new Date().toISOString().split('T')[1].split('.')[0]
        const diferenciaHoras = horaActual.split(':')[0] - horaUltimoBiberonHoy.split(':')[0]
        const diferenciaMinutos = horaActual.split(':')[1] - horaUltimoBiberonHoy.split(':')[1]
        const diferenciaTotal = `${diferenciaHoras - 3} hora/s ${diferenciaMinutos} minuto/s`
        setCronometro(diferenciaTotal)
    }




    return (
        <div>
            <h3>Biberones consumidos hoy:</h3>
            <p>{contador}</p>
            <h3>Ultimo biberón consumido hace:</h3>
            <p>{cronometro}</p>
        </div>
    )
}

export default BiberonesConsumidos