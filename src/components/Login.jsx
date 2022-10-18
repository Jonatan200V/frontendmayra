import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../store/Store";
let token = null;
const URL = "https://mayraformulario.vercel.app/";
console.log(URL);
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};
const Login = () => {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { existUser } = useAppContext();
  useEffect(() => {
    const loggedUserJSON = JSON.parse(localStorage.getItem("token"));
    console.log(loggedUserJSON);
    if (loggedUserJSON) {
      console.log(loggedUserJSON);
      // existUser(loggedUserJSON);
      // navigate("/home");
      setToken(loggedUserJSON.token);
    }
  }, []);

  const handleChangeLogin = (evt) => {
    const { name, value } = evt.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };
  const loginUser = async (evt) => {
    evt.preventDefault();
    const res = await fetch(`${URL}login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: login.email,
        password: login.password,
      }),
    });
    const data = await res.json();
    const { user } = data;
    window.localStorage.setItem("token", JSON.stringify(data));
    setToken(data.token);
    if (user) {
      existUser(user);
      navigate("/home");
    } else {
      console.log("Usuario no registrado");
    }
  };
  return (
    <div className="loggin">
      <form onSubmit={loginUser} className="loggin__form">
        <input
          placeholder="Correo"
          onChange={handleChangeLogin}
          value={login.email}
          name="email"
          type="email"
          className="loggin__input"
        />
        <input
          placeholder="Contraseña"
          onChange={handleChangeLogin}
          value={login.password}
          name="password"
          type="password"
          className="loggin__input"
        />
        <button className="loggin__button">Entrar</button>
        <Link className="links loggin__link" to="/register-user">
          Registrar
        </Link>
      </form>
    </div>
  );
};

export default Login;
