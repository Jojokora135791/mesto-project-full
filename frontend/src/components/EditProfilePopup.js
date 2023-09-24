import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name: name,
      about: description,
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
      name="edit-profile"
      title="Редактировать профиль"
      buttonName={buttonName}
      isOpen={props.isOpen}
      isClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          name="author"
          type="text"
          className="popup__input"
          placeholder="Имя автора"
          value={name}
          minLength="2"
          maxLength="40"
          required
          onChange={handleChangeName}
        />
        <span className="popup__input-error popup__input-error_type_author"></span>
      </label>
      <label className="popup__label">
        <input
          name="job"
          type="text"
          className="popup__input"
          placeholder="Занятие автора"
          value={description}
          minLength="2"
          maxLength="40"
          required
          onChange={handleChangeDescription}
        />
        <span className="popup__input-error popup__input-error_type_job"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
