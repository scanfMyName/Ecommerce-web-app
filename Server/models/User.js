module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true,
        },
                
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        },
      },
    },
    {
      tableName: "users",
      timestamps: true,
      paranoid: true,
    }
  );
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
