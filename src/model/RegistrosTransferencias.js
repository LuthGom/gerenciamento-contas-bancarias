const registroDao = require("../contaDao/registroDao");
class RegistroDeTransferencias {
  constructor(transferencia) {
    this.cpfTransferidor = transferencia.cpfTransferidor;
    this.saldoTransferido = transferencia.saldoTransferido;
    this.cpfRecebedor = transferencia.cpfRecebedor;
    this.created_at = transferencia.created_at;
  }
 
  async geraRegistroTransferencia() {
     
    return registroDao.geraRegistroTransferencia(this);
  }
   static async buscaPorCpf(cpf) {
    const cliente = await registroDao.buscaPorCpf(cpf);
    if (!cliente) {
      return null;
    }
    return new Conta(cliente);
  }
  static listaTodosOsRegistros(){
    return registroDao.listaTodosOsRegistros();
  }
 
}

module.exports = RegistroDeTransferencias;
