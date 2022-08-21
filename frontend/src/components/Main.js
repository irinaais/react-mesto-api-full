import React from 'react';
import Card from '../components/Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);
  return(
    <main>
      <section className="profile page__section">
        <div className="profile__column">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватарка"
          />
          <button className="button button_variant_avatar" onClick={props.onEditAvatar} type="button" aria-label="Загрузить аватар"/>
          <div className="profile__info">
            <div className="profile__box">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="button button_variant_edit" onClick={props.onEditProfile} type="button"
                      aria-label="Редактировать профиль"/>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="button button_variant_add" onClick={props.onAddPlace} type="button" aria-label="Добавить фотографии"/>
      </section>

      <section className="cards page__section">
        <ul className="elements">
          {props.cards.map((card) => (<Card key={card._id} card={card}
                                           onCardClick={props.onCardClick} onCardLike={props.onCardLike}
                                           onCardDelete={props.onCardDelete}/>))}
        </ul>
      </section>
    </main>
  );
}

export default Main;