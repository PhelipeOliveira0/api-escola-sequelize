const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const database = require("../models");

class TurmaController {

    static async pegaTodasAsTurmas(req, res) {

            const { data_inicial, data_final } = req.query
            const where = {}
            data_inicial || data_final ? where.data_inicio = {} : null
            data_inicial ? where.data_inicio[Op.gte] = data_inicial : null
            data_final ? where.data_inicio[Op.lte] = data_final : null
            try {
                console.log(where);
              const todasAsTurmas = await database.Turmas.findAll( {where} )
              return res.status(200).json(todasAsTurmas) 
            } catch (error) {
              return res.status(500).json(error.message)
            }
    }

    static async pegarUmaTurma(req,res){
        const id = req.params.id;
        try {
            const turma = await database.Turmas.findOne({where:{"id":id}});
            return res.status(200).json(turma);
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao buscar esta turma : ${turma}`);
        }
    }

    static async inserirTurma(req,res){
        const dados = req.body;
        try {
            await database.Turmas.create(dados);
            return res.status(200).send(`A turma foi inserida com sucesso`);
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao inserir esta turma`);
        }
    }

    static async atualizarTurma(req,res){
        const id = req.params.id;
        const dados = req.body;

        try {
            await database.Turmas.update(dados,{where:{"id":id}});
            return res.status(200).send(`A turma foi atualizada`);
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao atualizar a turma ${error}`);
        }
    }

    static async deletarTurma(req,res){
        const id = req.body;
        try {
            await database.Turmas.destroy({where:{"id":id}});
            return res.status(200).send(`A turma foi deletada`);
        } catch (error) {
            return res.status(500).send(`Ocorreu um erro ao deletar esta turma ${error}`);
        }
    }


}


module.exports = TurmaController;