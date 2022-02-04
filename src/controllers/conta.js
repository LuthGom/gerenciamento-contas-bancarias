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
    const deposito = { ...req.body}
    try {
      const dadosAtuais = await Conta.buscaPorCpf(cpf);
      const conta = Conta.depositoNaConta(dadosAtuais, deposito);

      if(await Conta.buscaPorCpf(conta.cpf) && conta.cpf !== dadosAtuais.cpf){
        throw new InvalidArgumentError('Usuário com este CPF já existe!')
      }

      await contaDao.depositoNaConta(conta)
    } catch (error) {
      console.log(error);
      return res.status(500).json({ erro: error.message });
    }
  }
}

module.exports = ContaController;
