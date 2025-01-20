// Todos.tsx
import { Box, List, Typography, Button, Card, CardContent, CardActions } from "@mui/material";
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

  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8080/todos");
    const data = await response.json();
    setTodos(data);
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
          <Card key={todo.id} style={{ marginBottom: "10px", backgroundColor: "#ffffff" }}>
            <CardContent>
              <Typography variant="h6" color="text.primary">{`Title: ${todo.title}`}</Typography>
              <Typography variant="body2" color="text.secondary">{`Priority: ${todo.priority}`}</Typography>
            </CardContent>
            <CardActions>
              <Button variant="contained" color="primary">
                Edit
              </Button>
              <Button variant="outlined" color="secondary">
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </List>
      <SubmitTodo fetchTodos={fetchTodos} />
    </Box>
  );
};

export default Todos;
