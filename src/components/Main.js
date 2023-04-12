function Main() {
  return (
    <main>
      <section className="profile">
        <button type="button" className="profile__avatar-button">
          <img src="#" alt="Аватар" className="profile__avatar" />
        </button>
        <div className="profile__info">
          <h1 className="profile__name"></h1>
          <p className="profile__job"></p>
          <button type="button" className="profile__edit-button"></button>
        </div>
        <button type="button" className="profile__add-button"></button>
      </section>
      <section className="cards"></section>
    </main>
  );
}

export default Main;
