import { useState } from "react";
import { Link } from "react-router-dom";

function Register({buttonName, isRegister}) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: ""
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
    isRegister(password, email);
    
  };

  return (
    <div className="login">
      <h2 className="login__title">Регистрация</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          name="email"
          type="email"
          id="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="email"
        ></input>
        <input
          className="login__input"
          name="password"
          type="password"
          id="password"
          value={formValue.password}
          placeholder="password"
          onChange={handleChange}
        ></input>
        <button className="login__submit" type="submit">{`${buttonName ? 'Регистрация...' : 'Зарегистрироваться'}`}</button>
      </form>
      <Link className="login__link" to="/sign-in">
        Уже зарегистрировались? Войти
      </Link>
    </div>
  );
}

export default Register;
