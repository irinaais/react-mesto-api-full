import PopupWithForm from './PopupWithForm';
import React, {useEffect, useState, useContext} from 'react';
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault(); // Запрещаем браузеру переходить по адресу формы
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

// эффект, который будет обновлять переменные состояния при изменении контекста
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm name="edit" title="Редактировать профиль" buttonText="Сохранить"
                   isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_name-user" type="text" id="nameUser-input" required
             size="14" minLength="2" maxLength="40" placeholder="Ваше имя" name="nameUser" value={name || ''}
             onChange={handleChangeName}/>
      <span className="popup__input-error nameUser-input-error"/>
      <input className="popup__input popup__input_work-user" type="text" id="workUser-input" required
             size="14" minLength="2" maxLength="200" placeholder="О себе" name="workUser" value={description || ''}
             onChange={handleChangeDescription}/>
      <span className="popup__input-error workUser-input-error"/>
    </PopupWithForm>
  )
}

export default EditProfilePopup;