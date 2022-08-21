import successfulRegistration from "../images/Union.png";
import unSuccessfulRegistration from "../images/Union---.png";
import React from 'react';

function InfoTooltip(props) {
  function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
      props.onClose()
    }
  }

  return (
    <div className={`popup popup_infotooltip ${props.isOpen && 'popup_opened'}`} onClick={handleOverlayClick}>
      <div className="popup__infotooltip">
        <img src={props.isInfoTooltipOk ? successfulRegistration : unSuccessfulRegistration}
             className="popup__infotooltip-image"
             alt={props.isInfoTooltipOk ? "успешная регистрация" : "ошибка при регистрации"}/>
        <h2
          className="popup__infotooltip-text">{props.isInfoTooltipOk ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз."}</h2>
        <button className="button popup__close-button" onClick={props.onClose} type="button"
                aria-label="Закрыть попап"/>
      </div>
    </div>
  )
}

export default InfoTooltip;