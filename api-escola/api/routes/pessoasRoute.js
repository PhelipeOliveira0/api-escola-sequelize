const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController.js");

const router = Router();

router.get("/pessoas/todos",PessoaController.buscaTodosUsuarios);
router.get("/pessoas/matricula/lotado",PessoaController.pegaTurmasLotadas);
router.get("/pessoas",PessoaController.buscaUsuariosAtivos);
router.get("/pessoas/:id",PessoaController.buscarUsuario);
router.post("/pessoas/:id",PessoaController.restauraPessoa);
router.post("/pessoas",PessoaController.inserirUsuario);
router.post("/pessoas/:id/desativar",PessoaController.cancelarPessoa);
router.put("/pessoas/:id",PessoaController.atualizarUsuario);
router.delete("/pessoas/:id",PessoaController.deletarUsuario);


router.get("/turmas/:id/quantidade/",PessoaController.matriculasPorTurma)
router.get("/pessoas/:id/matricula/ativo",PessoaController.pegaMatriculasAtivas);
router.get("/pessoas/:idP/matricula/:idM",PessoaController.pegaUmaMatricula);

router.get("/pessoas/:id/matricula",PessoaController.pegaMatriculas);

router.post("/pessoas/:id/matricula",PessoaController.criarMatricula);
router.put("/pessoas/:idP/matricula/:idM",PessoaController.atualizarMatricula);
router.delete("/pessoas/:idP/matricula/:idM",PessoaController.apagarMatricula);

module.exports = router;