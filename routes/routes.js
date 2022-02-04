const {Router} = require('express');
const router = Router();

const contasController = require('../src/controllers/conta');

module.exports = 
router
.post("/contas", contasController.criaConta)
.get("/contas", contasController.listaTodasAsContas)
.patch("contas/:cpf", contasController.depositoNaConta)
