//Importamos variables de entorno.
const { VITE_TITLE } = import.meta.env;

//Componente footer.
const Footer = () => {
  return (
    <footer>
      <p>&copy; {VITE_TITLE} 2024</p>
    </footer>
  );
};

export default Footer;
