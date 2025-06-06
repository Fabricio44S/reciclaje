const axios = require('axios');
const conexion = require('../../database/db');

exports.classifyImage = async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const response = await axios.post('http://localhost:8000/classify', { image_url: imageUrl });
    const result = response.data;
    conexion.query('INSERT INTO resultados SET ?', { image_url: imageUrl, clasificacion: result.label }, (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json(result);
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getResults = (_req, res) => {
  conexion.query('SELECT * FROM resultados', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};
