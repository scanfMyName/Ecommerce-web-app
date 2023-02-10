const {User} =  require("../models")
const { validateSignup } = require("./userValidator");
const { validateLogin } = require("./loginUserVal");
exports.createUserMiddleware = async (req, res, next) => {
    const { error, value } = validateSignup(req.body);
    if(error){
        return res.status(400).json(error['details']);
    }
    User.findOne({
        where: {
            email: req.body.email,
        }
    }).then((user) => {
        if(user){
            return res.status(400).json({message: "User already exists with this email-id. Remember, email-id is unique and case sensitive"});
        }
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
    
    User.findOne({
        where: {
            username: req.body.username,
        }
    }).then((user) => {
        if(user){
            return res.status(400).json({message: "User already exists with this username. Remember, username is unique and case sensitive"});
        }
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
    
    User.create({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        role: req.body.role,
    }).then((user) => {
        res.status(201).json(user);
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
};
  
exports.loginUserMiddleware = async (req, res, next) => {
    const { error, value } = validateLogin(req.body);
    if(error){
        return res.status(400).json(error['details']);
    }
    User.findOne({
        where: {
            email: req.body.email,
            password: req.body.password,
        }
    }).then((user) => {
        res.status(201).json(user);
    }
    ).catch((err) => {
        res.status(500).json(err);
    }
    );
}


// user/create-user
// {
//     "email":"mayankgarg@bfdsf.org",
//     "username": "dfhhgd",
//     "password":"123456",
//     "role":"admin"
// }
