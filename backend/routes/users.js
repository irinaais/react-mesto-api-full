const router = require('express').Router();
const {
  sendUsers, sendUserById, updateUser, updateAvatar, getMe,
} = require('../controllers/users');
const { updateProfileValidator, updateAvatarValidator, userIdValidator } = require('../middlewares/validation');

router.get('/', sendUsers);
router.patch('/me', updateProfileValidator, updateUser);
router.patch('/me/avatar', updateAvatarValidator, updateAvatar);
router.get('/me', getMe);
router.get('/:userId', userIdValidator, sendUserById);

module.exports = router;
