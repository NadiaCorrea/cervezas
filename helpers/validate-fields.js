const { validationResult } = require("express-validator");
const { getUsers } = require("../controllers/users");

const validateFields = function(req, res, next){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next(); // hay que ponerlo para que pase al siguiente en caso que no falle
}

module.exports = {validateFields}