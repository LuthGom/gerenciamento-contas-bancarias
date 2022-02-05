const {Router} = require('express');
const router = Router();

const contaController = require('../controllers/conta');

module.exports = 
router
.post("/contas/abrirConta", contaController.criaConta)
.get("/contas", contaController.listaTodasAsContas)
.delete("/contas/deletarConta/:cpf", contaController.deletaConta)
