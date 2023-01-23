const express = require('express');
const { uploadFile } = require('../controllers/fichero');
const router = express.Router();

router.post('/', uploadFile);

module.exports = router;