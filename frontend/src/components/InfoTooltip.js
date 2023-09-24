import React from "react";

function InfoToolTip(props) {
  const divider = '\u{000A}';
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''} `}>
      <div className="popup__container">
        <div className="popup__box">
        <div className={`${props.auth ? 'popup__image-successed' : 'popup__image-failed'}`}></div>
        <p className="popup__text">{props.text}</p>
        </div>
        <button className="popup__button-close" onClick={props.isClose}> </button>
      </div>
    </div>
  );
}

export default InfoToolTip;