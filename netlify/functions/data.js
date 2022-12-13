const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const morgan = require("morgan");
const Person = require("../../models/person");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/data", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/api/data/:id", (request, response) => {
  Person.findById(request.params.id).then((person) => {
    response.json(person);
  });
});

app.post("/api/data", (request, response) => {
  const body = request.body;

  if (body.name === undefined) {
    return response.status(404).json({ error: "name missing" });
  } else if (body.number === undefined) {
    return response.status(404).json({ error: "number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.delete("/api/data/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id).then(() => {
    response.status(204).end();
  });
});

app.put("/api/data/:id", (request, response) => {
  const body = request.body;

  Person.findByIdAndUpdate(request.params.id, body, { new: true })
    .then((updatedNote) => {
      if (updatedNote) {
        response.json(updatedNote);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      console.log(error);
      response.status(500).end();
    });
});

morgan.token("body", (request) => JSON.stringify(request.body));
const middlewareLog = ":method :url :status :res[content-length] - ms :body";
app.use(morgan(middlewareLog));

module.exports.handler = serverless(app);
