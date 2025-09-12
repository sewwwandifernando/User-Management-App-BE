module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      aboutYou: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      mobileNumber: { 
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(20),
        allowNull: false, 
      },
      country: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },     

    }); 
  return Users;
};