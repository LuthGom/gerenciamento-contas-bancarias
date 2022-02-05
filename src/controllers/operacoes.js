const contaDao = require("../contaDao/contaDao");
const { InvalidArgumentError } = require("../erros/erros");
const Conta = require("../model/Conta");
const RegistroTransferencia = require("../model/RegistrosTransferencias");
const RegistroDeposito = require("../model/RegistrosDepositos");
class OperacoesController {
  static async depositoNaConta(req, res) {
    const cpf = req.params.cpf;
    const {created_at} = req.body
    const  novoDeposito = req.body;
    try {
      const saldoAtual = await contaDao.buscaPorCpf(cpf);
      if (cpf) {
        const saldo = Conta.depositoNaConta(saldoAtual, novoDeposito);
        const novoRegistro = new RegistroDeposito({
          cpf,
          saldoDepositado: novoDeposito.saldo,
          created_at,
        });
        await contaDao.depositoNaConta(saldo, cpf);
        await novoRegistro.geraRegistroDeposito();
        return res.status(200).json(novoRegistro);
      } else {
        throw new InvalidArgumentError("Cpf não encontrado!");
      }
    } catch (error) {
      return res.status(500).json({ erro: error.message });
    }
  }
  static async transferencia(req, res) {
    const cpfTransferidor = req.params.cpfTransferidor;
    const { cpf, created_at } = req.body;
    const valorDeTransferencia = req.body;
    try {
      if (cpfTransferidor && cpf) {
        const contaTransferidora = await contaDao.buscaPorCpf(cpfTransferidor);
        const contaRecebedora = await contaDao.buscaPorCpf(cpf);
        const saldoTransferido = Conta.debitoNaConta(
          contaTransferidora,
          valorDeTransferencia
        );
        const saldoRecebido = Conta.depositoNaConta(
          contaRecebedora,
          valorDeTransferencia
        );
        // gerando um novo registro na tabela de registros de transferencias com os valores do parametro e body.
        const novoRegistro = new RegistroTransferencia({
          cpfTransferidor,
          saldoTransferido: valorDeTransferencia.saldo,
          cpfRecebedor: cpf,
          created_at,
        });
        await contaDao.depositoNaConta(saldoTransferido, cpfTransferidor);
        await contaDao.depositoNaConta(saldoRecebido, cpf);
        await novoRegistro.geraRegistroTransferencia();
        return res.status(200).json(novoRegistro);
      } else {
        throw new InvalidArgumentError(
          "Um ou mais cpf's não estão cadastrados!"
        );
      }
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }
  static async listaTodosOsRegistros(req, res) {
    try {
      const registros = await RegistroTransferencia.listaTodosOsRegistros();
      res.status(200).json(registros);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }
  static async listaTodosOsDepositos(req, res) {
    try {
      const registros = await RegistroDeposito.listaTodosOsDepositos();
      res.status(200).json(registros);
    } catch (erro) {
      res.status(500).json({ erro: erro.message });
    }
  }
}

module.exports = OperacoesController;
