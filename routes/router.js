const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

const { verifyRole } = require("../middlewares/verifyRole");

// configuracion 15/12/2024

const usersController = require('../controllers/usersController');
const conexion = require("../database/db");
/*const {
  vistaPrincipal,
  vistaTables,
  vistaNotificaciones,
} = require("../controllers/PageControllers");*/
/// hasta aqui arriba

// Router para las vistas

router.get("/", (req, res) => {
  res.render("index01");
});
router.get("/index", authController.isAuthenticated, (req, res) => {
  res.render("index", { user: req.user });
});

router.get("/login", (req, res) => {
  res.render("login", { alert: false });
});

router.get("/register", (req, res) => {
  res.render("register");
});

//06/12/2024
// Rutas restringidas por roles
// Ruta para Administrador

// configuracion 15/12/2024
/*router.get(
  "/admin-dashboard",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
    res.render("admin-dashboard", { user: req.user });
  }
);*/


// Ruta para listar usuarios
router.get("/admin-dashboard",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
    conexion.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    } else {
      res.render("admin-dashboard", { user: req.user, results: results});
    }
  });
}); 

router.get("/crearusers",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
      res.render("crearusers");
}); 


/*router.get("/adminflota",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
    conexion.query("SELECT * FROM flota_vehiculos", (error, results, coche) => {
      if (error) {
        throw error;
      } else {
        res.render("adminflota", { user: req.user, results: results, coche: coche});
      }
    });
}); */

router.get("/adminflota",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
  conexion.query(
    "SELECT * FROM flota_vehiculos WHERE estatus = 1",
    (error, results, coche) => {
      if (error) {
        throw error;
      } else {
        // Aquí pasamos los resultados a la vista con el nombre "results"
        res.render("adminflota", { user: req.user, results: results, coche: coche});
      }
    }
  );
});

router.get("/crearflota",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
      res.render("crearflota");
}); 

// RUTA PARA EDITAR REGISTROS
router.get("/editflota/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "SELECT * FROM flota_vehiculos WHERE id=?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("editflota", { coche: results[0] });
      }
    }
  );
});

router.get("/delete/:id", (req, res) => {
  const id = req.params.id;
  conexion.query(
    "UPDATE flota_vehiculos SET estatus = 0 WHERE id = ?",
    [id],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        res.redirect("/adminflota");
      }
    }
  );
});


/*router.get("/adminclasi",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
      res.render("adminclasi", { user: req.user });
}); */

// Ruta para listar materiales reciclados
router.get("/adminclasi",
  authController.isAuthenticated,
  verifyRole(["Administrador"]),
  (req, res) => {
    conexion.query("SELECT * FROM materiales_reciclados", (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("adminclasi", { user: req.user, results: results });
      }
    });
});



router.get("/admincliente",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
      res.render("admincliente", { user: req.user });
}); 


router.get("/adminentrega",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
      res.render("adminentrega", { user: req.user });
}); 
router.get("/admingasto",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
      res.render("admingasto", { user: req.user });
}); 

/*router.get("/admininventario",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
      res.render("admininventario", { user: req.user });
}); */


// Ruta para listar inventarios
/*router.get("/admininventario",
  authController.isAuthenticated,
  verifyRole(["Administrador"]),
  (req, res) => {
    conexion.query("SELECT * FROM inventario", (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("admininventario", { user: req.user, results: results });
      }
    });
});*/

// Ruta para listar inventarios
router.get("/admininventario",
  authController.isAuthenticated,
  verifyRole(["Administrador"]),
  (req, res) => {
    const query = `
      SELECT inventario.id, materiales_reciclados.nombre_material, inventario.stock
      FROM inventario
      JOIN materiales_reciclados ON inventario.id_material = materiales_reciclados.id;
    `;
    conexion.query(query, (error, results, inventario) => {
      if (error) {
        throw error;
      } else {
        res.render("admininventario", { user: req.user, results: results, inventario: inventario });
      }
    });
});



/*router.get("/adminpedido",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
      res.render("adminpedido", { user: req.user });
}); */

// Ruta para listar pedidos
router.get("/adminpedido",
  authController.isAuthenticated,
  verifyRole(["Administrador"]),
  (req, res) => {
    conexion.query("SELECT * FROM pedidos", (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("adminpedido", { user: req.user, results: results });
      }
    });
});

router.get("/adminincidente",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
      res.render("adminincidente", { user: req.user });
}); 

/*router.get("/adminResiduos",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
      res.render("adminResiduos", { user: req.user });
}); */

// Ruta para listar residuos
router.get("/adminResiduos",
  authController.isAuthenticated,
  verifyRole(["Administrador"]),
  (req, res) => {
    conexion.query("SELECT * FROM residuos", (error, results) => {
      if (error) {
        throw error;
      } else {
        res.render("adminResiduos", { user: req.user, results: results });
      }
    });
});


router.get("/adminruta",
  authController.isAuthenticated,
  verifyRole(["Administrador"]), // Solo accesible para usuarios con el rol 'admin'
  (req, res) => {
      res.render("adminruta", { user: req.user });
}); 
//router.get("/", vistaPrincipal);
//router.get("/tables", vistaTables);
//router.get("/notificaciones", vistaNotificaciones);
/// hasta aqui :)

// Ruta para Supervisor
router.get(
  "/supervisor-dashboard",
  authController.isAuthenticated,
  verifyRole(["Supervisor", "Administrador"]), // Accesible para 'Supervisor' y 'Administrador'
  (req, res) => {
    res.render("supervisor-dashboard", { user: req.user });
  }
);
// Ruta para Funcionario
router.get(
  "/user-dashboard",
  authController.isAuthenticated,
  verifyRole(["Funcionario", "Administrador"]),
  (req, res) => {
    res.render("user-dashboard", { user: req.user });
  }
);



// Router para los metodos del controller
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authController.logout);

//modificacion 16/12/2024
router.post("/saveflota", usersController.saveflota);
router.post("/updateflota", usersController.updateflota);
router.post("/saveusu", usersController.saveusu);
router.post("/updateusu", usersController.updateusu);
// hasta aqui

module.exports = router;
