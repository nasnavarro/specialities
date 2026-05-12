import express from "express";
import routes from './routes/indexRoutes.js';

const app = express();

// Middleware para que el servidor entienda JSON
app.use(express.json());

// Conexión de rutas por recurso a un index que centraliza toda la gestión de rutas.
app.use(routes);

export default app;

