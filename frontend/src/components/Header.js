import logo from '../images/Vector.svg';
import {Link, Route, Routes} from "react-router-dom";
import React from "react";

function Header(props) {
  return (
    <header className="header page__section">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип проекта Место"
      />
      <div className={"header__container"}>
        <Routes>
          <Route path="/" element={
            <>
             <p className={"header__container_user-email"}>{props.email}</p>
             <button className={"button header__container_button"} onClick={props.onLogout}>Выйти</button>
            </>
          }/>
          <Route path="/sign-up" element={<Link to={"/sign-in"} className="button header__container_link-text">Войти</Link>}/>
          <Route path="/sign-in" element={<Link to={"/sign-up"} className="button header__container_link-text">Регистрация</Link>}/>
        </Routes>
      </div>
    </header>
  );
}

export default Header;