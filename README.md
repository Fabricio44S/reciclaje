# Reciclaje Robot Management

Este proyecto contiene un backend en Node.js y un microservicio en Python para clasificar residuos mediante visión artificial.

## Backend

Las rutas principales están en `routes/api`. Los controladores se encuentran en `controllers/api`.

Para iniciar el servidor Node:
```bash
npm install
node app.js
```

## Microservicio de visión

Dentro de `vision_service` se encuentra un pequeño servicio FastAPI que responde a `/classify`.

Para ejecutarlo:
```bash
pip install -r requirements.txt
uvicorn main:app --reload
```
