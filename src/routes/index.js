const bodyParser = require("body-parser");

const contas = require("./contaRoutes");
const transacoes = require("./operacoesRoutes");
module.exports = (app) => {
  app.use(bodyParser.json(), contas, transacoes);
};
