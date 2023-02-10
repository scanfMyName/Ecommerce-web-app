// filter for the list of items
const { Op } = require("sequelize");
const {Product} =  require("../models")

//filter category wise 
exports.categoryFilterMiddleware = async (req, res) => {
    const {category} = req.body;
    const products = await Product.findAll({
        where: {
            category: category
        }
    })
    res.status(200).send(products)
}
//filter price wise

exports.priceFilterMiddleware = async (req, res) => {
    console.log(req.body)
    const {minPrice, maxPrice} = req.body;
    const products = await Product.findAll({
        where: {
            price:{
                [Op.between]: [minPrice, maxPrice]
            }
        }
    })
    res.status(200).send(products)
}
// {
//     "minPrice":,
//     "maxPrice":
// }

//filter rating wise

exports.ratingFilterMiddleware = async (req, res) => {
    const {rating} = req.body;
    const products = await Product.findAll({
        where: {
            [Op.col]: 'products.rating', [Op.gte]: [rating],
        }
    })
    res.status(200).send(products)
}
