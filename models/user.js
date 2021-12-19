const db=require('../connection/db')
const Sequelize=require('sequelize')
const User=db.define("test",{
    id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type:Sequelize.INTEGER
      },
    Name:{
        type:Sequelize.STRING},
    Email:{
        type:Sequelize.STRING},
    password:{
        type:Sequelize.STRING},
    createdAt: {
        type: Sequelize.DATE,
        default: Date.now()
    },
    updatedAt: {
        type: Sequelize.DATE,
        default: Date.now()
    },
})

module.exports =User