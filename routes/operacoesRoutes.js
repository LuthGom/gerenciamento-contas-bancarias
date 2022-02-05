const {Router} = require('express');
const router = Router();
const operacoesController = require('../src/controllers/operacoes')

module.exports = 
router
.post("/registrosDeTransferencias/transferencia/:cpf", operacoesController.transferencia )
.post("/registrosDeDepositos/deposito/:cpf", operacoesController.depositoNaConta)
.get("/registrosDeTransferencias", operacoesController.listaTodosOsRegistros)
.get("/registrosDeDepositos", operacoesController.listaTodosOsDepositos)