const express = require('express');
const router = express.Router();

const listCtrl = require('../controllers/list');

router.post('/', listCtrl.getDatabaseList);
router.post('/get', listCtrl.get);
router.post('/create', listCtrl.create);
router.post('/delete', listCtrl.delete);

module.exports = router;