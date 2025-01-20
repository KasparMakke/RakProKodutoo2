const express = require("express");
const router = express.Router();
const todosController = require("../controllers/todos.controller");
const {
  todosRouteMiddleware,
  todosGetRouteMiddleware,
} = require("../middlewares/todos.middlewares");
const { validateTodo } = require("../middlewares/todoValidation");

router.use(todosRouteMiddleware);

// Define endpoints
router.get("/", todosController.read);
router.post("/", validateTodo, todosController.create);
router.put("/", validateTodo, todosController.update);
router.delete("/", todosController.delete);
router.get("/token", todosController.getToken);
router.post("/verify", todosController.verifyToken);

module.exports = router;
