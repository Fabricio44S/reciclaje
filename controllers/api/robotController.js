const conexion = require('../../database/db');

exports.createRobot = (req, res) => {
  const data = req.body;
  conexion.query('INSERT INTO robots SET ?', data, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Robot creado' });
  });
};

exports.getRobots = (_req, res) => {
  conexion.query('SELECT * FROM robots', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
