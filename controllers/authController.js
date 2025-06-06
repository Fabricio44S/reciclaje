const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const conexion = require("../database/db");
const { promisify } = require("util");
const res = require("express/lib/response");
const { error } = require("console");

// procedimineto para registrasnos
exports.register = async (req, res) => {
  try {
    const name = req.body.name;
    const user = req.body.user;
    const pass = req.body.pass;
    let passHash = await bcryptjs.hash(pass, 8);
    // console.log(passHash)
    conexion.query(
      "INSERT INTO users SET ?",
      { user: user, name: name, pass: passHash, role: "Funcionario" },
      (error, results) => {
        if (error) {
          console.log(error);
        }
        res.redirect("/login");
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  try {
    const user = req.body.user;
    const pass = req.body.pass;

    if (!user || !pass) {
      res.render("login", {
        alert: true,
        alertTitle: "Advertencia",
        alertMessage: "Ingrese un usuario y/o contraseña",
        alertIcon: "info",
        showConfirmButton: true,
        timer: false,
        ruta: "login",
      });
    } else {
      conexion.query(
        "SELECT * FROM users WHERE user = ?",
        [user],
        async (error, results) => {
          if (
            results.length == 0 ||
            !(await bcryptjs.compare(pass, results[0].pass))
          ) {
            res.render("login", {
              alert: true,
              alertTitle: "Error",
              alertMessage: "Usuario y/o contraseña incorrecta",
              alertIcon: "error",
              showConfirmButton: true,
              timer: false,
              ruta: "login",
            });
          } else {
            // inicio de sesion validado
            const id = results[0].id;
            // Obtenemos el rol del usuario 
            const role = results[0].role; 
            //Modificacion 6/12/2024
            const token = jwt.sign({ id: id, role: role }, process.env.JWT_SECRETO, {
              expiresIn: process.env.JWT_TIEMPO_EXPIRA,
            });
            // generamos el token sin fecha de expiracion
            // const token = jwt.sing({id:id}, process.env.JWT_SECRETO)
            //console.log("TOKEN" + token + "para el usuario: " + user);

            const cookieOptions = {
              expires: new Date(
                Date.now() +
                  process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
              ),
              httpOnly: true,
            };

            res.cookie("jwt", token, cookieOptions);
            // modifiacion el 2-6/12/2024
            // Redirigimos según el rol del usuario
            let rutaRedireccion = "index"; // Valor por defecto
            if (role === "Administrador") {
              rutaRedireccion = "admin-dashboard";
            } else if (role === "Supervisor") {
              rutaRedireccion = "supervisor-dashboard";
            } else if (role === "Funcionario") {
              rutaRedireccion = "user-dashboard";
            }


            //
            res.render("login", {
              alert: true,
              alertTitle: "Conecion exitosa",
              alertMessage: "LOGIN Corrrecto!!!!",
              alertIcon: "success",
              showConfirmButton: false,
              timer: 800,
              ruta: rutaRedireccion,
            });
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

// metodo para autentificar el usuario
/*exports.isAuthenticated = async (req, res, next) =>{
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
      conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results) =>{
        if(!results){return next()}
        req.user = results[0]
        return next()
      })
    } catch (error) {
      console.log(error)
      
    }
  }else{
    res.redirect('/login')
  }
}*/

exports.isAuthenticated = async (req, res, next) => {
  if (req.cookies.jwt) {
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRETO
      );

      // Consulta a la base de datos para obtener los datos del usuario
      conexion.query(
        "SELECT * FROM users WHERE id = ?",
        [decodificada.id],
        (error, results) => {
          if (error || results.length === 0) {
            console.log("Error en la consulta o usuario no encontrado.");
            return res.redirect("/login");
          }

          req.user = {
            id: results[0].id,
            name: results[0].name,
            user: results[0].user,
            role: results[0].role, // Incluimos el rol en req.user
          };

          return next();
        }
      );
    } catch (error) {
      console.log("Error al verificar el token JWT:", error);
      return res.redirect("/login");
    }
  } else {
    // Si no hay token en las cookies
    return res.redirect("/login");
  }
};

// procedimiento para cerrar sesion
exports.logout = (req, res) =>{
  res.clearCookie('jwt')
  return res.redirect('/')
}