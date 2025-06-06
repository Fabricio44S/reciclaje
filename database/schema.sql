-- Robots configuration
CREATE TABLE IF NOT EXISTS robots (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50),
  modelo VARCHAR(50),
  parametros JSON
);

-- Materials to recycle
CREATE TABLE IF NOT EXISTS materiales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tipo VARCHAR(50),
  estado VARCHAR(20),
  cantidad DECIMAL(10,2)
);

-- Cronograma de reciclaje
CREATE TABLE IF NOT EXISTS cronograma (
  id INT AUTO_INCREMENT PRIMARY KEY,
  robot_id INT,
  material_id INT,
  fecha DATETIME,
  FOREIGN KEY (robot_id) REFERENCES robots(id),
  FOREIGN KEY (material_id) REFERENCES materiales(id)
);

-- Resultados de clasificacion
CREATE TABLE IF NOT EXISTS resultados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(255),
  clasificacion VARCHAR(50),
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
