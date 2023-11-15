const  {DataTypes}  = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Products",{
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey: true,
       
      },
      name:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      brand:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      gender:{
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sale:{
        type: DataTypes.INTEGER,
        allowNull: true
      },
      category:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      img:{
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      size: {
        type: DataTypes.JSONB,
        allowNull: false
      },
       quantity: {
         type: DataTypes.INTEGER,
        allowNull: false,
       },
    },
    {timestamps: false},
    {paranoid: true}
  );
};