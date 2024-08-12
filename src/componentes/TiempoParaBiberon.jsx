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
            
            // Ajusta si los minutos restantes son negativos
            if (minutosRestantes < 0) {                
                horasRestantes -= 1;
                minutosRestantes += 60;
            }
            // Asegura que las horas restantes sean positivas
            if (horasRestantes < 0) {
                horasRestantes += 24;
            }
            
            const tiempo = `${horasRestantes} horas y ${minutosRestantes} minutos para el proximo biberon`

            setTiempo(tiempo)
            const claseH = horasRestantes > 0 ? 'enHora' : 'atrasado'
            setEnHora(claseH)

        } else {
            setTiempo('No se ha registrado un biberon hoy')
        }
    }, [ultimoBiberon])



    return (
        <div className='text-center'>
            <h1 className={enHora}>{tiempo}</h1>
        </div>
    )
}

export default TiempoParaBiberon
