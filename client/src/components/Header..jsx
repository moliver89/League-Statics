import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

//Importamos variables de entorno.
const { VITE_TITLE } = import.meta.env;

//Importamos el contexto
import { AuthContext } from '../contexts/AuthContext';
import useUser from '../hooks/useUser';

//Componente Header.
const Header = () => {
  const { authLogout } = useContext(AuthContext);

  const { user, setUser } = useUser();
  return (
    <header>
      <h1 className='titulo'>
        <NavLink to='/'>{VITE_TITLE}</NavLink>
      </h1>
      <nav>
        {user ? (
          <>
            <NavLink to='/equipos/register'>Agregar Equipo</NavLink>
            {' | '}
            <button
              onClick={() => {
                authLogout();
                setUser(null);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to='/RegisterPage'>Registrarse</NavLink>
            {' | '}
            <NavLink to='/LoginPage'>Login</NavLink>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
