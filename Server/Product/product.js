const {Product} =  require("../models")
const {User} =  require("../models")
const { validateCreation } = require("./productValidator");
exports.createProductMiddleware = async (req, res, next) => {
    const { error, value } = validateCreation(req.body);
    if(error){
        return res.status(400).json(error['details']);
    }
    console.log(req.body.postedBy)
    User.findOne({
        where: {
            username: req.body.postedBy,
        }
    }).then((user) => {
        if(user){
            Product.create({
                title: req.body.title,
                description: req.body.description,
                price: req.body.price,
                category: req.body.category,
                postedBy: req.body.postedBy,
                size: req.body.size,
                colour: req.body.colour,
                stock: req.body.stock,
                image: req.body.image,
                rating:0,
                reviews:0,
            }).then((product) => {
               
              res.status(201).json(product);
                
            }
            ).catch((err) => {
                res.status(500).json(err);
            });
        }
        else{
            return res.status(400).json({message: "There is no user existed with the provided username"});
        }
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
        
    }
  
exports.getAllProducts = async (req, res, next) => {
    Product.findAll({
        attributes: ['id', 'title', 'price', 'category', 'image', 'rating'],
    }).then((products) => {
        res.status(200).json(products);
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
    
}


exports.getProductDetails = async (req, res, next) => {
    console.log(req.params.id)
    Product.findOne({
        where: {
            id: req.params.id,
        },
    }).then((product) => {
        if(!product){
            return res.status(400).json({message: "There is no product existed with this id"});
        }
        res.status(200).json(product);
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
    
}
//  product/create-product
// {
//     "title":"Hello",
//     "description":"Yes it is okk",
//     "price":34.56,
//     "category":"test",
//     "postedBy":"dhhgd",
//     "size":["S", "M", "L"],
//     "colour":["chak white blue", "Black"],
//     "stock":1,
//     "image":["dfdsd", "ddsdc", "cscc"]
// }