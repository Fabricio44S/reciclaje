const conexion = require('../../database/db');

exports.createSchedule = (req, res) => {
  const data = req.body;
  conexion.query('INSERT INTO cronograma SET ?', data, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Tarea agendada' });
  });
};

exports.getSchedules = (_req, res) => {
  conexion.query('SELECT * FROM cronograma', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
