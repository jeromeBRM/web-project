const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getDatabase);
router.post('/signup', userCtrl.signup);
router.post('/signin', userCtrl.signin);

module.exports = router;