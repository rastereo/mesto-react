import { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeleteCardPopup from './DeleteCardPopup';

import api from '../utils/Api';
import CurrentUserContext from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopup, setEditProfilePopup] = useState(false);
  const [isAddPlacePopup, setIsAddPlacePopup] = useState(false);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [deleteCard, setDeleteCard] = useState(null);

  function handleEditProfileClick() {
    setEditProfilePopup(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopup(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatar(true);
  }

  function handleCardDeleteClick(selectedCard) {
    setDeleteCard(selectedCard);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function closeAllPopup() {
    setEditProfilePopup(false);
    setIsAddPlacePopup(false);
    setIsEditAvatar(false);
    setDeleteCard(null);
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
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopup();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);

    api.patchUserInfo(name, about)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar(avatarUrl) {
    setIsLoading(true);

    api.patchAvatar(avatarUrl)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdatePlace({ name, link }) {
    setIsLoading(true);

    api.postCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopup();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
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
          onCardDelete={handleCardDeleteClick}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopup}
          onClose={closeAllPopup}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatar}
          onClose={closeAllPopup}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopup}
          onClose={closeAllPopup}
          onUpdatePlace={handleUpdatePlace}
          isLoading={isLoading}
        />
        <DeleteCardPopup
          isOpen={deleteCard}
          onClose={closeAllPopup}
          onCardDelete={() => handleCardDelete(deleteCard)}
        />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopup}
        />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
