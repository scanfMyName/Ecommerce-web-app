const { User } = require("../models");
const { Product } = require("../models");
const { Cart } = require("../models");
const { validateCartItem } = require("./cartValidator");

// const {createCartItemMiddleware,updateCartItemMiddleware, deleteCartItemMiddleware} =  require('./cart')

exports.createCartItemMiddleware = async (req, res, next) => {
  console.log("Creating cart item middleware starting point:", req.body)
  const { error, value } = validateCartItem(req.body);
  if (error) {
    return res.status(400).json(error["details"]);
  }
  // this willbe a post request so most of the details will be in body
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (user == null) {
        return res
          .status(400)
          .json({ message: "User does not exist with this id." });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });

  Product.findOne({
    where: {
      id: req.body.productId,
    },
  })
    .then((product) => {
      if (product == null) {
        return res
          .status(400)
          .json({ message: "Product does not exist with this id." });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  Cart.findOne({
    where: {
      username: req.body.username,
      productId: req.body.productId,
      prodDetailssize: req.body.size,
      prodDetailscolour: req.body.color,
    },
  })
    .then((cartItem) => {
      if (cartItem) {
        return res
          .status(400)
          .json({
            message:
              "Cart item with this specific properties already exists in the provide user's cart.",
          });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });

  Cart.create({
    username: req.body.username,
    productId: req.body.productId,
    prodDetailsquantity: req.body.quantity,
    prodDetailssize: req.body.size,
    prodDetailscolour: req.body.color,
    cartPrice: req.body.price,
  })
    .then((cartitem) => {
      // {
      //     "productId":"1",
      //     "username":"dfhhgd",
      //     "quantity":34,
      //     "size":"S",
      //     "colour":"chak white blue",
      //     "price":35.67
      // }
      res.status(201).json(cartitem);
    })
    .catch((err) => {
      console.log("error", err);
      res.status(500).json(err);
    });
};

exports.updateCartItemMiddleware = async (req, res, next) => {
  const { error, value } = validateCartItem(req.body);
  if (error) {
    return res.status(400).json(error["details"]);
  }

  Cart.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((cartItem) => {
      if (cartItem == null) {
        return res
          .status(400)
          .json({ message: "Cart item does not exist with this id." });
      }
      cartItem
        .update({
            username: req.body.username,
            productId: req.body.productId,
            prodDetailsquantity: req.body.quantity,
            prodDetailssize: req.body.size,
            prodDetailscolour: req.body.color,
            cartPrice: req.body.price,
        })
        .then((cartItem) => {
          res.status(201).json(cartItem);
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.deleteCartItemMiddleware = async (req, res, next) => {
    console.log("deleteCartItemMiddleware Starting point id of the cart:", req.params.id)
  Cart.findOne({
    where: {
      id: req.params.id,
      isPurchase: false,
    },
  })
    .then((cartItem) => {
      if (cartItem == null) {
        
        return res
          .status(400)
          .json({ message: "Cart item does not exist with this id." });
      }
      cartItem
        .destroy()
        .then((cartItem) => {
          res.status(201).json(cartItem);
        })
        .catch((err) => {
            console.log("error1:",err)
          res.status(500).json(err);
        });
    })
    .catch((err) => {
        console.log("error2:",err)
      res.status(500).json(err);
    });
};

exports.purchaseCartItem = async (req, res, next) => {
  Cart.findAll({
    where: {
      username: req.params.username,
    },
  })
    .then((cartItems) => {
      if (cartItems == null) {
        return res.status(400).json({ message: "Empty cart ;)." });
      }
      cartItems.forEach((cartItem) => {
        cartItem["isPurchase"] = true;
        Product.findOne({
          where: {
            id: cartItem["productId"],
          },
        }).then((product) => {
            if (product == null) {
              return res
                .status(400)
                .json({ message: "Product does not exist with this id." });
            }
            product["stock"] -= cartItem["prodDetailsquantity"];
            
            product
              .save()
              .then((product) => {
                cartItem
                  .save()
                  .then((cartItem) => {
                    res.status(201).json(cartItem);
                  })
                  .catch((err) => {
                    res.status(500).json(err);
                  });
              })
              .catch((err) => {
                res.status(500).json(err);
              });
          })
      });
      res.status(201).json(cartItems);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getUserCartMiddleware = async (req, res, next) => {
  Cart.findAll({
    where: {
      username: req.params.username,
      isPurchase: false,
    },
  })
    .then((cartItems) => {
      if (cartItems == null) {
        return res.status(400).json({ message: "Empty cart ;)." });
      }
      res.status(201).json(cartItems);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
// user/create-user
// {
//     "username":"mayankgarg@bfdsf.org",
//     "productId": "dfhhgd",
//     "password":"123456",
//     "role":"admin"
// }
