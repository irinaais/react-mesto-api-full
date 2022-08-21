import PopupWithForm from './PopupWithForm';
import React from 'react';

function ConfirmDeletePopup(props) {
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onCardDelete();
  }

  return(
    <PopupWithForm name="delete-card" title="Вы уверены?" buttonText="Да"
      isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
    </PopupWithForm>
  )
}

export default ConfirmDeletePopup;