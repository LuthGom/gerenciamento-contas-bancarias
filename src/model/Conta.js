const { InvalidArgumentError } = require("../erros/erros");
const validacoes = require("../validacoes/validacoes");
const contaDao = require("../contaDao/contaDao");
class Conta {
  constructor(contaBancaria) {
    this.cpf = contaBancaria.cpf;
    this.nome = contaBancaria.nome;
    this.saldo = contaBancaria.saldo;
    this.created_at = contaBancaria.created_at;
    this.valida();
  }
  async criaConta() {
    if (await Conta.buscaPorCpf(this.cpf)) {
      throw new InvalidArgumentError(
        `O cliente de CPF ${this.cpf} já possui conta!`
      );
    }
    return contaDao.criaConta(this);
  }
  static listaTodasAsContas() {
    return contaDao.listaTodasAsContas();
  }
  static async buscaPorCpf(cpf) {
    const cliente = await contaDao.buscaPorCpf(cpf);
    if (!cliente) {
      return null;
    }
    return new Conta(cliente);
  }
  static debitoNaConta(contaAtual, contaAtualizada) {
    if (contaAtualizada.saldo > contaAtual.saldo) {
      throw new InvalidArgumentError(
        "Valor de retirada maior do que o saldo em conta. Transação negada!"
      );
    }
    if (contaAtualizada.saldo <= 0) {
      throw new InvalidArgumentError("Valor inválido.");
    }
    return new Conta({
      cpf: contaAtual.cpf,
      nome: contaAtual.nome,
      saldo: contaAtual.saldo - contaAtualizada.saldo || contaAtual.saldo,
      created_at: contaAtual.created_at,
    });
  }
  static depositoNaConta(contaAtual, contaAtualizada) {
    if (contaAtualizada.saldo > 2000) {
      throw new InvalidArgumentError(
        `O limite máximo para depósitos em conta são de ${2000}`
      );
    }
    if (contaAtualizada.saldo <= 0) {
      throw new InvalidArgumentError("Valor inválido.");
    }
   
    return new Conta({
      cpf: contaAtual.cpf,
      nome: contaAtual.nome,
      saldo: contaAtual.saldo + contaAtualizada.saldo || contaAtual.saldo,
      created_at: contaAtual.created_at,
    });
  }

  static async deletaConta(cpf) {
    const contaASerDeletada = await contaDao.deletaConta(cpf);
    if (!contaASerDeletada) {
      return null;
    }
    return contaASerDeletada;
  }

  valida() {
    validacoes.validaNome(this.nome, "nome", 4);
  }
}

module.exports = Conta;
