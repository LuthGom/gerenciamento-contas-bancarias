const sqlite3 = require("sqlite3").verbose();
const path = require("path");
const caminhoArq = path.resolve(__dirname, "database.db");

const db = new sqlite3.Database(caminhoArq);

const CONTA_SCHEMA = `
CREATE TABLE IF NOT EXISTS "contas" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "cpf" VARCHAR(64) NOT NULL,
    "nome" VARCHAR(64) NOT NULL,
    "saldo" DECIMAL(6,2),
    "created_at" DATETIME NOT NULL
)`;

const REGISTRO_DE_TRANSFERENCIAS_SCHEMA = `
  CREATE TABLE IF NOT EXISTS "registros_de_transferencias" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    "cpfTransferidor" VARCHAR(64) NOT NULL,
    "saldoTransferido" VARCHAR(64) NOT NULL,
    "cpfRecebedor" VARCHAR(64) NOT NULL,
    "created_at" VARCHAR(64) NOT NULL
  )
`
const REGISTRO_DE_DEPOSITOS = `
CREATE TABLE IF NOT EXISTS "registros_de_depositos" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "cpf" VARCHAR(64) NOT NULL,
  "saldoDepositado" VARCHAR(64) NOT NULL,
  "created_at" VARCHAR(64) NOT NULL
)
`
function criaTabelas() {
  db.run(CONTA_SCHEMA, (erro) => {
    if (erro) console.log("Erro ao Criar tabela de contas:", erro);
  });
  db.run(REGISTRO_DE_TRANSFERENCIAS_SCHEMA, (erro) => {
    if (erro) console.log("Erro ao Criar tabela de registro de transferencias:", erro);
  });
  db.run(REGISTRO_DE_DEPOSITOS, (erro) => {
    if (erro) console.log("Erro ao Criar tabela de registro de depositos:", erro);
  });
}

db.serialize(() => {
  criaTabelas();
});

module.exports = db;
