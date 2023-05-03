import React from 'react';
import ClosePopupOnKeydown from '../hooks/ClosePopupOnKeydown';

function ImagePopup(props) {
  const { link, name } = props.card !== null && props.card;

  return (
    <div
      className={`popup popup_name_image ${props.card !== null && 'popup_opened'}`}
      onClick={(evt) => evt.target.classList.contains('popup') && props.onClose()}
    >
      <div className="popup__container-image">
        <figure className="popup__figure">
          <img
            src={link}
            alt={name}
            className="popup__photo"
          />
          <figcaption className="popup__caption">
            {name}
          </figcaption>
        </figure>
        <button
          type="button"
          className="popup__close-button"
          onClick={props.onClose}
        ></button>
      </div>
      {props.card !== null && <ClosePopupOnKeydown action={props.onClose}/>}
    </div>
  );
}

export default ImagePopup;
