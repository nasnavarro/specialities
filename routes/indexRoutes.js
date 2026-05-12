import { Router } from "express";
import myRoutes from "./routes.js";
import healthRoutes from "./healthRoutes.js";

const router = Router();

router.use("/", myRoutes);
router.use("/health", healthRoutes);

router.use((req, res) => {
    res.status(404).json({
        error: "Ruta no encontrada",
        message: `La ruta ${req.url} no existe en este servidor`
    });
});

export default router;

