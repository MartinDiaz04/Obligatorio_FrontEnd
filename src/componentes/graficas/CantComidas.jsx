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

    useEffect(() => {
        // Tomo la fecha de hoy y le resto 7 para obtener la semana pasada
        const hoy = new Date();
        const semanaPasada = new Date();
        semanaPasada.setDate(hoy.getDate() - 7);
        console.log(semanaPasada)

        // Filtro eventos de esta semana
        const eventosTotales = eventos.filter(e => new Date(e.fecha) > semanaPasada && new Date(e.fecha) < hoy)
    }, [])



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
                                text: 'Categorias',
                            },
                        },
                    }} data={{
                        labels: "`  fgdsg",
                        datasets: [
                            {
                                label: 'Cantidad de eventos por categoria',
                                data: "gfd",
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
