import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = '';
  },)

  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  } 

  let buttonName = "";
    if (props.buttonName) {
    buttonName = "Сохранение...";
  } else {
    buttonName = "Сохранить";
  }

  return (
    <PopupWithForm
          name="update-avatar"
          title="Обновить аватар"
          buttonName={buttonName}
          isOpen={props.isOpen}
          isClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <label className="popup__label popup__label_one">
            <input
              type="url"
              className="popup__input"
              name="avatar"
              placeholder="Адрес фотокарточки"
              required
              ref={avatarRef}
            />
            <span className="popup__input-error popup__input-error_type_avatar"></span>
          </label>
        </PopupWithForm>
  )  
}

export default EditAvatarPopup