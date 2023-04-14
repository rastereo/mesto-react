import React from "react";

function Card(props) {
  const { link, name, likes } = props.card;

  function handleClick() {
    props.onCardClick({ link, name });
  }

  return (
    <article className="card">
      <img src={link} alt={name} className="card__image" onClick={handleClick} />
      <button type="button" className="card__delete-button"></button>
      <div className="card__container">
        <h2 className="card__description">{name}</h2>
        <div>
          <button type="button" className="card__like-button"></button>
          <p className="card__like-counter">{likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
