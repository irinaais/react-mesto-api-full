import PopupWithForm from "./PopupWithForm";
import React, {useState, useEffect} from 'react';

function AddPlacePopup(props) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlace({
      name,
      link,
    });
  }

  // эффект, который будет обновлять переменные состояния при изменении контекста
  useEffect(() => {
      setName('');
      setLink('');
    },[props.isOpen]
  );

  return(
    <PopupWithForm name="add" title="Новое место" buttonText="Создать"
                   isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
      <input className="popup__input popup__input_name-place" type="text" id="namePlace-input" required size="14"
             minLength="2" maxLength="30" placeholder="Название" name="name" value={name || ''} onChange={handleChangeName}/>
      <span className="popup__input-error namePlace-input-error"/>
      <input className="popup__input popup__input_link" type="url" id="linkPlace-input" required size="14"
             placeholder="Ссылка на картинку" name="link" value={link || ''} onChange={handleChangeLink}/>
      <span className="popup__input-error linkPlace-input-error"/>
    </PopupWithForm>
  )
}

export default AddPlacePopup;