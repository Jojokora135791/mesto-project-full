import React from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__section">
          <button
            className="profile__button-edit-avatar"
            type="button"
            onClick={props.onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="аватар"
              className="profile__avatar"
            />
          </button>
          <div className="profile__info">
            <div className="profile__author-block">
              <h2 className="profile__author">{currentUser.name}</h2>
              <button
                type="button"
                className="profile__button-edit"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>

      <section className="elements">
        {props.cards.map((card) => (
          <Card
            key={card._id}
            card={card}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
