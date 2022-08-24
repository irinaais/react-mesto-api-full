import React, {useContext} from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  // console.log('currentUser._id===', currentUser._id);
  // console.log('props.card =====', props.card);
  console.log('props.card.owner ===', props.card.owner);
  console.log('props.card.likes ===', props.card.likes);
  const isOwn = props.card.owner === currentUser._id; //являемся ли мы владельцем текущей карточки
  const isLiked = Array.isArray(props.card.likes) ? props.card.likes.includes(currentUser._id) : false;
  // const isLiked = props.card.likes.some(i => i._id === currentUser._id); //есть ли у карточки лайк, поставленный текущим пользователем
  const cardDeleteButtonClassName = (`${isOwn ? 'button button_variant_delete' : 'button_variant_delete_hidden'}`); //`className` кнопки удаления
  const cardLikeButtonClassName = (`button button_variant_like ${isLiked && 'button_variant_active-like'}`); //`className` кнопки лайка

  function handleConfirmDeleteCard() {
    props.onCardDelete(props.card);
  }

  return <li className="element">
    <img
      className="element__image"
      src={props.card.link}
      alt={props.card.name}
      onClick={() => props.onCardClick(props.card)}
    />
    <button className={cardDeleteButtonClassName} onClick={handleConfirmDeleteCard} type="button" aria-label="Удалить карточку"/>
    <div className="element__box">
      <h2 className="element__town">{props.card.name}</h2>
      <div className="element__like-box">
        <button className={cardLikeButtonClassName} onClick={() => {props.onCardLike(props.card)}} type="button" aria-label="Поставить лайк"/>
        <span className="element__like-count">0</span>
      </div>
    </div>
  </li>
}
export default Card;
