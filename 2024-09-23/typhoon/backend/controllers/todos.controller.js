const todos = [
    {
      id: 1,
      title: "Buy groceries",
      priority: 2,
      createdAt: 1727098800585,
      updatedAt: null,
      deleted: false,
    },
    {
      id: 2,
      title: "Clean the house",
      priority: 3,
      createdAt: 1727098952739,
      updatedAt: null,
      deleted: false,
    },
  ];
  
  // Create a new TODO
  exports.create = (req, res) => {
    const { title, priority } = req.body;
  
    if (!title || title === "" || typeof priority !== "number") {
      return res.status(418).send({
        type: "Error",
        message: "Must include a title and priority as a number",
      });
    }
  
    const newTodo = {
      id: todos.length + 1,
      title,
      priority,
      createdAt: Date.now(),
      updatedAt: null,
      deleted: false,
    };
  
    todos.push(newTodo);
  
    res.send(newTodo);
  };
  
  // Read all TODOs (excluding deleted ones)
  exports.read = (req, res) => {
    const activeTodos = todos.filter((todo) => !todo.deleted);
    res.send(activeTodos);
  };
  
  exports.update = (req, res) => {
    const { id, title, priority } = req.body;
  
    const todo = todos.find((todo) => todo.id === parseInt(id));
  
    if (!todo || todo.deleted) {
      return res.status(404).send({ type: "Error", message: "TODO not found" });
    }
  
    todo.title = title || todo.title;
    todo.priority = priority || todo.priority;
    todo.updatedAt = Date.now();
  
    res.send(todo);
  };
  
  exports.delete = (req, res) => {
    const { id } = req.body;
  
    const todo = todos.find((todo) => todo.id === parseInt(id));
  
    if (!todo || todo.deleted) {
      return res.status(404).send({ type: "Error", message: "TODO not found" });
    }
  
    todo.deleted = true;
    todo.updatedAt = Date.now();
  
    res.send({ type: "Success", message: "TODO deleted" });
  };
  
  const { generateToken, verifyToken } = require("../utils/jwt.utils");

  // GET endpoint - Tagasta token
  exports.getToken = (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send({ type: "Error", message: "Name is required" });
    }

    const token = generateToken({ name });
    res.send({ token });
  };

  // POST endpoint - Kontrolli tokenit
  exports.verifyToken = (req, res) => {
    const { token } = req.body;

    if (!token) {
      return res.status(400).send({ type: "Error", message: "Token is required" });
    }

    const decoded = verifyToken(token);

    if (decoded) {
      res.send({ valid: true, decoded });
    } else {
      res.status(401).send({ valid: false, message: "Invalid or expired token" });
    }
  };
