import express from "express";
import * as myController from "../controllers/controller.js";

const router = express.Router();

//Página principal
router.get('/', (req, res) => myController.getAllUsers(req,res));

//Página por especialidades
router.get("/:especialidad", (req, res) => myController.getUsersBySpecialty(req,res));

export default router;