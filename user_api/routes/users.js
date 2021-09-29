const express = require('express');
const router = express.Router();
const user = require('../controllers/UsersController');
const verifyEmailTemplate = require('../utils/verifyEmailTemplate');
const authUser = require('../middlewares/authUser');

const multer = require('multer');
const upload = multer({storage : multer.memoryStorage()});

router.get('/list', authUser, user.getAllUsers);
router.get('/:id', authUser, user.getUserById);
router.put('/update/:id', authUser, user.updateUser);
router.delete('/delete/:id', authUser, user.deleteUser);

router.post('/login', user.loginUser);
router.post('/register', upload.single("image"), user.createUser);

router.post('/email/send/verify', verifyEmailTemplate.sendEmail);
router.get('/email/verify', verifyEmailTemplate.verifyEmail);

module.exports = router;