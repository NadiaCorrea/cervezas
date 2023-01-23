const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const { validateFields} = require('../helpers/validate-fields');
const { existEmail} = require('../helpers/db-validators');

const {addLogin} = require('../controllers/login')

router.post('/', [
    check('email','Email is invalid').isEmail(),
    check('email').custom(existEmail),
    check('password', 'Password cannot be empty').not().isEmpty(),
    validateFields
], addLogin)

module.exports=router