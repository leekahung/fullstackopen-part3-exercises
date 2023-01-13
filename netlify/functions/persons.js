const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const morgan = require("morgan");
morgan.token("body", (request) => JSON.stringify(request.body));
const middlewareLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms :body"
);
app.use(middlewareLogger);

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

app.get("/api/persons", (_request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return response.status(404).json({
      error: "User not found",
    });
  }

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const personToDelete = persons.find((p) => p.id === id);
  if (personToDelete) {
    persons = persons.filter((p) => p.id !== id);
    response.status(204).end();
  } else {
    response.status(404).json({
      error: "User not found",
    });
  }
});

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0));
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const newPerson = {
    ...body,
    id: generateId(),
  };

  if (!newPerson.name) {
    return response.status(400).json({
      error: "Person's name is missing",
    });
  } else if (!newPerson.number) {
    return response.status(400).json({
      error: "Person's number is missing",
    });
  } else if (persons.map((p) => p.name).includes(newPerson.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  persons = persons.concat(newPerson);
  response.json(newPerson);
});

app.get("/info", (_request, response) => {
  response.send(`
    <div>Phonebook has info for ${persons.length} people</div>
    <br>
    <div>${new Date()}</div>
  `);
});

const serverless = require("serverless-http");
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
