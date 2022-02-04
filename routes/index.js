const bodyParser = require("body-parser");

const contas = require("./routes");

module.exports = (app) => {
  app.use(bodyParser.json(), contas);
};
