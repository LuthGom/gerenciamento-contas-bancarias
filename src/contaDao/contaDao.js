const db = require("../infra/sqlite3-db");
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
                ) VALUES (?,?,0,DATETIME())
                `,
        [...Object.values(contaBancaria)],
        (erro) => {
          if (erro) {
            reject("Erro ao criar conta! ", {erro: erro.message});
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
            return reject("Erro ao listar contas!", { erro: erro.message });
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
              `Não foi possível encontrar a conta do cliente de CPF: ${cpf}!`,
              {erro: erro.message}
            );
          }
          return resolve(conta);
        }
      );
    });
  }
  static depositoNaConta(contaAtualizada, cpf) {
    return new Promise((resolve, reject) => {
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
            reject("Erro ao atualizar conta ", {erro: erro.message});
          }
          return resolve();
        }
      );
    });
  }
  static deletaConta(cpf) {
    return new Promise((resolve, reject) => {
      db.run(`
      DELETE FROM contas WHERE cpf = ?
      `, [cpf], 
      (erro) =>{
        if(erro) {
          reject(`Erro ao deletar cliente de cpf ${cpf}`, {erro: erro.message})
        }
        return resolve();
      });
    });
  }
  
}
module.exports = contaDao;
