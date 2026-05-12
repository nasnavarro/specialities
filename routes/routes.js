import express from "express";
import * as myController from "../controllers/controller.js";

const router = express.Router();

//Página principal
//router.get('/', (req, res) => myController.getAllUsers(req,res)); //Para JSON
router.get('/', (req, res) => myController.getIndexHtml(req,res)); //Para HTML

//Página por especialidades
//router.get("/:especialidad", (req, res) => myController.getUsersBySpecialty(req,res));    //Para JSON
router.get("/:especialidad", (req, res) => myController.getUsersBySpecialtyHtml(req,res));    //Para HTML

export default router;