const mysql = require("mysql");

const conexcion = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

conexcion.connect((error) => {
  if (error) {
    console.log("El error de conexcion es:" + error);
    return;
  }
  console.log("!Conectado de forma correcta a MySQL!");
});

module.exports = conexcion;
