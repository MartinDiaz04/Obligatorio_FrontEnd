import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

const TiempoParaBiberon = () => {
    const [tiempo, setTiempo] = useState('')
    const ultimoBiberon = useSelector(state => state.biberonHora.ultimoBiberon)
    const [enHora, setEnHora] = useState('')

    useEffect(() => {
        // Obtengo la hora y minutos del ultimo biberon
        const horaSiguienteBiberon = ultimoBiberon ? Number(ultimoBiberon.split(':')[0]) + 4 : null
        const minutosUltimoBiberon = ultimoBiberon ? Number(ultimoBiberon.split(':')[1]) : null


        // Obtengo hora y minutos actuales
        const horaActual = new Date().getHours()
        const minutosActuales = new Date().getMinutes()


        if (ultimoBiberon) {
            // Calculo la diferencia de tiempo
            let horasRestantes = horaSiguienteBiberon - horaActual
            let minutosRestantes = minutosUltimoBiberon - minutosActuales
            if (horasRestantes < 0) {          
                const tiempo = `Tienes ${horasRestantes} horas y ${minutosRestantes} minutos sin darle el biberon`
                setTiempo(tiempo)
                setEnHora('atrasado')
            } else {
                const tiempo = `${horasRestantes} horas y ${minutosRestantes} minutos para el proximo biberon`
                setTiempo(tiempo)
                setEnHora('enHora')
            }

        } else {
            setTiempo('No se ha registrado un biberon hoy')
        }
    }, [ultimoBiberon])



    return (
        <div className='text-center tiempo-biberon'>
            <p className={enHora} id='parrafo-biberon'>{tiempo}</p>
        </div>
    )
}

export default TiempoParaBiberon
