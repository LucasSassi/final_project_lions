import { Router } from "express";
import carController from "../controllers/car.controller.js";
import { authMiddleware, requireRole, Role } from "../middlewares/auth-middleware.js";
import { ensureValidId } from "../middlewares/validate.middleware.js";

const router = Router();

// Rotas públicas - qualquer um pode ver
router.get("/cars", carController.listAvailable);
router.get("/cars/available", carController.listAvailable);
router.get("/cars/search", carController.searchByBrand);
router.get("/cars/:id", ensureValidId, carController.get);
// Rota protegida - usuário autenticado pode comprar
router.post("/cars/:id/buy", authMiddleware(), ensureValidId, carController.buy);

// Rotas protegidas - apenas ADMIN pode criar, atualizar e deletar
router.post("/cars", authMiddleware(), requireRole(Role.ADMIN), carController.create);
router.put("/cars/:id", authMiddleware(), requireRole(Role.ADMIN), ensureValidId, carController.update);
router.delete("/cars/:id", authMiddleware(), requireRole(Role.ADMIN), ensureValidId, carController.remove);

export default router;
