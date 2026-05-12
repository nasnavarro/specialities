import express from "express";
import * as myController from "../controllers/controller.js";

const router = express.Router();

router.get('/', (req, res) => myController.getAllUsers(req,res));

//router.get("/:id", miMetodoDeControlador);

export default router;