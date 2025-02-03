import { useEffect, useState } from 'react';

function Pruebas() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    // Actualizamos el estado date cada segundo
    setInterval(() => {
      console.log('se ejecutó el interval');
      setDate(new Date());
    }, 1000);
  }, []);

  console.log('se renderizó el componente');

  return (
    <main>
      <h1>Utilizando useEffect</h1>

      <p>Hora actual: {date.toLocaleTimeString()}</p>
    </main>
  );
}

export default Pruebas;
