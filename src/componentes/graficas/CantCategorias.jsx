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
    const categorias = useSelector(state => state.categoria.listaCategorias)
    const eventos = useSelector(state => state.evento.listaEventos)    

    const cantEventos = categorias.map(c => ({
        categoriaTipo: c.tipo,
        cantidad: eventos.filter(e => e.idCategoria === c.id).length
    }))


    return (
        <div>
            <div className='row'>
                <div className='col-12'>
                    <h2>Cantidad de eventos por categoría</h2>
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
                        labels: cantEventos.map((c, i) => c.categoriaTipo),
                        datasets: [
                            {
                                label: 'Cantidad de eventos por categoria',
                                data: cantEventos.map(e => e.cantidad),
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
