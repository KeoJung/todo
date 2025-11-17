import express from "express";
import { createTodo, getTodosByUser } from "../controllers/todoController.js";

const router = express.Router();

router.post("/", createTodo);
router.get("/:userId", getTodosByUser);

export default router;
