const express = require('express');
const router = express.Router();

const stepCtrl = require('../controllers/step');

router.get('/', stepCtrl.StepList);
router.post('/create', stepCtrl.create);
router.post('/delete', stepCtrl.delete);
router.post('/update',stepCtrl.update);
router.post('/complete', stepCtrl.complete);

module.exports = router;