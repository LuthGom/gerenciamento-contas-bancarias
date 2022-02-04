jest.mock("../../src/controllers/__mock__/conta");

const Conta = require("../../src/model/Conta");

describe("classe Conta", () => {
  test("o método criaConta() foi executado com sucesso", async () => {
    const conta = new Conta({
      cpf: "11017086036",
      nome: "João do Teste",
    })
    await conta.criaConta();
    expect(conta.id).toBe(500);
    expect(conta.cpf).toBe("11017086036");
    expect(conta.nome).toBe("João do Teste");
    expect(conta.created_at).toBe('2022/02/03 02:50:02')
  });
});
