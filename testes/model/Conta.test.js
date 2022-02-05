const request = require("supertest");
const server = require("../../server");
const contaDao = require("../../src/contaDao/contaDao");
describe("EndPoints Get geral tests", () => {
  test("validação da rota Get /contas", async () => {
    const res = await request(server).get("/contas");
    expect(res.statusCode).toBe(200);
  });
  test("validação da rota Get /registrosDeTransferencias", async () => {
    const res = await request(server).get("/registrosDeTransferencias");
    expect(res.statusCode).toBe(200);
  });
  test("validação da rota Get /registrosDeDepositos", async () => {
    const res = await request(server).get("/registrosDeDepositos");
    expect(res.statusCode).toBe(200);
  });
});

describe("Endpoints Delete tests", () => {
  test("validação da rota delete de contas", async () => {
    const res = await request(server).delete("/contas/deletarConta/:cpf");
    expect(res.statusCode).toBe(200);
  });
});
