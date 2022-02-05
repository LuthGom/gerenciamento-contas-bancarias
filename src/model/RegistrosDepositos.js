const registroDao = require("../contaDao/registroDao");

class RegistrosDeDepositos {
  constructor(deposito) {
    this.cpf = deposito.cpf;
    this.saldoDepositado = deposito.saldoDepositado;
    this.created_at = deposito.created_at;
  }
  async geraRegistroDeposito() {
     
    await registroDao.geraRegistroDeposito(this);
  }
  static listaTodosOsDepositos() {
    return registroDao.listaTodosOsDepositos();
  }
}

module.exports = RegistrosDeDepositos;