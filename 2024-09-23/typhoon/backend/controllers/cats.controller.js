const cats = [
  {
    id: "7d613b93-fa3e-4ef3-a9d2-e09e5ca6e4e6",
    name: "Meow",
    createdAt: 1727098800585,
    updatedAt: null,
    deleted: false,
  },
  {
    id: "2dc9ce08-d345-4fed-8560-4c6b66fb0836",
    name: "Kitty",
    createdAt: 1727098952739,
    updatedAt: null,
    deleted: false,
  },
];

exports.create = (req, res) => {
  const { name } = req.body;

  if (!name || name === "") {
    return res
      .status(418)
      .send({ type: "Error", message: "Must include a name" });
  }

  const newCat = {
    id: crypto.randomUUID(),
    name: name,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  };

  cats.push(newCat);

  res.send(newCat);
};


exports.read = (req, res) => {
  const activeCats = cats.filter((cat) => !cat.deleted);
  res.send(activeCats);
};

exports.update = (req, res) => {
  const { id, name } = req.body;

  const cat = cats.find((cat) => cat.id === id);

  if (!cat || cat.deleted) {
    return res.status(404).send({ type: "Error", message: "Cat not found" });
  }

  cat.name = name || cat.name;
  cat.updatedAt = Date.now();

  res.send(cat);
};

exports.delete = (req, res) => {
  const { id } = req.body;

  const cat = cats.find((cat) => cat.id === id);

  if (!cat || cat.deleted) {
    return res.status(404).send({ type: "Error", message: "Cat not found" });
  }

  cat.deleted = true;
  cat.updatedAt = Date.now();

  res.send({ type: "Success", message: "Cat deleted" });
};
