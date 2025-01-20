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
import SubmitCat from "./SubmitCat";

type Cat = {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number | null;
  deleted: boolean;
};

const Cats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [editingCat, setEditingCat] = useState<Cat | null>(null);

  const fetchCats = async () => {
    const response = await fetch("http://localhost:8080/cats");
    const data = await response.json();
    setCats(data);
  };

  const deleteCat = async (id: string) => {
    await fetch(`http://localhost:8080/cats`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchCats();
  };

  const updateCat = async (id: string, name: string) => {
    await fetch(`http://localhost:8080/cats`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name }),
    });
    setEditingCat(null);
    fetchCats();
  };

  useEffect(() => {
    fetchCats();
  }, []);

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Cats
      </Typography>
      <List>
        {cats.map((cat) => (
          <Card key={cat.id} style={{ marginBottom: "10px" }}>
            <CardContent>
              {editingCat?.id === cat.id ? (
                <TextField
                  fullWidth
                  value={editingCat.name}
                  onChange={(e) =>
                    setEditingCat({ ...editingCat, name: e.target.value })
                  }
                />
              ) : (
                <Typography>{`Name: ${cat.name}`}</Typography>
              )}
            </CardContent>
            <CardActions>
              {editingCat?.id === cat.id ? (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updateCat(cat.id, editingCat.name)}
                  >
                    Save
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => setEditingCat(null)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setEditingCat(cat)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => deleteCat(cat.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </CardActions>
          </Card>
        ))}
      </List>
      <SubmitCat fetchCats={fetchCats} />
    </Box>
  );
};

export default Cats;
