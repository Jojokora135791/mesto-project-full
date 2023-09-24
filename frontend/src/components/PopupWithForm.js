import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''} `}>
      <div className="popup__container">
        <form className="popup__form" onSubmit={props.onSubmit}>
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
            <button
              className="popup__button-submit popup__button-submit_type_save"
              type="submit"
            >
              {props.buttonName}
            </button>
        </form>
        <button className="popup__button-close popup__button-close_type_edit-profile" onClick={props.isClose}> </button>
      </div>
    </div>
  );
}

export default PopupWithForm;
