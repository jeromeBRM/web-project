const express = require('express');
const router = express.Router();

const listCtrl = require('../controllers/list');

router.get('/', listCtrl.getDatabaseList);
router.post('/create', listCtrl.create);
router.post('/delete', listCtrl.delete);

module.exports = router;