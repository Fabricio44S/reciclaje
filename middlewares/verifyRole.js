
exports.verifyRole = (rolesPermitidos) => {
    return (req, res, next) => {
      // Aseguramos que el usuario esté autenticado y que tenga un rol
      if (!req.user || !rolesPermitidos.includes(req.user.role)) {
        return res.status(403).render("error", {
          alertTitle: "Acceso denegado",
          alertMessage: "No tienes permiso para acceder a esta página.",
          alertIcon: "error",
          showConfirmButton: true,
          timer: false,
          ruta: "/login", // Redirige al login o a una página de error
        });
      }
      next(); // Si todo está bien, pasamos al siguiente middleware o controlador
    };
  };
