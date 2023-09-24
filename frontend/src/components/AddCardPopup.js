import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddCardPopup(props) {
  const [placeName, setPlaceName] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  
  React.useEffect(() => {
    setPlaceName('');
    setPhoto('');
  }, []);

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }
  function handleChangePhoto(e) {
    setPhoto(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddCard({
      name: placeName,
      link: photo,
    });
  } 

  let buttonName = "";

  if (props.buttonName) {
    buttonName = "Создание...";
  } else {
    buttonName = "Создать";
  }


  return (
    <PopupWithForm
      name="add-author"
      title="Новое место"
      buttonName= {buttonName}
      isOpen={props.isOpen}
      isClose={props.onClose}
      onSubmit={handleSubmit}

    >
      <label className="popup__label">
        <input
          type="text"
          className="popup__input"
          name="place-name"
          placeholder="Название"
          value={placeName}
          minLength="2"
          maxLength="40"
          required
          onChange={handleChangePlaceName}
        />
        <span className="popup__input-error popup__input-error_type_place-name"></span>
      </label>

      <label className="popup__label">
        <input
          type="url"
          className="popup__input"
          name="photo"
          placeholder="Ссылка на картинку"
          value={photo}
          required
          onChange={handleChangePhoto}
        />
        <span className="popup__input-error popup__input-error_type_photo"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddCardPopup;
