import React from 'react';

function PopupWithForm(props) {
  function handleOverlayClick(evt) {
    if (evt.target===evt.currentTarget) {props.onClose()}
  }

  return(
    <div className={`popup popup_${props.name} ${props.isOpen && 'popup_opened'}`} onClick={handleOverlayClick}>
      <div className={`popup__${props.name}`}>
        <h2 className="popup__title">{props.title}</h2>
          <form className="popup__form" name={`${props.name}-form`} onSubmit={props.onSubmit}>
            <fieldset className="popup__info">
              {props.children}
            </fieldset>
            <button className="button popup__save-button popup__submit" type="submit"
                    aria-label="Сохранить информацию">{props.buttonText}
            </button>
          </form>
        <button className="button popup__close-button" onClick={props.onClose} type="button" aria-label="Закрыть попап"/>
      </div>
    </div>
  );
}

export default PopupWithForm;
