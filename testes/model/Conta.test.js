const request = require("supertest");
const server = require("../../server");

describe("Fazendo um depósito", () => {
  test("deveria realizar um depósito", async () => {
    const deposito = {
      saldo: 10,
    };
    return request(server)
      .post("/registrosDeDepositos/deposito/724.592.310-83")
      .send(deposito)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.saldo).toEqual(deposito.saldoDepositado);
      });
  });
  test("deveria realizar uma transferencia", async () => {
    const transferencia = {
      cpf: "15175643797",
      saldo: 1,
    };
    return request(server)
      .post("/registrosDeTransferencias/transferencia/724.592.310-83")
      .send(transferencia)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.body.saldo).toEqual(
          transferencia.saldoTransferido
        );
        expect(res.body.cpf).toEqual(transferencia.cpfRecebedor);
      });
  });
});
