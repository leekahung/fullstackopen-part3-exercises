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

app.get("/api/data/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.post("/api/data", (request, response, next) => {
  const body = request.body;

  if (body.number === undefined) {
    return response.status(404).json({ error: "number missing" });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => next(error));
});

app.delete("/api/data/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.put("/api/data/:id", (request, response, next) => {
  const body = request.body;

  Person.findByIdAndUpdate(request.params.id, body, {
    new: true,
    runValidators: true,
  })
    .then((updatedNote) => {
      if (updatedNote) {
        response.json(updatedNote);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => {
      next(error);
    });
});

morgan.token("body", (request) => JSON.stringify(request.body));
const middlewareLog = ":method :url :status :res[content-length] - ms :body";
app.use(morgan(middlewareLog));

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError") {
    return response
      .status(400)
      .send({ error: "Malformatted ID or ID does not exist in database" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(errorHandler);

module.exports.handler = serverless(app);
