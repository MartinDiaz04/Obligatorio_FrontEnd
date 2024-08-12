import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
);

const CantCategorias = () => {
    const eventos = useSelector(state => state.evento.listaEventos)
    const [eventosPorDia, setEventosPorDia] = useState([])

    useEffect(() => {
        // Tomo la fecha de hoy y le resto 7 para obtener la semana pasada
        const hoy = new Date();
        const semanaPasada = new Date();
        semanaPasada.setDate(hoy.getDate() - 8);

        // Filtro eventos de la ultima semana
        const eventosTotales = eventos.filter(e => new Date(e.fecha) > semanaPasada && new Date(e.fecha) < hoy && e.idCategoria == 31)


        let datos = []
        // Recorro los ultimos 7 dias contando cada dia la cantidad de eventos
        for (let i = 0; i <= 7; i++) {
            const fecha = new Date();
            // Le resto i dias a la fecha de hoy para ir atras en los dias
            fecha.setDate(hoy.getDate() - i);
            // Cuento eventos del dia en el que estoy parado
            const eventosDia = eventosTotales.filter(e => new Date(e.fecha).getDate() == fecha.getDate()).length            
            // Creo el objeto y lo agrego al array
            const dia = {
                fecha: fecha.toISOString().split('T')[0],
                cantidad: eventosDia,
            }
            datos.push(dia)
        }
        // Seteo los eventos por dia con el array creado antes
        setEventosPorDia(datos)
    }, [eventos])

    return (
        <div>
            <div className='row'>
                <div className='col-12'>
                    <h2>Cantidad de comidas por dia</h2>
                    <Bar options={{
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Comidas',
                            },
                        },
                    }} data={{
                        labels: eventosPorDia.map(e => e.fecha),
                        datasets: [
                            {
                                label: 'Cantidad de comidas por dia',
                                data: eventosPorDia.map(e => e.cantidad),
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            }
                        ],
                    }} />;
                </div>
            </div>
        </div>
    )
}
export default CantCategorias
