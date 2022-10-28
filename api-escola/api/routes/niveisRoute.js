const { Router } = require('express')
const NivelController = require('../controllers/NivelController')

const router = Router()
router.get('/niveis', NivelController.pegaTodosOsNiveis);
router.get('/niveis:id',NivelController.buscarNivel);
router.post("/niveis",NivelController.postarNivel);
router.put("/niveis/:id",NivelController.atualizarNivel);
router.delete("/nivel/:id",NivelController.deletarNivel);

module.exports = router