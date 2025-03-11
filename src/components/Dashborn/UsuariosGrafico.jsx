import PropTypes from 'prop-types'; // Importar PropTypes
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const UsuariosGrafico = ({ usuarios }) => {
    const obtenerEstadisticasRoles = () => {
        const roles = usuarios.reduce((acc, user) => {
            acc[user.rol_id] = (acc[user.rol_id] || 0) + 1;
            return acc;
        }, {});

        return {
            labels: Object.keys(roles),
            data: Object.values(roles),
        };
    };

    const { labels, data } = obtenerEstadisticasRoles();

    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Usuarios por Rol',
            data: data,
            backgroundColor: 'rgba(0, 238, 255, 0.78)', // Gris oscuro semitransparente
            borderColor: 'rgba(0, 238, 255, 0.78)', // Gris oscuro para los bordes
            borderWidth: 1
        }]
    };
    

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false, // Desactivar para permitir el control total de tamaño
            plugins: {
                title: {
                    display: true,
                    text: 'Distribución de Usuarios por Rol',
                },
                legend: {
                    position: 'top',
                },
            },
        };
    

    return (
        <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

// Validar las props con PropTypes
UsuariosGrafico.propTypes = {
    usuarios: PropTypes.array.isRequired, // 'usuarios' debe ser un array
};

export default UsuariosGrafico;
