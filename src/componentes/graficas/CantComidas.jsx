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
    const eventos = useSelector(state => state.evento.listaEventos);
    const [eventosPorDia, setEventosPorDia] = useState([]);

    useEffect(() => {
        const hoy = new Date();
        const semanaPasada = new Date();
        semanaPasada.setDate(hoy.getDate() - 7); // Obteniendo la fecha de hace 7 días

        // Filtrar eventos de la última semana y de la categoría específica
        const eventosTotales = eventos.filter(e => {
            const fechaEvento = new Date(e.fecha.split(' ')[0]); // Ignorar la hora y obtener solo la fecha
            return fechaEvento >= semanaPasada && fechaEvento <= hoy && e.idCategoria == 31;
        });

        let datos = [];
        // Recorro los últimos 7 días contando cada día la cantidad de eventos
        for (let i = 0; i <= 7; i++) {
            const fecha = new Date(hoy);
            fecha.setDate(hoy.getDate() - i); // Ir un día hacia atrás

            // Formatear la fecha para asegurarse de que se compara correctamente
            const fechaFormateada = fecha.toISOString().split('T')[0];

            // Cuento eventos del día en el que estoy parado
            const eventosDia = eventosTotales.filter(e => e.fecha.split(' ')[0] == fechaFormateada).length;

            // Crear el objeto y agregarlo al array
            const dia = {
                fecha: fechaFormateada,
                cantidad: eventosDia,
            };
            datos.push(dia);
        }

        // Setear los eventos por día con el array creado antes
        setEventosPorDia(datos);
    }, [eventos]);

    return (
        <div>
            <div className='row'>
                <div className='col-12'>
                    <h2>Cantidad de comidas por día</h2>
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
                                label: 'Cantidad de comidas por día',
                                data: eventosPorDia.map(e => e.cantidad),
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            }
                        ],
                    }} />
                </div>
            </div>
        </div>
    )
}

export default CantCategorias;
