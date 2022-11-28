const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const { validateFields} = require('../helpers/validate-fields');
const { isValidRol, existEmail, existUser } = require('../helpers/db-validators');

const {getUsers, getUser, addUser, deleteUser, editUser} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:id', getUser);

router.post('/', [
    //check es un método
    check('email','Email is invalid').isEmail(),
    check('email').custom(existEmail),
    check('contrasena', 'La contraseña debe tener entre 6 y 12 letras').isLength({min:6, max:12}),
    check('nombre', 'Name is mandatory').not().isEmpty(),
    check('rol').custom(isValidRol),
    validateFields //importo el validador
],
addUser);

router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(), //si no es id de mongo válido
    check('id').custom(existUser), 
    validateFields
],deleteUser);

//nombre, apellidos, nick, rol
router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(), 
    check('id').custom(existUser),
    check('contrasena', 'La contraseña debe tener entre 6 y 12 letras').isLength({min:6, max:12}),
    check('nombre', 'Name is mandatory').not().isEmpty(),
    check('rol').custom(isValidRol),
    validateFields
]
, editUser);

module.exports = router;