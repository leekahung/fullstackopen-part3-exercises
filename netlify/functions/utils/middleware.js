const morgan = require("morgan");

morgan.token("body", (request) => JSON.stringify(request.body));
const middlewareLogger = morgan(`
    Method: :method
    Path - Status: :url - :status
    Body: :body
  `);

const errorHandler = (error, _request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({
      error: "malformatted id",
    });
  }

  next(error);
};

module.exports = {
  errorHandler,
  middlewareLogger,
};
