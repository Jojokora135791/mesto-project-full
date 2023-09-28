import React, { useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import * as auth from "../utils/auth";

import { Route, Routes, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";

import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddCardPopup from "./AddCardPopup";
import { ProtectedRoute } from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";
import InfoToolTip from "./InfoTooltip";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isInfoToolTip, setIsInfoToolTip] = React.useState(false);

  const [currentUser, SetCurrentUser] = React.useState({});
  const [emailProfile, SetEmailProfile] = React.useState("");

  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setLoggedIn] = React.useState(null);
  const [checkEmail, setCheckEmail] = React.useState(null);

  const [isRegiserSuccessed, setIsRegiserSuccessed] = React.useState(false);
  const [isTitleInfo, setIsTitleInfo] = React.useState("");

  const [isLoading, setIsLoading] = React.useState("");

  const navigate = useNavigate();

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then((res) => {
      const [userData, cardsData] = res;
        SetCurrentUser(userData.data);
        setCards(cardsData);
    })
    .catch((err) => {
      console.log(err);
    });
    checkToken();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[checkEmail]);

  const checkToken = () => {
    auth
      .getContent()
      .then((res) => {
        if (res) {
          SetEmailProfile(res.data.email);
          setCheckEmail(res.data.email);
          navigate("/");
          setLoggedIn(true);
        }
      })
      .catch((e) => setLoggedIn(false));
  };

  // Функции-вызовы API
  function handleRegister(password, email) {
    setIsLoading(true);
    auth
      .register(password, email)
      .then((data) => {
        console.log(data)
        setIsRegiserSuccessed(true);
        setIsTitleInfo("Вы успешно зарегистрировались!");
        OpenInfoToolTip();
        navigate("/sign-in");
      })
      .catch((err) => {
        setIsRegiserSuccessed(false);
        setIsTitleInfo("Что-то пошло не так! Попробуйте ещё раз.");
        OpenInfoToolTip();
      })
      .finally(() => setIsLoading(false));
  }
  function handleLogin(password, email) {
    setIsLoading(true);
    auth
      .authorize(email, password)
      .then(() => {
        SetEmailProfile(email);
        setCheckEmail(email);
        setLoggedIn(true);
        setIsRegiserSuccessed(true);
        setIsTitleInfo("Вы успешно авторизировались!");
        OpenInfoToolTip();
        navigate("/");
      })
      .catch((err) => {
        setIsRegiserSuccessed(false);
        setIsTitleInfo("Что-то пошло не так! Попробуйте ещё раз.");
        OpenInfoToolTip();
      })
      .finally(() => setIsLoading(false));
  }

  function signOut() {
    setLoggedIn(false);
    // localStorage.removeItem("jwt");
    navigate("/");
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id !== card._id));
    });
  }

  function OpenInfoToolTip() {
    setIsInfoToolTip(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleUpdateUser(name, about) {
    setIsLoading(true);
    api
      .patchUserInfo(name, about)
      .then((data) => {
        SetCurrentUser(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(avatar) {
    setIsLoading(true);
    api
      .editAvatar(avatar)
      .then((data) => {
        SetCurrentUser(data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  function handleAddCard(name, link) {
    setIsLoading(true);
    api
      .addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        closeAllPopups();
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTip(false);
    setSelectedCard({});
  }

  // Это гениально, брат)
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

  React.useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="/sign-up"
            element={
              <>
                <Header />
                <Register isRegister={handleRegister} buttonName={isLoading} />
              </>
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header />
                <Login isLogin={handleLogin} buttonName={isLoading} />
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                <Header onOut={signOut} email={emailProfile} />
                <ProtectedRoute
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  isLoggedIn={isLoggedIn}
                />
                <ProtectedRoute element={Footer} isLoggedIn={isLoggedIn} />
              </>
            }
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          buttonName={isLoading}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          buttonName={isLoading}
        />

        <AddCardPopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCard}
          buttonName={isLoading}
        />

        <PopupWithForm
          name="delete-card"
          title="Вы уверен?"
          buttonName="Да"
          isClose={closeAllPopups}
        ></PopupWithForm>

        <ImagePopup card={selectedCard} isClose={closeAllPopups}></ImagePopup>
        <InfoToolTip
          name="auth"
          auth={isRegiserSuccessed}
          text={isTitleInfo}
          isClose={closeAllPopups}
          isOpen={isInfoToolTip}
        ></InfoToolTip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
