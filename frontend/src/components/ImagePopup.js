function ImagePopup(props) {
  function handleOverlayClick(evt) {
    if (evt.target===evt.currentTarget) {props.onClose()}
  }

  return(
      <div className={`popup popup_view-card ${props.card && 'popup_opened'}`} onClick={handleOverlayClick}>
        <div className="popup__view-card">
          <img
            className="popup__img"
            src={props.card?.link ?? ''}
            alt={props.card?.name ?? ''}
          />
          <p className="popup__img-info">{props.card ? props.card.name : ''}</p>
          <button className="button popup__close-button" onClick={props.onClose} type="button" aria-label="Закрыть попап"/>
        </div>
      </div>
  );
}

export default ImagePopup;