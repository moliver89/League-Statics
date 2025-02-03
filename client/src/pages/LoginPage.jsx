import { useContext, useState } from 'react';

import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

const { VITE_API_URL } = import.meta.env;
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { authLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      //Obtenemos los datos del servidor
      const res = await fetch(`${VITE_API_URL}/api/users/login`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      //Obtenemos el body.
      const body = await res.json();

      if (body.status === 'error') {
        throw new Error(body.message);
      }
      // Almacenamos el token
      authLogin(body.data.token);

      toast.success(body.message);

      navigate('/');
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <main>
      <form onSubmit={handleLogin}>
        <label htmlFor='email'>Email:</label>
        <input
          type='email'
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor='pass'>Contraseña:</label>
        <input
          type='password'
          id='pass'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button>Login</button>
      </form>
    </main>
  );
};

export default LoginPage;
