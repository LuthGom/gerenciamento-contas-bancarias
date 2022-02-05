const db = require("../infra/sqlite3-db");

class RegistroDao {
  static geraRegistroTransferencia(transferencia) {
    return new Promise((resolve, reject) => {
      db.run(
        `
                    INSERT INTO registros_de_transferencias (
                        cpfTransferidor, 
                        saldoTransferido,
                        cpfRecebedor,
                        created_at
                    ) VALUES (?,?,?,DATETIME())
                    `,
        [...Object.values(transferencia)],
        (erro) => {
          if (erro) {
            reject("Erro ao gerar registro! ", { erro: erro.message });
          }
          return resolve();
        }
      );
    });
  }
  static listaTodosOsRegistros() {
    return new Promise((resolve, reject) => {
      db.all(
        `
      SELECT * FROM registros_de_transferencias;
      `,
        (erro, registros) => {
          if (erro) {
            return reject("Erro ao listar contas!", { erro: erro.message });
          }
          return resolve(registros);
        }
      );
    });
  }
  static buscaPorCpf(cpf) {
    return new Promise((resolve, reject) => {
      db.get(
        `
      SELECT * FROM registros_de_transferencias WHERE cpf = ?`,
        [cpf],
        (erro, registro) => {
          if (erro) {
            return reject(
              `Não foi possível encontrar a conta do cliente de CPF: ${cpf}!`,
              {erro: erro.message}
            );
          }
          return resolve(registro);
        }
      );
    });
  }
  static geraRegistroDeposito(deposito) {
    return new Promise((resolve, reject) => {
      db.run(
        `
                    INSERT INTO registros_de_depositos (
                        cpf, 
                        saldoDepositado,
                        created_at
                    ) VALUES (?,?,DATETIME())
                    `,
        [...Object.values(deposito)],
        (erro) => {
          if (erro) {
            reject("Erro ao gerar registro! ", { erro: erro.message });
          }
          return resolve();
        }
      );
    });
  }
  static listaTodosOsDepositos() {
    return new Promise((resolve, reject) => {
      db.all(
        `
      SELECT * FROM registros_de_depositos;
      `,
        (erro, registros) => {
          if (erro) {
            return reject("Erro ao listar registros!", { erro: erro.message });
          }
          return resolve(registros);
        }
      );
    });
  }
}

module.exports = RegistroDao;
