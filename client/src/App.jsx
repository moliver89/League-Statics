import { Routes, Route } from 'react-router-dom';
// Importamos los estilos
import '../index.css';
// Importamos los componentes
import Header from './components/Header.';
import Home from './pages/Home';
import Footer from './components/Footer';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Pruebas from './pages/Pruebas';
import NewTeamPage from './pages/NewTeamPage';
import TeamDetailsPage from './pages/TeamDetailsPage';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <>
      <Header />
      <Toaster
        position='top-center'
        toastOptions={{
          duration: 4000,
        }}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/registerPage' element={<RegisterPage />} />
        <Route path='/loginPage' element={<LoginPage />} />
        <Route path='/pruebas' element={<Pruebas />} />
        <Route path='/equipos/register' element={<NewTeamPage />} />
        <Route path='/equipos/:teamId' element={<TeamDetailsPage />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
