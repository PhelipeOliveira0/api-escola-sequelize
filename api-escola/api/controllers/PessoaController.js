const database = require("../models");
const Sequelize = require("sequelize");

class PessoaController{

    static async buscaTodosUsuarios(req,res){
        try {
            const pessoas = await database.Pessoas.scope('todos').findAll();
            return res.status(200).json(pessoas);
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao buscar ${error}`);
        }
    }


    static async buscaUsuariosAtivos(req,res){
        try {
            const pessoas = await database.Pessoas.findAll();
            return res.status(200).json(pessoas);
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao buscar ${error}`);
        }  
    }


    static async buscarUsuario(req,res){
        const id = req.params.id;
        try {
            const pessoa = await database.Pessoas.findOne({where:{"id":id}});
            return res.status(200).json(pessoa);
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao buscar este usuario ${error}`);
        }
    }


    static async inserirUsuario(req,res){
        const dados = req.body;
        try {
            await database.Pessoas.create(dados);
            return res.status(201).send(`O usuario ${dados.nome} foi inserido com sucesso`);
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao inserir este usuario ${error}`);
        }
    }


    static async atualizarUsuario(req,res){
        const dados = req.body;
        const id = req.params.id;
        try {
            await database.Pessoas.update(dados,{where:{"id":id}});
            return res.status(200).send("usuario atualizado com sucesso");
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao atualizar este usuario: ${error}`);
        }
    }


    static async deletarUsuario(req,res){
        const id = req.params.id;
        try {
            await database.Pessoas.destroy({where:{"id":id}});
            return res.status(200).send(`Usuario deletado com sucesso`);    
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao deletar o usuario ${error}`);
        }
    }


    static async restauraPessoa(req,res){
        const id = req.params.id;
        try {
            await database.Pessoas.restore({where:{"id":id}});
            return res.status(200).send(`O usuario foi restaurado`);
        } catch (error) {
            return res.status(500).send(`Erro ao restaurar o usuario: ${error}`);
        }
    }


    static async pegaUmaMatricula(req,res){
        const idP = req.params.idP;
        const idM = req.params.idM;
        try {
            const matricula = await database.Matriculas.findOne({where:{"id":idM,"estudante_id":idP}});
            return res.status(200).json(matricula);
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao buscar esta matricula ${error}`);
        }
    }

    static async pegaMatriculasAtivas(req,res){
        const id = req.params.id;
        try {   
            const pessoas = await database.Pessoas.findOne({where:{"id":id}});
            const matriculas = await pessoas.getAulasMatriculadas();
            return res.status(200).json(matriculas);   
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao buscar as matriculas ${error}`)
        }
    }


    static async pegaMatriculas(req,res){
        const id = req.params.id;
        try {
            const matriculas = await database.Matriculas.findAll({where:{"estudante_id":id}});
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao buscar as matriculas ${error}`);
        }
    }


    static async matriculasPorTurma(req,res){
        const id = req.params.id;
        try {
            const matriculas = await database.Matriculas.findAndCountAll({where:{"turma_id":id,status:"confirmado"},limit:20});
            return res.status(200).json(matriculas.count);
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao buscar as matriculas ${error}`);
        }
    }


    static async criarMatricula(req,res){
        const id = req.params.id;
        const dados = {...req.body, estudante_id: id};
        try {
            const matricula = await database.Matriculas.create(dados);
            return res.status(200).json(matricula);
        } catch (error) {
            return res.status(500).send(`erro ao criar a matricula ${error}`)
        }
    }


    static async atualizarMatricula(req,res){
        const idP = req.params.idP;
        const idM = req.params.idM;
        const dados = req.body;

        try {
            await database.Matriculas.update(dados,{where:{"id":idM, "estudante_id":idP}});
            return res.status(200).send(`A matricula foi atualizada`);
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao atualizar a matricula ${error}`);
        }
    }

    
    static async apagarMatricula(req,res){
        const idP = req.params.idP;
        const idM = req.params.idM;

        try {
            await database.Matriculas.destroy({where:{"id":idM, "estudante_id": idM}});
            return res.status(200).send(`A matricula foi apagada`);
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao deletar a matricula ${error}`);
        }
    }


    static async pegaTurmasLotadas(req,res){
        const lotacao = 2;

        try {
            const matriculas = await database.Matriculas.findAndCountAll({
            attributes:["turma_id"],group:["turma_id"],having: Sequelize.literal(`count(turma_id) >= ${lotacao}`)});
            return res.status(200).json(matriculas);
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao deletar a matricula ${error}`);
        }
    }



    static async cancelarPessoa(req, res){
        const id = req.params.id;

        try {
            database.sequelize.transaction(async trasacao =>{
                await database.Pessoas.update({"ativo":false},{where:{"id":id}},{transaction:trasacao});
                await database.Matriculas.update({"status":"cancelado"},{where:{"estudante_id":id}},{transaction:trasacao});
                return res.status(200).send(`A pessoa foi dasativada com sucesso`);  
            })
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao desativar esta pessoa`);
        }
    }
}

module.exports = PessoaController;