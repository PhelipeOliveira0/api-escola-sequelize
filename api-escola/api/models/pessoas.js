'use strict';
module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', {
    nome: {type:DataTypes.STRING, validate: {funcaoValidadore:function(dado){
      if(dado.length < 3){
        throw new Error('nome muito curto');
      }
    }}},
    ativo: DataTypes.BOOLEAN,
    email: {type: DataTypes.STRING, validate: {isEmail: {args:true,msg:`Dados invalidos em e-mail`}}},
    role: DataTypes.STRING
  }, {paranoid:true,
      defaultScope:{where:{ativo:true}},
    scopes:{
      todos:{where:{}}  
    }});
  Pessoas.associate = function(models) {
    Pessoas.hasMany(models.Matriculas,{foreignKey:"estudante_id",scope:{status:"confirmado"},as:"aulasMatriculadas"});
    Pessoas.hasMany(models.Turmas,{foreignKey:"docente_id"});
  };
  return Pessoas;
};