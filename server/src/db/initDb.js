//Importamos la funcion que retorna el pool de conexiones
import getPool from './getPool.js';

// Funcion que genera las tablas en la BD

const main = async () => {
    try {
        //Obtenemos el pool.
        const pool = await getPool();

        console.log('Borrando tablas...');

        //Borramos las tablas.
        await pool.query('DROP TABLE IF EXISTS equipos, jugadores, partidos');
        console.log('Creando tablas...');
        //Creamos la tabla si no existe
        await pool.query(`
            CREATE TABLE IF NOT EXISTS equipos(
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
                name VARCHAR(30) NOT NULL,
                patrocinador VARCHAR(30),
                camisetaTitular VARCHAR(15),
                camisetaSuplente VARCHAR(15),
                categoria ENUM('sub-18', 'senior'),
                foto VARCHAR(100),
                fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP)`);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS jugadores(
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                nombre VARCHAR(50) NOT NULL,
                apellido VARCHAR(50) NOT NULL,
                fechaNac DATE NOT NULL,
                direccion VARCHAR(100),
                telefono VARCHAR(20),
                idEquipo INT UNSIGNED,
                FOREIGN KEY (idEquipo) REFERENCES equipos(id),
                fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP
                )`);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS partidos(
                id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
                resultado VARCHAR(7),
                campo VARCHAR(30) NOT NULL,
                arbitro VARCHAR(100) NOT NULL,
                idEquipoA INT UNSIGNED,
                FOREIGN KEY (idEquipoA) REFERENCES equipos(id),
                idEquipoB INT UNSIGNED,
                FOREIGN KEY (idEquipoB) REFERENCES equipos(id),
                incidencias VARCHAR(200),
                fechaCreacion DATETIME DEFAULT CURRENT_TIMESTAMP
                )`);
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL,
                registrationCode CHAR(30),
                role ENUM('Normal', 'Admin') DEFAULT 'Normal',
                active BOOLEAN DEFAULT false,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
                )`);
        console.log('Tablas creadas!');
        //const result = await pool.query('SELECT * FROM equipos');
    } catch (err) {
        console.error(err);
    }
};

main();
