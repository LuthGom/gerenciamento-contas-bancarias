const contaDao = require("../contaDao/contaDao");
const { InvalidArgumentError } = require("../erros/erros");
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
      console.log(error);
      return res.status(500).json({ erro: error.message });
    }
  }
  static async listaTodasAsContas(req, res) {
    const contas = await Conta.listaTodasAsContas();
    res.status(200).json(contas);
  }
  static async depositoNaConta(req, res) {
    const cpf = req.params.cpf;
    const novoDeposito = { ...req.body };
    console.log(novoDeposito);
    try {
      const saldoAtual = await contaDao.buscaPorCpf(cpf);
      console.log('testando');
      const saldo = Conta.depositoNaConta(saldoAtual, novoDeposito)
      console.log(saldo);
      await contaDao.depositoNaConta(saldo, cpf);
      console.log('teste2');
      res.status(200).json(saldo);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ erro: error.message });
    }
  }
  static async deletaConta(req, res) {
    try {
      const cpf = req.params.cpf;
      const resposta = await contaDao.deletaConta(cpf);
      res.status(200).json(`Conta de cliente do cpf ${cpf} deletada!`)
    } catch (erro) {
      console.log(erro);
      res.status(500).json({erro: erro.message})
    }
  }
}

module.exports = ContaController;
