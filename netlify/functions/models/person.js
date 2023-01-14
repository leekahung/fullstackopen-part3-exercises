const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((_result) => {
    console.log("Connected with MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting with MongoDB", error.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (v) {
        return /^\d{2,3}[-][0-9]+$/.test(v);
      },
    },
  },
});

personSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
