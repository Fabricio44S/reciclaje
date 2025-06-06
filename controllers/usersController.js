const bcrypt = require("bcryptjs");
const conexion = require("../database/db");

// para salvar
exports.saveusu = (req, res) => {
  const name = req.body.name;
  const user = req.body.user;
  const pass = req.body.pass;
  const role = req.body.role;
  const telefono = req.body.telefono;
  const direccion = req.body.direccion;
  const email = req.body.email;
  const estatus = req.body.estatus;
  conexion.query(
    "INSERT INTO users SET ?",
    { name: name, user: user, pass: pass, role: role, telefono: telefono, direccion: direccion, email: email, estatus: estatus },
    (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.redirect("admin-dashboard");
      }
    }
  );
};

//para actualizar
exports.updateusu  = (req, res) =>{
  const name = req.body.name;
  const user = req.body.user;
  const pass = req.body.pass;
  const role = req.body.role;
  const telefono = req.body.telefono;
  const direccion = req.body.direccion;
  const email = req.body.email;
  const estatus = req.body.estatus;
    // esto es consecutivo, el pimer ? tomara los valores de user y rol, despues el segundo ? sera asignado al rol que se escribe al final;
    // pero en realidad al primer ? le llegan todo el arreglo de datos y lo captura, es por eso que se cierra y id se envia fuera del arreglo
    conexcion.query('UPDATE usuarios SET ? WHERE id = ?',[{ name:name, user:user, pass:pass,  role:role, telefono:telefono, direccion:direccion, email:email, }, id], (error, results) =>{
  
      if (error) {
        console.log(error);
      } else {
        res.redirect("admin-dashboard");
      }
    })
  };


  // para salvar
exports.saveflota = (req, res) => {
 const numero_vehiculo = req.body.numero_vehiculo;
  const tipo_vehiculo = req.body.tipo_vehiculo;
  const capacidad_carga = req.body.capacidad_carga;
  const estado_vehiculo = req.body.estado_vehiculo;
  const fecha_adquisicion = req.body.fecha_adquisicion;
  const observaciones = req.body.observaciones;
  const estatus = req.body.estatus;
    conexion.query(
      "INSERT INTO flota_vehiculos SET ?",
      { numero_vehiculo: numero_vehiculo, tipo_vehiculo: tipo_vehiculo, capacidad_carga: capacidad_carga, estado_vehiculo: estado_vehiculo, fecha_adquisicion: fecha_adquisicion, observaciones: observaciones, estatus: estatus },
      (error, results) => {
        if (error) {
          console.log(error);
        } else {
          res.redirect("adminflota");
        }
      }
    );
  };


  //para actualizar
exports.updateflota  = (req, res) =>{
  const id = req.body.id;
  const numero_vehiculo = req.body.numero_vehiculo;
  const tipo_vehiculo = req.body.tipo_vehiculo;
  const capacidad_carga = req.body.capacidad_carga;
  const estado_vehiculo = req.body.estado_vehiculo;
  const fecha_adquisicion = req.body.fecha_adquisicion;
  const observaciones = req.body.observaciones;
  const estatus = req.body.estatus;
    // esto es consecutivo, el pimer ? tomara los valores de user y rol, despues el segundo ? sera asignado al rol que se escribe al final;
    // pero en realidad al primer ? le llegan todo el arreglo de datos y lo captura, es por eso que se cierra y id se envia fuera del arreglo
    conexion.query('UPDATE flota_vehiculos SET ? WHERE id = ?',[{ numero_vehiculo: numero_vehiculo, tipo_vehiculo: tipo_vehiculo, capacidad_carga: capacidad_carga, estado_vehiculo: estado_vehiculo, fecha_adquisicion: fecha_adquisicion, observaciones: observaciones, estatus: estatus }, id], (error, results) =>{
  
      if (error) {
        console.log(error);
      } else {
        res.redirect("adminflota");
      }
    })
  };