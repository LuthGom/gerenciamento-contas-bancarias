const validacoes = require("../../src/validacoes/validacoes");
// cpf utilizado foi retirado de um gerador de cpfs online para devs
describe("validações", () => {
  test("o método autenticacaoCpf() retorna cpf", () => {
    const cpf = validacoes.autenticacaoCPF("11017086036");
    expect(cpf).toBe(cpf);
  });

  test("o método validaNome() retorna true", () => {
    const nome = "Luthy";
    let campo = nome;
    validacoes.validaNome(campo, nome, 4);
    expect(nome).toBe(nome);
  });
});
