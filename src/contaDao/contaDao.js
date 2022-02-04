const db = require("../infra/sqlite3-db");
const { InternalServerError } = require("../erros/erros");
class contaDao {
  static criaConta(contaBancaria) {
    return new Promise((resolve, reject) => {
      db.run(
        `
                INSERT INTO contas (
                    cpf, 
                    nome,
                    saldo,
                    created_at
                ) VALUES (?,?,?,DATETIME())
                `,
        [
          contaBancaria.cpf,
          contaBancaria.nome,
          contaBancaria.saldo,
          contaBancaria.created_at,
        ],
        (erro) => {
          if (erro) {
            reject("Erro ao add cliente! ", erro.message);
            console.log(erro);
          }
          return resolve();
        }
      );
    });
  }
  static listaTodasAsContas() {
    return new Promise((resolve, reject) => {
      db.all(
        `
      SELECT * FROM contas;
      `,
        (erro, contas) => {
          if (erro) {
            return reject("Erro ao listar contas!", { err: erro.message });
          }
          return resolve(contas);
        }
      );
    });
  }
  static buscaPorCpf(cpf) {
    return new Promise((resolve, reject) => {
      db.get(
        `
      SELECT * FROM contas WHERE cpf = ?`,
        [cpf],
        (erro, conta) => {
          if (erro) {
            return reject(
              `Não foi possível encontrar a conta do cliente de CPF ${cpf}!`
            );
          }
          return resolve(conta);
        }
      );
    });
  }
  static depositoNaConta(contaAtualizada, cpf) {
    return new Promise((resolve, reject) => {
      console.log(contaAtualizada);
      db.run(
        `
                UPDATE contas SET
                    cpf = ?, 
                    nome = ?,
                    saldo = ?,
                    created_at = ?
                    WHERE cpf = ?
            
                `,
        [...Object.values(contaAtualizada), cpf],
        (erro) => {
          if (erro) {
            reject("Erro ao atualizar conta ", erro.message);
            console.log(erro);
          }
          return resolve();
        }
      );
    });
  }
}
module.exports = contaDao;
