import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card.likes.some(i => i === currentUser._id);

  const cardLikeButtonClassName = ( 
    `element__like ${isLiked && 'element__like_active'}` 
  );
  
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card)
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  return (
    <article className="element">
      <button className="element__button-photo" type="button" onClick={handleClick}>
        <img className="element__photo" src={props.card.link} alt={props.card.name} />
      </button>
      <div className="element__place">
        <h3 className="element__place-name">{props.card.name}</h3>
      {isOwn && <button type="button" className="element__delete" onClick={handleDeleteClick}></button>}
        <div className="element__likes">
          <button className={cardLikeButtonClassName} type="button"onClick={handleLikeClick}></button>
          <p className="element__number-like">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
