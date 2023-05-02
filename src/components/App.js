import { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopup, setEditProfilePopup] = useState(false);
  const [isAddPlacePopup, setIsAddPlacePopup] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopup(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatar(true);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function closeAllPopup() {
    setEditProfilePopup(false);
    setIsAddPlacePopup(false);
    setIsEditAvatar(false);
    handleCardClick(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => setCards((state) => state.map((c) => c._id === card._id ? newCard : c)))
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => setCards((state) => state.filter((c) => c._id !== card._id)))
      .catch(err => console.log(err));
  }

  useEffect(() => {
    Promise.all([
      api.getUserInfo(),
      api.getInitialCards()
    ])
      .then(([userInfo, cards]) => {
        setCurrentUser(userInfo);
        setCards(cards);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
          cards={cards}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <PopupWithForm
          name='edit-profile'
          title='Редактировать профиль'
          buttonTitle='Сохранить'
          isOpen={isEditProfilePopup}
          onClose={closeAllPopup}
        >
          <input
            type="text"
            name="name"
            placeholder="Имя"
            className="popup__input popup__input_value_name"
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__error popup__error_name_name"></span>
          <input
            type="text"
            name="job"
            placeholder="О себе"
            className="popup__input popup__input_value_job"
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__error popup__error_name_job"></span>
        </PopupWithForm>
        <PopupWithForm
          name='add-image'
          title='Новое место'
          buttonTitle='Создать'
          isOpen={isAddPlacePopup}
          onClose={closeAllPopup}
        >
          <input
            type="text"
            name="description"
            placeholder="Название"
            className="popup__input popup__input_value_description"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__error popup__error_name_description"></span>
          <input
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_value_link"
            required
          />
          <span className="popup__error popup__error_name_link"></span>
        </PopupWithForm>
        <PopupWithForm
          name='update-avatar'
          title='Обновить аватар'
          buttonTitle='Сохранить'
          isOpen={isEditAvatar}
          onClose={closeAllPopup}
        >
          <input type="url"
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_value_link"
            required
          />
          <span className="popup__error popup__error_name_link"></span>
        </PopupWithForm>
        <PopupWithForm
          name='delete-card'
          title='Вы уверены?'
          buttonTitle='Да'
        >
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopup} />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
