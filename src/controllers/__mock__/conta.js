const Conta = require("../model/Conta");

class ContaController {
  static async criaConta(req, res) {
    return {
        id: 500,
        cpf: "659.559.420-09",
        nome: "João do Teste",
        saldo: 0.00,
        created_at: '2022/02/03 02:50:02'
    }
  }
}

module.exports = ContaController;
