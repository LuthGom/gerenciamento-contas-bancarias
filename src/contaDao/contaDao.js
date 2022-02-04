const db = require("../infra/sqlite3-db");
const { InternalServerError } = require("../erros/erros");

module.exports = {
  criaConta: (contaBancaria) => {
    return new Promise((resolve, reject) => {
      db.run(
        `
                INSERT INTO contas (
                    cpf, 
                    nome,
                    saldo,
                    created_at
                ) VALUES (?,?,?,?)
                `,
        [
          contaBancaria.cpf,
          contaBancaria.nome,
          contaBancaria.saldo,
          contaBancaria.created_at,
        ],
        (erro) => {
          if (erro) {
            reject("Erro ao add cliente!: ", erro.message);
            console.log(erro);
          }
          return resolve();
        }
      );
    });
  },
  listaTodasAsContas:() =>{
    return new Promise((resolve, reject) =>{
      db.all(
        `
      SELECT * FROM contas;
      `, (erro, contas) =>{
        if(erro) {
          return reject('Erro ao listar contas!', {err: erro.message})
        }
        return resolve(contas)
      })
    })
  },
  buscaPorCpf: (cpf) => {
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
  },
  depositoNaConta: (deposito, cpf) =>{
    return new Promise((resolve, reject) =>{
      db.run(
        `
        UPDATE contas SET cpf = ?, nome =?, saldo = ?, created_at = ? 
        `,
        [deposito],
        (erro, conta) =>{
          if(erro) {
            console.log(erro);
            return reject ('Não foi possível realizar o depósito na conta',{erro: erro.message})
          }
          return resolve(conta)
        }
      )
    })
  }
};
