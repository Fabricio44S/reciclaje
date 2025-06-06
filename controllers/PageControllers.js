// configuracion 15/12/2024
const vistaPrincipal = (req, res) => {
  res.render("home");
};

const vistaTables = (req, res) => {
  res.render("tables");
};

const vistaNotificaciones = (req, res) => {
  res.render("notificaciones");
};

module.exports = {
  vistaPrincipal,
  vistaTables,
  vistaNotificaciones,
};

/// hasta aqui arriba
