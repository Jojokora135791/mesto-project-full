import React from "react";
import { useState } from "react";

function Login({isLogin, buttonName}) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    const { email, password } = formValue;
    e.preventDefault();
    isLogin(password, email)

  };

  return (
    <div className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          name="email"
          type="email"
          id="email"
          placeholder="email"
          value={formValue.email}
          onChange={handleChange}
        ></input>
        <input
          className="login__input"
          name="password"
          type="password"
          id="password"
          placeholder="password"
          value={formValue.password}
          onChange={handleChange}
        ></input>
        <button className="login__submit" type="submit">{`${buttonName ? 'Вход...' : 'Войти'}`}</button>
      </form>
    </div>
  );
}

export default Login;
