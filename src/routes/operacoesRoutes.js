const {Router} = require('express');
const router = Router();
const operacoesController = require('../controllers/operacoes')

module.exports = 
router
.post("/registrosDeTransferencias/transferencia/:cpfTransferidor", operacoesController.transferencia )
.post("/registrosDeDepositos/deposito/:cpf", operacoesController.depositoNaConta)
.get("/registrosDeTransferencias", operacoesController.listaTodosOsRegistros)
.get("/registrosDeDepositos", operacoesController.listaTodosOsDepositos)