import {
  Box,
  List,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import SubmitTodo from "./SubmitTodo";

type Todo = {
  id: number;
  title: string;
  priority: number;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Todos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8080/todos");
    const data = await response.json();
    setTodos(data);
  };

  const deleteTodo = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/todos`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      fetchTodos(); // Refresh the TODO list
    } catch (error) {
      console.error("Error deleting TODO:", error);
    }
  };

  const updateTodo = async (id: number, title: string, priority: number) => {
    try {
      await fetch(`http://localhost:8080/todos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, title, priority }),
      });
      setEditingTodo(null); // Exit editing mode
      fetchTodos(); // Refresh the TODO list
    } catch (error) {
      console.error("Error updating TODO:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Box>
      <Typography variant="h3" gutterBottom color="primary">
        Todos
      </Typography>
      <List>
        {todos.map((todo) => (
          <Card
            key={todo.id}
            style={{ marginBottom: "10px", backgroundColor: "#ffffff" }}
          >
            <CardContent>
              {editingTodo?.id === todo.id ? (
                <>
                  <TextField
                    fullWidth
                    value={editingTodo.title}
                    onChange={(e) =>
                      setEditingTodo({ ...editingTodo, title: e.target.value })
                    }
                    placeholder="Edit title"
                  />
                  <TextField
                    fullWidth
                    type="number"
                    value={editingTodo.priority}
                    onChange={(e) =>
                      setEditingTodo({
                        ...editingTodo,
                        priority: parseInt(e.target.value, 10),
                      })
                    }
                    placeholder="Edit priority"
                    style={{ marginTop: "10px" }}
                  />
                </>
              ) : (
                <>
                  <Typography variant="h6" color="text.primary">
                    {`Title: ${todo.title}`}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Priority: ${todo.priority}`}
                  </Typography>
                </>
              )}
            </CardContent>
            <CardActions>
              {editingTodo?.id === todo.id ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() =>
                      updateTodo(todo.id, editingTodo.title, editingTodo.priority)
                    }
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditingTodo(null)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditingTodo(todo)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => deleteTodo(todo.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        ))}
      </List>
      <SubmitTodo fetchTodos={fetchTodos} />
    </Box>
  );
};

export default Todos;
