const {Sequelize,DataTypes}=require('sequelize')
const db=new Sequelize("mysql","root", "Sajj@d007",{
    host:"localhost",
    dialect:"mysql",
    pool:
    {
        max:5,
        min:0,
        idle:10000
    }
})

module.exports = db
