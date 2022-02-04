const validacoes = require("../../src/validacoes/validacoes");

describe("validações", () => {
  test("o método autenticacaoCpf() retorna cpf", () => {
    const cpf = validacoes.autenticacaoCPF("11017086036");
    expect(cpf).toBe(cpf);
  });

  test("o método validaNome() retorna true", () => {
    const nome = "Luthy";
    let campo = nome;
    const validaONome = validacoes.validaNome(campo, nome, 4);
    expect(nome).toBe(nome);
  });
});
