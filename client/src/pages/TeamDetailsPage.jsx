//import useTeams from '../hooks/useTeams';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const { VITE_API_URL } = import.meta.env;

const TeamDetailsPage = () => {
  //const { teams } = useTeams();
  const [equipo, setEquipo] = useState([]);
  // Obtenemos el ID de la entrada.
  const { teamId } = useParams();
  useEffect(() => {
    const handleGetTeam = async () => {
      try {
        const res = await fetch(`${VITE_API_URL}/api/equipos/${teamId}`);
        const body = await res.json();

        if (body.status === 'error') {
          throw new Error(body.message);
        }
        setEquipo(body.data.equipo);
      } catch (err) {
        toast.error(err.message);
      }
    };
    handleGetTeam();
  }, [teamId]);
  console.log(equipo);
  return (
    <main className='teamDetails'>
      <h2>{equipo.name}</h2>
      {equipo.foto && (
        <ul>
          <li>
            <img
              src={`${VITE_API_URL}/${equipo.foto}`}
              alt={`Escudo de ${equipo.name}`}
            />
          </li>
          <li>Sponsor: {equipo.patrocinador}</li>
          <li>Camiseta Titular: {equipo.camisetaTitular}</li>
          <li>Camiseta Suplente: {equipo.camisetaSuplente}</li>
          <li>Categoria: {equipo.categoria}</li>
        </ul>
      )}
    </main>
  );
};
export default TeamDetailsPage;
