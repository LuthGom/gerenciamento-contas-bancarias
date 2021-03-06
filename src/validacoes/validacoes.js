const { InvalidArgumentError } = require("../erros/erros");
class validacoes {
  static autenticacaoCPF(cpf) {
    const cadastroPF = cpf.replace(/\D/, "");
    let splitCPF = cadastroPF.split("");
    if (splitCPF.length < 11) {
      throw new InvalidArgumentError("Cpf inválido!");
    } else {
      // numeros chaves para algoritmo de validação do CPF. o 10 é utilizado na primeira parte da autenticação e o 11 na segunad parte.
      let dez = 10;
      let onze = 11;
      let arrayVerifUm = [];
      let arrayVerifDois = [];
      // autenticação do primeiro digito para validar o CPF
      for (let i = 0; i < 10; i++) {
        if (dez < 2) {
          break;
        } else {
          arrayVerifUm.push(splitCPF[i] * dez--);
        }
      }
      const soma1 = arrayVerifUm.reduce((soma1, els) => soma1 + els);
      let primeiraAutenticacao = ((soma1 * 10) % 11).toString();
      // autenticação do segundo digito para validar o CPF
      for (let j = 0; j < 11; j++) {
        if (onze < 2) {
          break;
        } else {
          arrayVerifDois.push(splitCPF[j] * onze--);
        }
      }
      const soma2 = arrayVerifDois.reduce((soma2, els) => soma2 + els);
      let segundaAutenticacao = ((soma2 * 10) % 11).toString();

      primeiraAutenticacao === 10
        ? 0
        : primeiraAutenticacao === 11
        ? 0
        : primeiraAutenticacao;
      segundaAutenticacao === 10
        ? 0
        : segundaAutenticacao === 11
        ? 0
        : segundaAutenticacao;
      if (
        primeiraAutenticacao === splitCPF[9] &&
        segundaAutenticacao === splitCPF[10]
      ) {
        return cpf;
      } else {
        throw new InvalidArgumentError(
          `Os dígitos retornados são ${primeiraAutenticacao} e ${segundaAutenticacao}. o CPF é inválido!`
        );
      }
    }
  }

  static validaNome(valor, nome, minimo) {
    if (typeof valor !== "string" || valor === 0) {
      throw new InvalidArgumentError(`É necessário preencher o campo ${nome}!`);
    } else if (valor.length <= minimo) {
      throw new InvalidArgumentError(
        `O campo ${nome} precisa ser maior que ${minimo} caracteres!`
      );
    }
  }
  static validacaoDeOperacoes(contaAtualizada) {
    if (contaAtualizada.saldo <= 0) {
      throw new InvalidArgumentError("Valor inválido.");
    }
    if (contaAtualizada.saldo > 2000) {
      throw new InvalidArgumentError(
        "Valor de transação maior que o permitido. Deposite até 2000 por transação!"
      );
    }
  }
  static validacaoDeTransferencias(contaAtual, contaAtualizada) {
    if (contaAtualizada.saldo > contaAtual.saldo) {
      throw new InvalidArgumentError(
        "Valor de retirada maior do que o saldo em conta. Transação negada!"
      );
    }
  }
}

module.exports = validacoes;
