const express = require('express');
const router = express.Router();
const api = require('../controllers/api');

/* GET home page. */
router.get('/', api.index);
router.get('/:username', api.username);

module.exports = router;
