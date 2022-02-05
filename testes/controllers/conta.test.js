jest.mock("../../src/controllers/__mock__/conta");

const Conta = require("../../src/model/Conta");

describe("classe Conta", () => {
  test("o método criaConta() foi executado com sucesso", async () => {
    const conta = new Conta({
      cpf: "659.559.420-09",
      nome: "João do Teste",
    })
    await conta.criaConta();
    expect(conta.id).toBe(500);
    expect(conta.cpf).toBe("659.559.420-09");
    expect(conta.nome).toBe("João do Teste");
    expect(conta.created_at).toBe('2022/02/03 02:50:02')
  });
});
