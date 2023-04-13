import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_name_${props.name}`}>
      <div className="popup__container">
        <h3 className="popup__title">
          {props.title}
        </h3>
        <form action="#" name={props.name} className="popup__form">
          {props.children}
        </form>
        <button type="button" className="popup__close-button"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
