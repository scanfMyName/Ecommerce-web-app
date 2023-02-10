const express = require('express');
const mysql = require('mysql2');
const bodyParser = require(`body-parser`);
const cors = require("cors");

const userRoutes = require("./User/userRoutes");
const productRoutes = require("./Product/productRoutes");
const cartRoutes = require("./Cart/cartRoutes");
const filterRoutes =  require("./Filter/filterRoutes")
const db = require('./models');


const app = express();
db.sequelize.sync({ force: false }).then((req) => {
    app.listen(5000, () => {
        console.log('Ecommerce app listening on port 5000!')
    });
    
});
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use('/cart', cartRoutes);
app.use('/filter', filterRoutes)

app.use((req, res, next) => {
  res.status(404).send("Error 404!");
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
