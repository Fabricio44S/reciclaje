const conexion = require('../../database/db');

exports.createMaterial = (req, res) => {
  const data = req.body;
  conexion.query('INSERT INTO materiales SET ?', data, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Material registrado' });
  });
};

exports.getMaterials = (_req, res) => {
  conexion.query('SELECT * FROM materiales', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
