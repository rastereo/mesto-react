import React from "react";
import ClosePopupOnKeydown from "./ClosePopupOnKeydown";

function ImagePopup(props) {
  const { link, name } = props.card;

  return (
    <div
      className={`popup popup_name_image ${props.card && 'popup_opened'}`}
      onClick={(evt) => evt.target.classList.contains('popup') && props.onClose()}
    >
      <div className="popup__container-image">
        <figure className="popup__figure">
          <img src={link} alt={name} className="popup__photo" />
          <figcaption className="popup__caption">{name}</figcaption>
        </figure>
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
      </div>
      {props.card && <ClosePopupOnKeydown action={props.onClose}/>}
    </div>
  );
}

export default ImagePopup;
