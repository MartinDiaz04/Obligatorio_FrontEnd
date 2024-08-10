import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

const BiberonesConsumidos = () => {
    const eventos = useSelector(state => state.evento.listaEventos)
    const [horaUltimoPañal, setHoraUltimoPañal] = useState('')
    const [cronometro, setCronometro] = useState('')
    let contador = 0;

    // Calcular cuantos biberones fueron tomados el dia de hoy
    eventos.map(e => {
        if (e.idCategoria == 33 && e.fecha.split(' ')[0] === new Date().toISOString().split('T')[0]) {
            contador++
        }
    })

    useEffect(() => {
        if (contador == 0) {
            setCronometro(`No se ha registrado ningún cambio de pañal hoy`)
        }
        // Calcular a que hora fue el ultimo biberon para hacer el cronometro
        if (contador > 0) {

            // Obtengo todos los eventos de biberon del dia de hoy y asigno el valor al estado
            let eventosPañal = eventos.filter(e => e.idCategoria == 35 && e.fecha.split(' ')[0] == new Date().toISOString().split('T')[0])


            // Obtengo el ultimo evento biberon del dia de hoy de los eventos biberones de hoy
            let ultimoEvento = eventosPañal[eventosPañal.length - 1]


            //  Obtengo la hora del ultimo biberon consumido
            //let horaUltimoPañal = ultimoEvento.fecha.split(' ')[1]
            //setHoraUltimoPañal(horaUltimoPañal)
            //calcularCronometro()
        } else {
            setHoraUltimoPañal('')
        }
    }, [eventos])

    const calcularCronometro = () => {
        let horaActual = new Date().toISOString().split('T')[1].split('.')[0]
        const diferenciaHoras = horaActual.split(':')[0] - horaUltimoPañal.split(':')[0]
        const diferenciaMinutos = horaActual.split(':')[1] - horaUltimoPañal.split(':')[1]
        const diferenciaTotal = `${diferenciaHoras - 3} hora/s ${diferenciaMinutos} minuto/s`
        setCronometro(diferenciaTotal)
    }




    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
                <h3 className="card-title mb-3">Pañales cambiados hoy:</h3>
                <p className="display-4 mb-3">{contador}</p>
                <h3 className="card-title mb-3">Último pañal cambiado hace:</h3>
                <p className="h5 font-weight-bold text-muted">{cronometro}</p>
            </div>
        </div>
    )
}

export default BiberonesConsumidos