const router = require('express').Router();
const {
  sendCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { cardIdValidator, createCardValidator } = require('../middlewares/validation');

router.get('/', sendCards);
router.post('/', createCardValidator, createCard);
router.delete('/:cardId', cardIdValidator, deleteCard);
router.put('/:cardId/likes', cardIdValidator, likeCard);
router.delete('/:cardId/likes', cardIdValidator, dislikeCard);

module.exports = router;
