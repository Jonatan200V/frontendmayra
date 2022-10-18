import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../store/Store";
const URL = "https://mayraformulario.vercel.app/create/form";
const URLUser = "https://mayraformulario.vercel.app/user";
const Principal = () => {
  const { user, logout, existUser } = useAppContext();
  const [encuest, setEncuest] = useState(false);
  const [pregunta1, setPregunta1] = useState("Si");
  const [pregunta2, setPregunta2] = useState("Si");
  const [pregunta3, setPregunta3] = useState("Verde");
  const [pregunta4, setPregunta4] = useState("Redonda"); //Redonda
  const [pregunta5, setPregunta5] = useState("normal");
  const [pregunta6, setPregunta6] = useState("$4100"); //Dinero
  const [sexo, setSexo] = useState("Femenino");
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    const usuarioLocal = JSON.parse(localStorage?.getItem("token")) || false;

    if (!usuarioLocal) {
      return navigate("/");
    }
    // existUser(usuarioLocal.user);
    const userEncuest = async () => {
      const res = await fetch(`${URLUser}/${usuarioLocal.user.user_id}`);
      const data = await res.json();
      if (data?.encuestum !== null) {
        setEncuest(true);
      }
    };
    userEncuest();
  }, []);
  const handleSession = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleChangeEncuesta = (evt) => {
    let { name, value } = evt.target;
    switch (name) {
      case "pregunta1":
        return setPregunta1(value);
      case "pregunta2":
        return setPregunta2(value);
      case "pregunta3":
        return setPregunta3(value);
      case "pregunta4":
        return setPregunta4(value);
      case "pregunta6":
        return setPregunta6(value);
      case "genero":
        return setSexo(value);
      default:
        return name;
    }
  };

  const handleEncuesta = async (evt) => {
    evt.preventDefault();
    const res = await fetch(`${URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pregunta1,
        pregunta2,
        pregunta3,
        pregunta4,
        pregunta5,
        pregunta6,
        sexo,
        completed: true,
        user__id: user.user_id,
      }),
    });
    if (res.status === 200) {
      setEncuest(true);
    }
  };
  const handleClick = (evt) => {
    const { name } = evt.target;
    setPregunta5(name);
  };
  return (
    <div className="p">
      <div className="principal">
        <div className="principal__bienvenida">
          Bienvenido {user?.user_name} me gustaria que complete la encuesta.
        </div>
        <div className="principal__estadisticas">
          {user?.user_email === "mayra@masakali.com" ? (
            <div>
              <Link className="links" to="/estadisticas">
                Estadisticas
              </Link>
            </div>
          ) : null}
        </div>
        {encuest ? (
          <div className="principal__gracias">
            <div className="principal__back">
              Gracias por completar la encuesta {user?.user_name}
            </div>
          </div>
        ) : (
          <div>
            <form onSubmit={handleEncuesta} className="principal__form">
              <div className="principal__container">
                <div className="s">
                  <label className="principal__label" htmlFor="pregunta1">
                    ¿Estaria dispuesto a comprar nuestro producto?
                  </label>
                </div>
                Si
                <input
                  name="pregunta1"
                  type="radio"
                  value="Si"
                  checked={pregunta1 === "Si" ? true : false}
                  onChange={handleChangeEncuesta}
                />
                No
                <input
                  name="pregunta1"
                  type="radio"
                  value="No"
                  checked={pregunta1 === "No" ? true : false}
                  onChange={handleChangeEncuesta}
                />
              </div>
              <div className="principal__container">
                <div>
                  <label className="" htmlFor="pregunta2">
                    ¿Preferiria el producto pintado?
                  </label>
                </div>
                Si
                <input
                  name="pregunta2"
                  type="radio"
                  value="Si"
                  checked={pregunta2 === "Si" ? true : false}
                  onChange={handleChangeEncuesta}
                />
                No
                <input
                  name="pregunta2"
                  type="radio"
                  value="No"
                  checked={pregunta2 === "No" ? true : false}
                  onChange={handleChangeEncuesta}
                />
              </div>
              <div className="principal__container">
                <div>
                  <label className="principal__label" htmlFor="pregunta3">
                    ¿Que color?
                  </label>
                </div>
                Verde
                <input
                  checked={pregunta3 === "Verde" ? true : false}
                  onChange={handleChangeEncuesta}
                  type="radio"
                  name="pregunta3"
                  value="Verde"
                />
                Azul
                <input
                  checked={pregunta3 === "Azul" ? true : false}
                  onChange={handleChangeEncuesta}
                  type="radio"
                  name="pregunta3"
                  value="Azul"
                />
                Rosa
                <input
                  checked={pregunta3 === "Rosa" ? true : false}
                  onChange={handleChangeEncuesta}
                  type="radio"
                  name="pregunta3"
                  value="Rosa"
                />
              </div>
              <div className="principal__container">
                <div>
                  <label className="principal__label" htmlFor="pregunta6">
                    Quisiera mesas redondas o cuadradas
                  </label>
                </div>
                Redonda
                <input
                  type="radio"
                  name="pregunta4"
                  value="Redonda"
                  checked={pregunta4 === "Redonda" ? true : false}
                  onChange={handleChangeEncuesta}
                />
                Cuadrada
                <input
                  type="radio"
                  name="pregunta4"
                  value="Cuadrada"
                  checked={pregunta4 === "Cuadrada" ? true : false}
                  onChange={handleChangeEncuesta}
                />
              </div>
              <div className="principal__container">
                <label className="principal__label" htmlFor="pregunta5">
                  Preferiria las sillas tipo:
                </label>
                <div className="principal__sillas">
                  <img
                    name="normal"
                    src="./assets/opcion1.jpeg"
                    alt="opcion1"
                    className="principal__img"
                    onClick={handleClick}
                  />
                  <img
                    name="apoyar"
                    src="./assets/opcion2.jpeg"
                    alt="opcion2"
                    className="principal__img"
                    onClick={handleClick}
                  />
                </div>
              </div>

              <div className="principal__container">
                <div>
                  <label className="principal__label" htmlFor="pregunta4">
                    ¿Cuanto estaria dispuesto a pagar por 2 sillas y 1 mesa?
                  </label>
                </div>
                $4100
                <input
                  type="radio"
                  name="pregunta6"
                  value="$4100"
                  checked={pregunta6 === "$4100" ? true : false}
                  onChange={handleChangeEncuesta}
                />
                $4000
                <input
                  type="radio"
                  name="pregunta6"
                  value="$4000"
                  checked={pregunta6 === "$4000" ? true : false}
                  onChange={handleChangeEncuesta}
                />
                $4300
                <input
                  type="radio"
                  name="pregunta6"
                  value="$4300"
                  checked={pregunta6 === "$4300" ? true : false}
                  onChange={handleChangeEncuesta}
                />
              </div>
              <div>
                <label>
                  Femenino
                  <input
                    onChange={handleChangeEncuesta}
                    type="radio"
                    name="genero"
                    value="Femenino"
                    checked={sexo === "Femenino" ? true : false}
                  />
                </label>

                <label>
                  Masculino
                  <input
                    onChange={handleChangeEncuesta}
                    type="radio"
                    name="genero"
                    value="Masculino"
                    checked={sexo === "Masculino" ? true : false}
                  />
                </label>
              </div>
              <div></div>
              <button className="principal__button">Enviar</button>
            </form>
          </div>
        )}
        <button className="principal__button2" onClick={handleSession}>
          Cerrar Sesion
        </button>
      </div>
    </div>
  );
};

export default Principal;
