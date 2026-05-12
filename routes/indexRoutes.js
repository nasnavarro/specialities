import { Router } from "express";
import myRoutes from "./routes.js";
import healthRoutes from "./healthRoutes.js";

const router = Router();

// Rutas genéricas. Metemos todas en un único archivo al ser un ejercicio simple.
router.use("/", myRoutes);
// Ruta health para autodiagnóstico.
router.use("/health", healthRoutes);

// Control de rutas no encontradas.
router.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        message: `La ruta ${req.url} no existe en este servidor`
    });
});

export default router;