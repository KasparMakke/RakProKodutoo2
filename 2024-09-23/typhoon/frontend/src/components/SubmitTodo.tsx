import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";

type SubmitTodoProps = {
  fetchTodos: () => void;
};

const SubmitTodo = ({ fetchTodos }: SubmitTodoProps) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<number | "">("");

  const handleSubmit = async () => {
    if (!title || priority === "") {
      alert("Please fill in all fields.");
      return;
    }

    await fetch("http://localhost:8080/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        priority: Number(priority),
      }),
    });

    setTitle("");
    setPriority("");
    fetchTodos();
  };

  return (
    <Box>
      <TextField
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Priority"
        type="number"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add Todo
      </Button>
    </Box>
  );
};

export default SubmitTodo;
