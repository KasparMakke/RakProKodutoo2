import {
  Box,
  List,
  ListItem,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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
    await fetch(`http://localhost:8080/todos`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchTodos();
  };

  const updateTodo = async (id: number, title: string, priority: number) => {
    await fetch(`http://localhost:8080/todos`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, priority }),
    });
    setEditingTodo(null);
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Todos
      </Typography>
      <List>
        {todos.map((todo) => (
          <Card key={todo.id} style={{ marginBottom: "10px" }}>
            <CardContent>
              {editingTodo?.id === todo.id ? (
                <>
                  <TextField
                    fullWidth
                    value={editingTodo.title}
                    onChange={(e) =>
                      setEditingTodo({ ...editingTodo, title: e.target.value })
                    }
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
                    style={{ marginTop: "10px" }}
                  />
                </>
              ) : (
                <>
                  <Typography>{`Title: ${todo.title}`}</Typography>
                  <Typography>{`Priority: ${todo.priority}`}</Typography>
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
