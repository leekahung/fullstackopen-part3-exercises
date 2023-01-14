const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const Person = require("./models/person");

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
