import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../store/Store";
const URL = "https://mayraformulario.vercel.app/date/form";
const Estadisticas = () => {
  const [dates, setDates] = useState(null);
  const [preguntas, setPreguntas] = useState("pregunta1");
  const [option, setOption] = useState("");
  const { user } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (user) {
      if (user.user_email !== "mayra@masakali.com") {
        navigate("/home");
      }
    } else navigate("/");
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const res = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        pregunta: preguntas,
        opcion: option,
      }),
    });
    const data = await res.json();
    console.log(data);
    setDates(data);
  };
  const handleChangeSelect = (evt) => {
    const { value } = evt.target;
    setPreguntas(value);
  };
  const handleOption = (evt) => {
    const { value } = evt.target;
    setOption(value);
  };
  return (
    <div className="estadisticas">
      <div>
        {preguntas === "pregunta1" ? (
          <div>
            <div>Pregunta1</div>
            <div> ¿Estaria dispuesto a comprar nuestro producto?</div>
          </div>
        ) : preguntas === "pregunta2" ? (
          <div>
            <div>Pregunta2</div>
            <div> ¿Preferiria el producto pintado?</div>
          </div>
        ) : preguntas === "pregunta3" ? (
          <div>
            <div>Pregunta3</div>
            <div>¿Que color?</div>
          </div>
        ) : preguntas === "pregunta4" ? (
          <div>
            <div>Pregunta4</div>
            <div> Quisiera mesas redondas o cuadradas</div>
          </div>
        ) : preguntas === "pregunta5" ? (
          <div>
            <div>Pregunta5</div>
            <div> Preferiria las sillas tipo:</div>
          </div>
        ) : preguntas === "pregunta6" ? (
          <div>
            <div>Pregunta6</div>
            <div> ¿Cuanto estaria dispuesto a pagar por 2 sillas y 1 mesa?</div>
          </div>
        ) : null}
      </div>
      <form onSubmit={handleSubmit} className="estadisticas__form">
        <select onChange={handleChangeSelect}>
          <option className="estadisticas__option" value="pregunta1">
            Pregunta1
          </option>
          <option className="estadisticas__option" value="pregunta2">
            Pregunta2
          </option>
          <option className="estadisticas__option" value="pregunta3">
            Pregunta3
          </option>
          <option className="estadisticas__option" value="pregunta4">
            Pregunta4
          </option>
          <option className="estadisticas__option" value="pregunta5">
            Pregunta5
          </option>
          <option className="estadisticas__option" value="pregunta6">
            Pregunta6
          </option>
          <option className="estadisticas__option" value="sexo">
            Sexo
          </option>
        </select>
        <select onChange={handleOption}>
          {preguntas === "pregunta1" ? (
            <>
              <option className="estadisticas__option" value="Si">
                Si
              </option>
              <option className="estadisticas__option" value="No">
                No
              </option>
            </>
          ) : preguntas === "pregunta2" ? (
            <>
              <option className="estadisticas__option" value="Si">
                Si
              </option>
              <option className="estadisticas__option" value="No">
                No
              </option>
            </>
          ) : preguntas === "pregunta3" ? (
            <>
              <option className="estadisticas__option" value="Verde">
                Verde
              </option>
              <option className="estadisticas__option" value="Azul">
                Azul
              </option>
              <option className="estadisticas__option" value="Rosa">
                Rosa
              </option>
            </>
          ) : preguntas === "pregunta4" ? (
            <>
              <option className="estadisticas__option" value="Redonda">
                Redonda
              </option>
              <option className="estadisticas__option" value="Cuadrada">
                Cuadrada
              </option>
            </>
          ) : preguntas === "pregunta5" ? (
            <>
              <option className="estadisticas__option" value="Normal">
                Normal
              </option>
              <option className="estadisticas__option" value="Apoyar">
                Apoyar
              </option>
            </>
          ) : preguntas === "pregunta6" ? (
            <>
              <option className="estadisticas__option" value="$4300">
                $4300
              </option>
              <option className="estadisticas__option" value="$4000">
                $4000
              </option>
              <option className="estadisticas__option" value="$4100">
                $4100
              </option>
            </>
          ) : preguntas === "sexo" ? (
            <>
              <option value="Femenino">Femenino</option>
              <option value="Masculino">Masculino</option>
            </>
          ) : null}
        </select>
        <button className="estadisticas__button">Enviar</button>
      </form>
      {dates && (
        <div>
          De {dates?.tot} usuarios pusieron "{option}" el {dates?.porciento}{" "}
          porciento.
        </div>
      )}
    </div>
  );
};

export default Estadisticas;
