import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';

function App() {
  return (
    <div>
      <Header />
      <Main />
      <Footer />
      <PopupWithForm name='edit-profile' title='Редактировать профиль'>
        <input
          type="text"
          name="name"
          placeholder="Имя"
          className="popup__input popup__input_value_name"
          minlength="2"
          maxlength="40"
          required
        />
        <span className="popup__error popup__error_name_name"></span>
        <input
          type="text"
          name="job"
          placeholder="О себе"
          className="popup__input popup__input_value_job"
          minlength="2"
          maxlength="200"
          required
        />
        <span className="popup__error popup__error_name_job"></span>
        <button
          type="submit"
          className="popup__save-button"
        >Сохранить</button>
      </PopupWithForm>
      <PopupWithForm name='add-image' title='Новое место'>
        <input
          type="text"
          name="description"
          placeholder="Название"
          className="popup__input popup__input_value_description"
          minlength="2"
          maxlength="30"
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
        <button
          type="submit"
          className="popup__save-button popup__save-button_disabled"
          disabled
        >Создать</button>
      </PopupWithForm>
      <PopupWithForm name='update-avatar' title='Обновить аватар'>
        <input type="url"
          name="link"
          placeholder="Ссылка на картинку"
          className="popup__input popup__input_value_link"
          required
        />
        <span className="popup__error popup__error_name_link"></span>
        <button
          type="submit"
          className="popup__save-button popup__save-button_disabled"
          disabled
        >Сохранить</button>
      </PopupWithForm>
      <PopupWithForm name='delete-card' title='Вы уверены?'>
        <button
          type="submit"
          className="popup__save-button popup__save-button_margin_none"
        >Да</button>
      </PopupWithForm>
      <div className="popup popup_name_image">
        <div className="popup__container-image">
          <figure className="popup__figure">
            <img src="#" alt="popup image" className="popup__photo" />
            <figcaption className="popup__caption"></figcaption>
          </figure>
          <button type="button" className="popup__close-button"></button>
        </div>
      </div>
      <template id="template-cards">
        <article className="card">
          <img alt="template image" className="card__image" />
          <button type="button" className="card__delete-button"></button>
          <div className="card__container">
            <h2 className="card__description"></h2>
            <div>
              <button type="button" className="card__like-button"></button>
              <p className="card__like-counter"></p>
            </div>
          </div>
        </article>
      </template>
    </div>
  );
}

export default App;
