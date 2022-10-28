const { Router } = require('express')
const TurmaController = require('../controllers/TurmaController');
const { route } = require('./niveisRoute');

const router = Router()
router.get('/turmas', TurmaController.pegaTodasAsTurmas);
router.get("/turmas/:id",TurmaController.pegarUmaTurma);

router.post("/turmas",TurmaController.inserirTurma);
router.put("/turmas/:id",TurmaController.atualizarTurma);
router.delete("/turmas/:id",TurmaController.deletarTurma);

module.exports = router