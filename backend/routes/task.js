const express = require('express');
const router = express.Router();

const taskCtrl = require('../controllers/task');

router.get('/', taskCtrl.getTasksList);
router.post('/TasksDeadline', taskCtrl.getTasksDeadline);
router.post('/create', taskCtrl.create);
router.post('/delete', taskCtrl.delete);
router.post('/update',taskCtrl.update);


module.exports = router;