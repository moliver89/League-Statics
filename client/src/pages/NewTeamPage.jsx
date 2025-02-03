import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const { VITE_API_URL } = import.meta.env;

const NewTeamPage = () => {
  const { authToken, authUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [sponsor, setSponsor] = useState('');
  const [home, setHome] = useState('');
  const [away, setAway] = useState('');
  const [cat, setCat] = useState('');
  const [photo, setPhoto] = useState(null);

  const handleNewTeam = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.append('name', name);
      formData.append('sponsor', sponsor);
      formData.append('home', home);
      formData.append('away', away);
      formData.append('cat', cat);
      formData.append('photo', photo);

      const res = await fetch(`${VITE_API_URL}/api/equipos/register`, {
        method: 'post',
        headers: {
          Authorization: authToken,
        },
        body: formData,
      });

      const body = await res.json();

      if (body.status === 'error') {
        throw new Error(body.message);
      }
      toast.success(body.message);

      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <main className='newTeam'>
      <h2>Nuevo Equipo</h2>

      <form className='formTeam' onSubmit={handleNewTeam}>
        <div className='newTeamData'>
          <label htmlFor='name'>Nombre: </label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className='newTeamData'>
          <label htmlFor='sponsor'>Patrocinador: </label>
          <input
            type='text'
            id='sponsor'
            value={sponsor}
            onChange={(e) => setSponsor(e.target.value)}
            required
          />
        </div>

        <div className='newTeamData'>
          <label htmlFor='home'>Camiseta Titular: </label>
          <input
            type='text'
            id='home'
            value={home}
            onChange={(e) => setHome(e.target.value)}
            required
          />
        </div>

        <div className='newTeamData'>
          <label htmlFor='away'>Camiseta Suplente: </label>
          <input
            type='text'
            id='away'
            value={away}
            onChange={(e) => setAway(e.target.value)}
            required
          />
        </div>

        <div className='newTeamData'>
          <label htmlFor='cat'>Categoria: </label>
          <input
            type='text'
            id='cat'
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            required
          />
        </div>

        <div className='newTeamData'>
          <label htmlFor='photo'>Imagen: </label>
          <input
            type='file'
            id='photo'
            onChange={(e) => setPhoto(e.target.files[0])}
            accept='image/jpeg, image/png'
            required
          />
        </div>
        <button>Crear Equipo</button>
      </form>
    </main>
  );
};

export default NewTeamPage;
