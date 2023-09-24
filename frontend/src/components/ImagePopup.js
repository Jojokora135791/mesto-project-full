import React from 'react';

function ImagePopup({card, isClose}) {
  return (
    <div className={`popup popup_type_open-card ${card.link ? 'popup_opened' : ''} `}>
        <div className="popup__card">
          <img className="popup__photo" src={card.link} alt={card.name}/>
          <h3 className="popup__place-name">{card.name}</h3>
          <button
            className="popup__button-close popup__button-close_type_open-card"
            type="button"
            onClick={isClose}
          ></button>
        </div>
      </div>
  );
}

export default ImagePopup;