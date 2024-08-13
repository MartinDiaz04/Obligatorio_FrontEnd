import { useSelector } from "react-redux"
import { useState, useEffect } from "react"

const BiberonesConsumidos = () => {
    const eventos = useSelector(state => state.evento.listaEventos)
    const [horaUltimoPañalHoy, setHoraUltimoPañalHoy] = useState('')
    const [cronometro, setCronometro] = useState('')
    const [fechaHoy, setFechaHoy] = useState("")


    useEffect(() => {
        const hoy = new Date()
        // Formatea un número a dos dígitos, añadiendo un 0 al inicio si es necesario para corregir los dias y los meses
        const pad = (num) => num.toString().padStart(2, '0')
        const fechaLocal = `${hoy.getFullYear()}-${pad(hoy.getMonth() + 1)}-${pad(hoy.getDate())}`
        setFechaHoy(fechaLocal)
        // Calcular cuantos pañales fueron cambiados el dia de hoy
        let contador = eventos.filter(e => e.idCategoria == 33 && e.fecha.split(' ')[0] == fechaLocal).length;

        if (contador == 0) {
            setCronometro(`No se ha registrado ningún cambio de pañal hoy`)
        }        
        // Calcular a que hora fue el último biberón para hacer el cronómetro
        if (contador > 0) {
            // Obtengo todos los eventos de biberón del día de hoy
            let eventosCambio = eventos.filter(e => e.idCategoria == 33 && e.fecha.split(' ')[0] == fechaLocal);

            // Ordena los eventos de pañal de menor a mayor por fecha
            eventosCambio.sort((a, b) => {
                // comparo las fechas
                return new Date(a.fecha) - new Date(b.fecha);
            });

            // Me quedo con el ultimo evento que es el mas reciente
            let ultimoEvento = eventosCambio[eventosCambio.length - 1];

            // Obtengo la hora del biberon mas reciente
            let horaUltimoCambio = ultimoEvento.fecha.split(' ')[1];
            setHoraUltimoPañalHoy(horaUltimoCambio);
            calcularCronometro();
        } else {
            setHoraUltimoPañalHoy(null);
        }
    }, [eventos, horaUltimoPañalHoy])

    const calcularCronometro = () => {
        if (horaUltimoPañalHoy != null) {
            const fechaActual = new Date()
            // Le resto 3 horas a la hora actual para que coincida con la hora de aca
            const fechaActualizada = new Date(fechaActual.getTime() - (3 * 60 * 60 * 1000))
            const horaModificada = fechaActualizada.toISOString().split('T')[1].split('.')[0]
            let diferenciaHoras = horaModificada.split(':')[0] - horaUltimoPañalHoy.split(':')[0]
            let diferenciaMinutos = horaModificada.split(':')[1] - horaUltimoPañalHoy.split(':')[1]
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
        } else {
            setCronometro(`0 hora/s 0 minuto/s`)
        }
    }


    return (
        <div className="card mb-4">
            <div className="card-body text-center">
                <h3 className="card-title mb-3">Pañales cambiados hoy:</h3>
                <p className="display-4 mb-3">{eventos.filter(e => e.idCategoria == 33 && e.fecha.split(' ')[0] == fechaHoy).length}</p>
                <h4 className="card-title mb-3">Último pañal cambiado hace:</h4>
                <h5 className="font-weight-bold text-muted">{cronometro}</h5>
            </div>
        </div>
    )
}

export default BiberonesConsumidos