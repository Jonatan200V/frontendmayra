import Login from "./components/Login";
import RegisterUser from "./components/Users";
import "./css/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Principal from "./components/Principal";
import { Store } from "./store/Store";
import Estadisticas from "./components/Estadisticas";
function App() {
  return (
    <div className="App">
      <Store>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<Login />} /> */}
            <Route path="/home" element={<Principal />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/" element={<RegisterUser />} />
          </Routes>
        </BrowserRouter>
      </Store>
    </div>
  );
}

export default App;
