import '../index.css';
import React, {useState, useEffect} from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import ImagePopup from './ImagePopup';
import Api from "../utils/Api";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmDeletePopup from './ConfirmDeletePopup';
import {Route, Routes, useNavigate} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as ApiAuth from "../utils/ApiAuth";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isConfirmDeletePopupOpen, setIsConfirmDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({name: '', link: '', about: ''});
  const [cards, setCards] = useState([]);
  const [cardForDelete, setCardForDelete] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipOk, setIsInfoTooltipOk] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      Api.getUserInfoAndInitialCards()
        .then(([cards, userInfo]) => {
          setCards(cards);
          setCurrentUser(userInfo);
        })
        .catch(err => console.log(err));
    }
  }, [loggedIn]);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function openInfoTooltipOk() {
    setIsInfoTooltipOpen(true);
    setIsInfoTooltipOk(true);
  }

  function openInfoTooltipFail() {
    setIsInfoTooltipOpen(true);
    setIsInfoTooltipOk(false);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeletePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  //если у пользователя есть токен в localStorage, проверяем действующий он или нет
  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      ApiAuth.tokenCheck(token)
        .then((res) => {
          if (res.data) {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function onRegister(email, password) {
    ApiAuth.register(email, password)
      .then((res) => {
        if (res.data) {
          navigate('/sign-in');
          openInfoTooltipOk();
        } else {
          openInfoTooltipFail();
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltipFail();
      });
  }

  function onLogin(email, password) {
    ApiAuth.authorise(email, password)
      .then((data) => {
        if (data.token) {
          tokenCheck();
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        openInfoTooltipFail();
      });
  }

  function onLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    navigate("/sign-in");
  }

  function onCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDeleteClick(cardForDelete) {
    setCardForDelete(cardForDelete);
    setIsConfirmDeletePopupOpen(true);
  }

  function handleCardLike(card) {
    // проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    Api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardConfirmDelete() {
    setIsConfirmDeletePopupOpen(true);
    Api.deleteCard(cardForDelete._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== cardForDelete._id && c));
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(userData) {
    Api.saveUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(userData) {
    Api.editAvatar(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    Api.addCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onLogout={onLogOut}/>
        <Routes>
          <Route path="/" element={<ProtectedRoute loggedIn={loggedIn}/>}>
            <Route path="/" element={
              <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
                    onEditAvatar={handleEditAvatarClick} onCardClick={onCardClick}
                    onCardLike={handleCardLike} onCardDelete={handleCardDeleteClick}
                    cards={cards}/>
            }/>
          </Route>
          <Route path="/sign-up" element={<Register onRegister={onRegister}/>}/>
          <Route path="/sign-in" element={<Login onLogin={onLogin}/>}/>
        </Routes>
        <Footer/>
      </div>

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}/>

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}/>

      <ConfirmDeletePopup
        isOpen={isConfirmDeletePopupOpen}
        onClose={closeAllPopups}
        onCardDelete={handleCardConfirmDelete}/>

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}/>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}/>

      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isInfoTooltipOk={isInfoTooltipOk}
        isInfoTooltipFail={!isInfoTooltipOk}/>
    </CurrentUserContext.Provider>
  );
}

export default App;
