module.exports=  (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "Product",
        {
            title: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            price: {
                type: DataTypes.DECIMAL,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            category: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            postedBy: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
            size: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
                get() {
                    return this.getDataValue('size').split(',');
                },
                set(val) {
                    this.setDataValue('size', val.join(','));
                }
            },
            colour: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
                get() {
                    return this.getDataValue('colour').split(',');
                },
                set(val) {
                    this.setDataValue('colour', val.join(','));
                },
            },
            image: {
                type: DataTypes.STRING,  // This is a string that contains the path to the github image for the product
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
                get() {
                    return this.getDataValue('image').split(',');
                },
                set(val) {
                    this.setDataValue('image', val.join(','));
                },
            },

            stock: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            reviews: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            tableName: "products",
            timestamps: true,
            paranoid: true,
        }
    );
    Product.associate = function (models) {
        // associations can be defined here
    };
    return Product;
}