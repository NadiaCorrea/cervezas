const express = require('express');
const router = express.Router();

const {getCervezas, getCerveza, addCerveza, deleteCerveza, editCerveza} = require('../controllers/cervezas');

router.get('/', getCervezas);

router.get('/:id', getCerveza);

router.post('/', addCerveza);

router.delete('/:id', deleteCerveza);

router.put('/:id', editCerveza);

module.exports = router;
