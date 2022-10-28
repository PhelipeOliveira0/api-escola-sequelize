const database = require("../models");

class NivelController {

    static async pegaTodosOsNiveis(req, res) {
      try {
        const todosOsNiveis = await database.Niveis.findAll()
        return res.status(200).json(todosOsNiveis)
      } catch (error) {
        return res.status(500).json(error.message);
      }
    }

    static async buscarNivel(req,res){
      const id = req.params.id;
      try {
        const nivel = await database.Nivels.findOne({where:{"id":id}});
        return res.status(200).json(nivel);
      } catch (error) {
        return res.status(500).send(`Ocorreu um erro ao buscar este nivel ${error}`);
      }
    }

    static async postarNivel(req,res){
      const id = raq.params.id;
      const dados = req.body;

      try {
        await database.Niveis.create(dados);
        return res.status(200).send(`nivel inserido com sucesso`);
      } catch (error) {
        return res.status(500).send(`Ocorreu um erro ao inserir este nivel ${error}`);
      }
    }

    static async atualizarNivel(req,res){
      const id = req.params.id;
      const dados = req.body;
      try {
        await database.Niveis.update({where:{"id":id}});
        return res.status(200).send(`O nivel foi atualizado com sucesso`); 
      } catch (error) {
        return res.status(500).send(`Ocorreu um erro ao atualizar o nivel ${error}`);
      }
    } 

    static async deletarNivel(req,res){
      const id = req.params.id;
      try {
        await database.Niveis.destroy({where:{"id":id}});
        return res.status(200).send(`O nivel foi deletado`);
      } catch (error) {
        return res.status(500).send(`Ocorreu um erro ao deletar o nivel ${error}`);
      }
    }
}


module.exports = NivelController;