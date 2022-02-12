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
    validacoes.validacaoDeOperacoes(contaAtualizada);
    validacoes.validacaoDeTransferencias(contaAtual, contaAtualizada);
    return new Conta({
      cpf: contaAtual.cpf,
      nome: contaAtual.nome,
      saldo: contaAtual.saldo - contaAtualizada.saldo,
      created_at: contaAtual.created_at,
    });
  }
  static depositoNaConta(contaAtual, contaAtualizada) {
    validacoes.validacaoDeOperacoes(contaAtualizada);

    return new Conta({
      cpf: contaAtual.cpf,
      nome: contaAtual.nome,
      saldo: contaAtual.saldo + contaAtualizada.saldo || contaAtual.saldo,
      created_at: contaAtual.created_at,
    });
  }

  static transferenciaBancaria(cpfTransferidor, valorDeTransferencia, cpfRecebedor) {
    console.log('entrei na Conta');
    Conta.envioBancario(cpfTransferidor, valorDeTransferencia)
    Conta.recebimentoBancario(cpfRecebedor, valorDeTransferencia)
  }

  static async envioBancario(cpfTransferidor, valorDeTransferencia) {
    if (cpfTransferidor) {
      const contaTransferidora = await contaDao.buscaPorCpf(cpfTransferidor);
      const saldoTransferido = Conta.debitoNaConta(
        contaTransferidora,
        valorDeTransferencia
      );
      await contaDao.depositoNaConta(saldoTransferido, cpfTransferidor);
    }  else {
      throw new InvalidArgumentError(
        "Um ou mais cpf's não estão cadastrados!"
      );
    }
  }
  static async recebimentoBancario(cpfRecebedor, valorDeTransferencia) {
    if (cpfRecebedor) {
      const contaRecebedora = await contaDao.buscaPorCpf(cpfRecebedor);

      const saldoRecebido = Conta.depositoNaConta(
        contaRecebedora,
        valorDeTransferencia
      );
      await contaDao.depositoNaConta(saldoRecebido, cpfRecebedor);
    }  else {
      throw new InvalidArgumentError(
        "Um ou mais cpf's não estão cadastrados!"
      );
    }
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
