import PopupWithForm from "./PopupWithForm";
import React, {useRef} from 'react';

function EditAvatarPopup(props) {
  const inputRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  return (
    <PopupWithForm name="edit-avatar" title="Обновить аватар" buttonText="Сохранить"
                   isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input className="popup__input popup__input_avatar" type="url" id="avatar-input" required size="14"
             placeholder="Ссылка на аватар" name="avatar" ref={inputRef}/>
      <span className="popup__input-error avatar-input-error"/>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;