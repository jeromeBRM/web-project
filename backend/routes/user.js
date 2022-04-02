const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getDatabase);
router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.signin);
router.post('/updateEmail',userCtrl.updateEmail);
router.post('/updatePassword',userCtrl.updatePassword);
router.get('/verify',userCtrl.verify);

module.exports = router;