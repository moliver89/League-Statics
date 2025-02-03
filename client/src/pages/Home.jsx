import useTeams from '../hooks/useTeams';
import { NavLink } from 'react-router-dom';
//Componente main
const Home = () => {
  const { teams } = useTeams();

  return (
    <main className='home'>
      <h2>Equipos</h2>
      <ul>
        {teams.map((team) => {
          return (
            <li key={team.id}>
              {team.id}:
              <NavLink to={`/equipos/${team.id}`}>{team.name}</NavLink>
            </li>
          );
        })}
      </ul>
    </main>
  );
};
export default Home;
