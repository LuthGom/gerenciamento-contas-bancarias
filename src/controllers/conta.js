const contaDao = require("../contaDao/contaDao");
const Conta = require("../model/Conta");

class ContaController {
  static async criaConta(req, res) {
    const { cpf, nome, saldo, created_at } = req.body;

    try {
      const novaConta = new Conta({
        cpf,
        nome,
        saldo,
        created_at,
      });
      await novaConta.criaConta();
      res.status(200).json(novaConta);
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
  static async listaTodasAsContas(req, res) {
    try {
      const contas = await Conta.listaTodasAsContas();
      res.status(200).json(contas);
    } catch (erro) {
      res.status(500).json(erro);
    }
  }
  static async deletaConta(req, res) {
    try {
      const cpf = req.params.cpf;
      const resposta = await contaDao.deletaConta(cpf);
      res.status(200).json(`Conta de cliente do cpf ${cpf} deletada!`);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = ContaController;
