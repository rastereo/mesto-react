import React from "react";

function handleEditAvatarClick() {
  const popupEditAvatar = document.querySelector('.popup_name_update-avatar');

  popupEditAvatar.classList.toggle('popup_opened');
}

function handleEditProfileClick() {
  const popupEditProfile = document.querySelector('.popup_name_edit-profile');

  popupEditProfile.classList.toggle('popup_opened')
}

function handleAddPlaceClick() {
  const popupAddPlace = document.querySelector('.popup_name_add-image');

  popupAddPlace.classList.toggle('popup_opened');
}

function Main() {
  return (
    <main>
      <section className="profile">
        <button type="button" className="profile__avatar-button" onClick={handleEditAvatarClick}>
          <img src="#" alt="Аватар" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name">{}</h1>
          <p className="profile__job"></p>
          <button type="button" className="profile__edit-button" onClick={handleEditProfileClick}></button>
        </div>
        <button type="button" className="profile__add-button" onClick={handleAddPlaceClick}></button>
      </section>
      <section className="cards"></section>
    </main>
  );
}

export default Main;
