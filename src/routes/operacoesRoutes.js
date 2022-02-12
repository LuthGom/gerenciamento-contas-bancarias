const {Router} = require('express');
const router = Router();
const operacoesController = require('../controllers/operacoes')

module.exports = 
router
.patch("/operacoes/transferencia/:cpfTransferidor", operacoesController.transferencia )
.patch("/operacoes/deposito/:cpf", operacoesController.depositoNaConta)
.get("/registrosDeTransferencias", operacoesController.listaTodosOsRegistros)
.get("/registrosDeDepositos", operacoesController.listaTodosOsDepositos)