import React, {useState} from "react";
import {Link} from "react-router-dom";

function Register (props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(evt) {
    setEmail(evt.target.value);
  }

  function handleChangePassword(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
    setEmail('');
    setPassword('');
  }

  return (
    <section className="registration page__section">
      <h2 className="registration__title">Регистрация</h2>
      <form className="registration__form" onSubmit={handleSubmit}>
        <fieldset className="registration__info">
          <input className="registration__input registration__input_email" type="email"
                 id="email-input" required size="14" minLength="1" maxLength="30" placeholder="Email"
                 name="email" value={email || ''} onChange={handleChangeEmail}/>
          <span className="registration__input-error email-input-error"/>
          <input className="registration__input registration__input_password" type="password"
                 id="password-input" required size="14" placeholder="Пароль"
                 name="password" value={password || ''} onChange={handleChangePassword}/>
          <span className="registration__input-error password-input-error"/>
        </fieldset>
        <button className="button registration__button registration__submit" type="submit"
                aria-label="Зарегистрироваться">Зарегистрироваться</button>
        <p className="registration__text">Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="registration__link">Войти</Link>
        </p>
      </form>
    </section>
  )
}

export default Register;