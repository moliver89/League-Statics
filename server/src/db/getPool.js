//Activamos las variables de entorno
import "dotenv/config";

//importamos la version asincrona del modulo "mysql2"
import mysql from "mysql2/promise";

const { MYSQL_HOST, MYSQL_USER, MYSQL_PASS, MYSQL_DB } = process.env;

let pool;

//Funcion que retornara el "pool"

const getPool = async () => {
  try {
    //Si no existe un "pool" de conexiones lo crea
    if (!pool) {
      //Si pool es undefined es Falsy por lo que agregarle "!"(NOT) lo hace Truthy en ingresa en el if y crea el pool
      pool = mysql.createConnection({
        host: MYSQL_HOST,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        database: MYSQL_DB,
        timezone: "Z",
      });
    } //Si el pool ya estaba creado solo lo devuelve mediante el return

    //Retornamos el "pool"
    return await pool;
  } catch (err) {
    console.error(err);
  }
};

export default getPool;
