import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../store/Store";

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};
const URL = "https://mayraformulario.vercel.app/";
const RegisterUser = () => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    nombre: "",
    apellido: "",
    confirmPassword: "",
  });
  const [condiciones, setCondiciones] = useState({
    email: false,
    password: false,
    nombre: false,
    apellido: false,
    confirmPassword: false,
    noSubmit: true,
  });
  const navigate = useNavigate();
  const { existUser } = useAppContext();
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    console.log(name);

    setInputValues({
      ...inputValues,
      [name]: value,
    });
    switch (name) {
      case "email": {
        if (!expresiones.correo.test(inputValues.email)) {
          return setCondiciones({ ...condiciones, email: false });
        } else {
          const verify = inputValues.email.split("@");
          if (verify[1].toLocaleLowerCase().includes("masakali.co"))
            return setCondiciones({ ...condiciones, email: true });
        }
        return setCondiciones({ ...condiciones, email: false });
      }
      case "nombre": {
        if (!expresiones.nombre.test(inputValues.nombre))
          return setCondiciones({ ...condiciones, [name]: false });
        else return setCondiciones({ ...condiciones, [name]: true });
      }
      case "apellido": {
        if (!expresiones.nombre.test(inputValues.apellido))
          return setCondiciones({ ...condiciones, [name]: false });
        else return setCondiciones({ ...condiciones, [name]: true });
      }
      case "password": {
        if (!expresiones.password.test(inputValues.password))
          return setCondiciones({ ...condiciones, [name]: false });
        else return setCondiciones({ ...condiciones, [name]: true });
      }
      default:
        return name;
    }
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setCondiciones({
      ...condiciones,
      noSubmit: true,
    });
    if (
      condiciones.email === true &&
      condiciones.password === true &&
      condiciones.nombre === true &&
      condiciones.apellido === true &&
      inputValues.password === inputValues.confirmPassword
    ) {
      const res = await fetch(`${URL}logout`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: JSON.stringify({
          user_name: inputValues.nombre,
          user_surname: inputValues.apellido,
          user_email: inputValues.email,
          user_password: inputValues.password,
        }),
      });
      const data = await res.json();
      existUser(data.user);

      navigate("/home");

      navigate("/home");
    } else {
      setCondiciones({
        ...condiciones,
        noSubmit: false,
      });
    }
  };
  return (
    <div className="register">
      <form className="register__form" onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              placeholder="Correo"
              className="register__input correo"
              name="email"
              type="email"
              value={inputValues.email}
              onChange={handleChange}
            />
          </div>
          {console.log(condiciones.email)}
          {condiciones.email ? null : (
            <span style={{ color: "red", background: "#eeeeee90" }}>
              Correo invalido complete
              <br /> con @masakali.com
            </span>
          )}
        </div>
        <div>
          <div>
            <input
              placeholder="Nombre"
              className="register__input"
              name="nombre"
              type="text"
              value={inputValues.nombre}
              onChange={handleChange}
            />
          </div>
          {condiciones.nombre ? null : (
            <span style={{ color: "red", background: "#eeeeee90" }}>
              Nombre invalido
            </span>
          )}
        </div>
        <div>
          <div>
            <input
              placeholder="Apellido"
              className="register__input"
              name="apellido"
              type="text"
              value={inputValues.apellido}
              onChange={handleChange}
            />
          </div>
          {condiciones.apellido ? null : (
            <span style={{ color: "red", background: "#eeeeee90" }}>
              Apellido invalido
            </span>
          )}
        </div>
        <div>
          <div>
            <input
              placeholder="Contraseña"
              className="register__input"
              name="password"
              type="password"
              value={inputValues.password}
              onChange={handleChange}
            />
          </div>
          {condiciones.password ? null : (
            <span style={{ color: "red", background: "#eeeeee90" }}>
              La contraseña debe tener <br /> entre4 a 12 caracteres <br /> sin
              especiales
            </span>
          )}
        </div>
        <div>
          <div>
            <input
              placeholder="Confirmar Contraseña"
              className="register__input"
              name="confirmPassword"
              type="password"
              value={inputValues.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {inputValues.password === inputValues.confirmPassword ? null : (
            <span style={{ color: "red", background: "#eeeeee90" }}>
              Las contraeñas no <br />
              coinciden
            </span>
          )}
        </div>
        <button className="register__button">Registrarse</button>
        {condiciones.noSubmit ? null : (
          <span style={{ color: "red", background: "#eeeeee90" }}>
            Campos Invalidos
          </span>
        )}
      </form>
      <div>
        <Link className="links register__link" to="/">
          Loggin
        </Link>
      </div>
    </div>
  );
};

export default RegisterUser;
