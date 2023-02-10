module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    "Cart",
    {
      productId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
        },
      },
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      prodDetailssize: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      prodDetailscolour: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: true,
        },
      },
      prodDetailsquantity: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true,
        },
      },
      cartPrice: {
        type: DataTypes.DECIMAL,
        validate: {
            notEmpty: true,
        },
      },
      isPurchase: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      tableName: "cartitems",
      timestamps: true,
      paranoid: true,
    }
  );
  Cart.associate = function (models) {
    // associations can be defined here
  };
  return Cart;
};
