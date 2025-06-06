const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
// configuracion 15/12/2024

/*const path = require("path");
const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);*/
//app.use(express.static(path.join(__dirname, 'public')));
/// hasta aqui arriba

// Seteamos el motor de plantillas
app.set("view engine", "ejs");

// SETEAMOS LA CARPETA PUBLIC, sin embargo para relizar esto hay que especificarlo y avisarle a node a donde es ;)
app.use(express.static("public"));

// para procesar DATOS ENVIADOS DESDE forms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// SETEAMOS LAS VARIABLE DE ENTORNO
const dotenv = require("dotenv");
dotenv.config({ path: "./env/.env" });

// SETEAMOS LAS COOKIES
app.use(cookieParser());

// LLAMAR AL router
app.use("/", require("./routes/router"));

/* app.get('/',(req, res) =>{
    res.render('index')
})
 */

//Middleware para evitar cache si el usuario no esta autenticado
app.use(function (req, res, next) {
  if (!req.user)
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});

app.listen(3000, () => {
  console.log("SERVER corriendo en http://localhost:3000");
});

//06/12/2024
app.get("/user", (req, res) => {
  res.render("user"); // Renderiza la vista 'user.ejs'
});
