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

const Person = require("./models/person");

app.get("/api/persons", (_request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id).then((result) => {
    response.status(204).end();
  });
});

const generateId = () => {
  return Number((Math.random() * 1000000).toFixed(0));
};

app.post("/api/persons", (request, response) => {
  const body = request.body;
  const newPerson = new Person({
    ...body,
    id: generateId(),
  });

  if (!newPerson.name) {
    return response.status(400).json({
      error: "Person's name is missing",
    });
  } else if (!newPerson.number) {
    return response.status(400).json({
      error: "Person's number is missing",
    });
  }

  newPerson.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.get("/info", (_request, response) => {
  Person.find({}).then((allPersons) => {
    response.send(`
      <div>Phonebook has info for ${allPersons.length} people</div>
      <br>
      <div>${new Date()}</div>
    `);
  });
});

const serverless = require("serverless-http");
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
