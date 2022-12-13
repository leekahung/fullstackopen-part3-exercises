const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const Person = require("../../models/person");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(`
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    `);
  });
});

module.exports.handler = serverless(app);
