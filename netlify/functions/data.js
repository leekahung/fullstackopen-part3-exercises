const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const morgan = require("morgan");

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const app = express();
app.use(cors());
app.use(express.json());

morgan.token("body", (request) => JSON.stringify(request.body));
const middlewareLog = ":method :url :status :res[content-length] - ms :body";
app.use(morgan(middlewareLog));

app.get("/api/data", (request, response) => {
  response.json(persons);
});

app.get("/api/data/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const generateId = () => {
  return Math.max(...persons.map((p) => p.id)) + 1;
};

app.post("/api/data", (request, response) => {
  const body = request.body;
  const newPersonObject = {
    ...body,
    id: generateId(),
  };

  persons = persons.concat(newPersonObject);
  response.json(newPersonObject);
});

app.delete("/api/data/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

app.put("/api/data/:id", (request, response) => {
  const id = Number(request.params.id);
  const updatedPerson = request.body;
  persons = persons.map((p) => (p.id !== id ? p : updatedPerson));

  response.json(updatedPerson);
});

module.exports.handler = serverless(app);
