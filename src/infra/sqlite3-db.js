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

function criaTabelaDeContas() {
  db.run(CONTA_SCHEMA, (erro) => {
    if (erro) console.log("Erro ao Criar tabela de clientes:", erro);
  });
}

db.serialize(() => {
  criaTabelaDeContas();
});

module.exports = db;
