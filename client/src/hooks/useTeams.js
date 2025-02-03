import { useEffect, useState } from 'react';

const { VITE_API_URL } = import.meta.env;

const useTeams = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`${VITE_API_URL}/api/equipos`);

        const body = await res.json();

        setTeams(body.data.equipos);
      } catch (err) {
        alert(err.message);
      }
    };
    fetchTeams();
  }, []);
  return { teams };
};

export default useTeams;
