const express = require('express');
const router = express.Router();
const {getBares, getBar, addBar, deleteBar, editBar} = require('../controllers/bares');

router.get('/', getBares);

router.get('/:id', getBar);

router.post('/', addBar);

router.delete('/:id', deleteBar);

router.put('/:id', editBar)

module.exports = router;
