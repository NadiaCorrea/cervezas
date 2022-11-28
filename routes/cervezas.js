const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const { validateFields} = require('../helpers/validate-fields');
// const { existCervezaName} = require('../helpers/db-validators');
const val = require('../helpers/db-validators');

const {getCervezas, getCerveza, addCerveza, deleteCerveza, editCerveza} = require('../controllers/cervezas');

router.get('/', getCervezas);

router.get('/:id', getCerveza);

router.post('/', [

], addCerveza);

router.delete('/:id', deleteCerveza);

router.put('/:id', editCerveza);

module.exports = router;
